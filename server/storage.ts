import { 
  users, type User, type InsertUser,
  type ContactMessage, type InsertContactMessage,
  type Project, type InsertProject,
  type WebsiteInfo, type InsertWebsiteInfo,
  type Skill, type InsertSkill,
  type SocialLink, type InsertSocialLink,
  type ProjectInterest, type InsertProjectInterest
} from "@shared/schema";

// Extended storage interface with all methods
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getAllProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getProjectsByTag(tag: string): Promise<Project[]>;
  
  // Website info methods
  getWebsiteInfo(section: string, key: string): Promise<WebsiteInfo | undefined>;
  getAllWebsiteInfo(): Promise<WebsiteInfo[]>;
  getWebsiteInfoBySection(section: string): Promise<WebsiteInfo[]>;
  upsertWebsiteInfo(info: InsertWebsiteInfo): Promise<WebsiteInfo>;
  
  // Skill methods
  getAllSkills(): Promise<Skill[]>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  getSkill(id: number): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: number): Promise<boolean>;
  
  // Social link methods
  getAllSocialLinks(): Promise<SocialLink[]>;
  getSocialLink(id: number): Promise<SocialLink | undefined>;
  createSocialLink(link: InsertSocialLink): Promise<SocialLink>;
  updateSocialLink(id: number, link: Partial<InsertSocialLink>): Promise<SocialLink | undefined>;
  deleteSocialLink(id: number): Promise<boolean>;
  
  // Contact message methods
  saveContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  deleteContactMessage(id: number): Promise<boolean>;
  
  // Project interest methods
  saveProjectInterest(interest: InsertProjectInterest): Promise<ProjectInterest>;
  getProjectInterest(id: number): Promise<ProjectInterest | undefined>;
  getAllProjectInterests(): Promise<ProjectInterest[]>;
  getProjectInterestsByProject(projectId: number): Promise<ProjectInterest[]>;
  deleteProjectInterest(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private websiteInfo: Map<string, WebsiteInfo>;
  private skills: Map<number, Skill>;
  private socialLinks: Map<number, SocialLink>;
  private contactMessages: Map<number, ContactMessage>;
  private projectInterests: Map<number, ProjectInterest>;
  
  private userCurrentId: number;
  private projectCurrentId: number;
  private websiteInfoCurrentId: number;
  private skillCurrentId: number;
  private socialLinkCurrentId: number;
  private messageCurrentId: number;
  private interestCurrentId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.websiteInfo = new Map();
    this.skills = new Map();
    this.socialLinks = new Map();
    this.contactMessages = new Map();
    this.projectInterests = new Map();
    
    this.userCurrentId = 1;
    this.projectCurrentId = 1;
    this.websiteInfoCurrentId = 1;
    this.skillCurrentId = 1;
    this.socialLinkCurrentId = 1;
    this.messageCurrentId = 1;
    this.interestCurrentId = 1;
    
    // Initialize with default website info
    this.initializeDefaultData();
  }
  
  private initializeDefaultData() {
    // Add default website info if needed
    this.upsertWebsiteInfo({
      section: "contact",
      key: "email",
      value: "nerochaze@example.com"
    });
    
    this.upsertWebsiteInfo({
      section: "contact",
      key: "phone",
      value: "+1 (123) 456-7890"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectCurrentId++;
    const createdAt = new Date();
    const project: Project = {
      ...insertProject,
      id,
      createdAt
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, projectData: Partial<InsertProject>): Promise<Project | undefined> {
    const existingProject = this.projects.get(id);
    
    if (!existingProject) {
      return undefined;
    }
    
    const updatedProject: Project = {
      ...existingProject,
      ...projectData,
    };
    
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    if (!this.projects.has(id)) {
      return false;
    }
    
    return this.projects.delete(id);
  }
  
  // Website info methods
  async getWebsiteInfo(section: string, key: string): Promise<WebsiteInfo | undefined> {
    const compositeKey = `${section}:${key}`;
    return this.websiteInfo.get(compositeKey);
  }
  
  async getAllWebsiteInfo(): Promise<WebsiteInfo[]> {
    return Array.from(this.websiteInfo.values()).sort((a, b) => 
      b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  }
  
  async getWebsiteInfoBySection(section: string): Promise<WebsiteInfo[]> {
    return Array.from(this.websiteInfo.values())
      .filter(info => info.section === section)
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }
  
  async upsertWebsiteInfo(insertInfo: InsertWebsiteInfo): Promise<WebsiteInfo> {
    const compositeKey = `${insertInfo.section}:${insertInfo.key}`;
    const existingInfo = this.websiteInfo.get(compositeKey);
    
    if (existingInfo) {
      const updatedInfo: WebsiteInfo = {
        ...existingInfo,
        value: insertInfo.value,
        updatedAt: new Date()
      };
      this.websiteInfo.set(compositeKey, updatedInfo);
      return updatedInfo;
    } else {
      const id = this.websiteInfoCurrentId++;
      const updatedAt = new Date();
      const newInfo: WebsiteInfo = {
        ...insertInfo,
        id,
        updatedAt
      };
      this.websiteInfo.set(compositeKey, newInfo);
      return newInfo;
    }
  }
  
  // Skill methods
  async getAllSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values()).sort((a, b) => {
      // Sort by category first, then by order
      if (a.category === b.category) {
        return parseInt(a.order) - parseInt(b.order);
      }
      return a.category.localeCompare(b.category);
    });
  }
  
  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return Array.from(this.skills.values())
      .filter(skill => skill.category === category)
      .sort((a, b) => parseInt(a.order) - parseInt(b.order));
  }
  
  async getSkill(id: number): Promise<Skill | undefined> {
    return this.skills.get(id);
  }
  
  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = this.skillCurrentId++;
    // Find the highest order in this category and set new skill to be next
    const existingSkills = await this.getSkillsByCategory(insertSkill.category);
    const maxOrder = existingSkills.length > 0
      ? Math.max(...existingSkills.map(s => parseInt(s.order)))
      : 0;
    
    const order = (maxOrder + 1).toString();
    
    const skill: Skill = {
      ...insertSkill,
      id,
      order
    };
    
    this.skills.set(id, skill);
    return skill;
  }
  
  async updateSkill(id: number, skillData: Partial<InsertSkill>): Promise<Skill | undefined> {
    const existingSkill = this.skills.get(id);
    
    if (!existingSkill) {
      return undefined;
    }
    
    const updatedSkill: Skill = {
      ...existingSkill,
      ...skillData
    };
    
    this.skills.set(id, updatedSkill);
    return updatedSkill;
  }
  
  async deleteSkill(id: number): Promise<boolean> {
    if (!this.skills.has(id)) {
      return false;
    }
    
    return this.skills.delete(id);
  }
  
  // Social link methods
  async getAllSocialLinks(): Promise<SocialLink[]> {
    return Array.from(this.socialLinks.values())
      .sort((a, b) => parseInt(a.order) - parseInt(b.order));
  }
  
  async getSocialLink(id: number): Promise<SocialLink | undefined> {
    return this.socialLinks.get(id);
  }
  
  async createSocialLink(insertLink: InsertSocialLink): Promise<SocialLink> {
    const id = this.socialLinkCurrentId++;
    // Find the highest order and set new link to be next
    const existingLinks = Array.from(this.socialLinks.values());
    const maxOrder = existingLinks.length > 0
      ? Math.max(...existingLinks.map(l => parseInt(l.order)))
      : 0;
    
    const order = (maxOrder + 1).toString();
    
    const link: SocialLink = {
      ...insertLink,
      id,
      order,
      isActive: insertLink.isActive || 'true'
    };
    
    this.socialLinks.set(id, link);
    return link;
  }
  
  async updateSocialLink(id: number, linkData: Partial<InsertSocialLink>): Promise<SocialLink | undefined> {
    const existingLink = this.socialLinks.get(id);
    
    if (!existingLink) {
      return undefined;
    }
    
    const updatedLink: SocialLink = {
      ...existingLink,
      ...linkData
    };
    
    this.socialLinks.set(id, updatedLink);
    return updatedLink;
  }
  
  async deleteSocialLink(id: number): Promise<boolean> {
    if (!this.socialLinks.has(id)) {
      return false;
    }
    
    return this.socialLinks.delete(id);
  }

  // Contact message methods
  async saveContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageCurrentId++;
    const createdAt = new Date();
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt 
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  
  async deleteContactMessage(id: number): Promise<boolean> {
    if (!this.contactMessages.has(id)) {
      return false;
    }
    
    return this.contactMessages.delete(id);
  }

  // Project categorization methods
  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.category === category)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getProjectsByTag(tag: string): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.tags.includes(tag))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Project interest methods
  async saveProjectInterest(insertInterest: InsertProjectInterest): Promise<ProjectInterest> {
    const id = this.interestCurrentId++;
    const createdAt = new Date();
    const interest: ProjectInterest = { 
      ...insertInterest, 
      id, 
      createdAt 
    };
    this.projectInterests.set(id, interest);
    return interest;
  }

  async getProjectInterest(id: number): Promise<ProjectInterest | undefined> {
    return this.projectInterests.get(id);
  }

  async getAllProjectInterests(): Promise<ProjectInterest[]> {
    return Array.from(this.projectInterests.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getProjectInterestsByProject(projectId: number): Promise<ProjectInterest[]> {
    return Array.from(this.projectInterests.values())
      .filter(interest => interest.projectId === projectId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async deleteProjectInterest(id: number): Promise<boolean> {
    if (!this.projectInterests.has(id)) {
      return false;
    }
    
    return this.projectInterests.delete(id);
  }
}

export const storage = new MemStorage();
