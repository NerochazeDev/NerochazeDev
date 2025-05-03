import { 
  users, type User, type InsertUser,
  type ContactMessage, type InsertContactMessage,
  type Project, type InsertProject,
  type WebsiteInfo, type InsertWebsiteInfo,
  type Skill, type InsertSkill,
  type SocialLink, type InsertSocialLink,
  type ProjectInterest, type InsertProjectInterest,
  type BlogPost, type InsertBlogPost,
  websiteInfo, projects, contactMessages, skills, socialLinks, projectInterestMessages, blogPosts
} from "@shared/schema";
import { IStorage } from "./storage";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const [updatedProject] = await db
      .update(projects)
      .set(project)
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    try {
      await db.delete(projects).where(eq(projects.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting project:", error);
      return false;
    }
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.category, category))
      .orderBy(desc(projects.createdAt));
  }

  async getProjectsByTag(tag: string): Promise<Project[]> {
    // For array contains, we need to filter after fetching
    const allProjects = await this.getAllProjects();
    return allProjects.filter(project => project.tags.includes(tag));
  }

  // Website info methods
  async getWebsiteInfo(section: string, key: string): Promise<WebsiteInfo | undefined> {
    const [info] = await db
      .select()
      .from(websiteInfo)
      .where(and(
        eq(websiteInfo.section, section),
        eq(websiteInfo.key, key)
      ));
    return info;
  }

  async getAllWebsiteInfo(): Promise<WebsiteInfo[]> {
    return await db.select().from(websiteInfo).orderBy(desc(websiteInfo.updatedAt));
  }

  async getWebsiteInfoBySection(section: string): Promise<WebsiteInfo[]> {
    return await db
      .select()
      .from(websiteInfo)
      .where(eq(websiteInfo.section, section))
      .orderBy(desc(websiteInfo.updatedAt));
  }

  async upsertWebsiteInfo(info: InsertWebsiteInfo): Promise<WebsiteInfo> {
    // Try to find existing info
    const existingInfo = await this.getWebsiteInfo(info.section, info.key);
    
    if (existingInfo) {
      // Update existing
      const [updatedInfo] = await db
        .update(websiteInfo)
        .set({ value: info.value, updatedAt: new Date() })
        .where(eq(websiteInfo.id, existingInfo.id))
        .returning();
      return updatedInfo;
    } else {
      // Insert new
      const [newInfo] = await db
        .insert(websiteInfo)
        .values(info)
        .returning();
      return newInfo;
    }
  }

  // Skill methods
  async getAllSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return await db
      .select()
      .from(skills)
      .where(eq(skills.category, category));
  }

  async getSkill(id: number): Promise<Skill | undefined> {
    const [skill] = await db.select().from(skills).where(eq(skills.id, id));
    return skill;
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    // Find the highest order in this category
    const existingSkills = await this.getSkillsByCategory(skill.category);
    const maxOrder = existingSkills.length > 0
      ? Math.max(...existingSkills.map(s => parseInt(s.order)))
      : 0;
    
    const order = (maxOrder + 1).toString();
    
    const [newSkill] = await db
      .insert(skills)
      .values({ ...skill, order })
      .returning();
    return newSkill;
  }

  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const [updatedSkill] = await db
      .update(skills)
      .set(skill)
      .where(eq(skills.id, id))
      .returning();
    return updatedSkill;
  }

  async deleteSkill(id: number): Promise<boolean> {
    try {
      await db.delete(skills).where(eq(skills.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting skill:", error);
      return false;
    }
  }

  // Social link methods
  async getAllSocialLinks(): Promise<SocialLink[]> {
    return await db.select().from(socialLinks);
  }

  async getSocialLink(id: number): Promise<SocialLink | undefined> {
    const [link] = await db.select().from(socialLinks).where(eq(socialLinks.id, id));
    return link;
  }

  async createSocialLink(link: InsertSocialLink): Promise<SocialLink> {
    // Find the highest order
    const existingLinks = await this.getAllSocialLinks();
    const maxOrder = existingLinks.length > 0
      ? Math.max(...existingLinks.map(l => parseInt(l.order)))
      : 0;
    
    const order = (maxOrder + 1).toString();
    
    const [newLink] = await db
      .insert(socialLinks)
      .values({ ...link, order, isActive: link.isActive || 'true' })
      .returning();
    return newLink;
  }

  async updateSocialLink(id: number, link: Partial<InsertSocialLink>): Promise<SocialLink | undefined> {
    const [updatedLink] = await db
      .update(socialLinks)
      .set(link)
      .where(eq(socialLinks.id, id))
      .returning();
    return updatedLink;
  }

  async deleteSocialLink(id: number): Promise<boolean> {
    try {
      await db.delete(socialLinks).where(eq(socialLinks.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting social link:", error);
      return false;
    }
  }

  // Contact message methods
  async saveContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return newMessage;
  }

  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    const [message] = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async deleteContactMessage(id: number): Promise<boolean> {
    try {
      await db.delete(contactMessages).where(eq(contactMessages.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting contact message:", error);
      return false;
    }
  }

  // Project interest methods
  async saveProjectInterest(interest: InsertProjectInterest): Promise<ProjectInterest> {
    const [newInterest] = await db
      .insert(projectInterestMessages)
      .values(interest)
      .returning();
    return newInterest;
  }

  async getProjectInterest(id: number): Promise<ProjectInterest | undefined> {
    const [interest] = await db.select().from(projectInterestMessages).where(eq(projectInterestMessages.id, id));
    return interest;
  }

  async getAllProjectInterests(): Promise<ProjectInterest[]> {
    return await db.select().from(projectInterestMessages).orderBy(desc(projectInterestMessages.createdAt));
  }

  async getProjectInterestsByProject(projectId: number): Promise<ProjectInterest[]> {
    return await db
      .select()
      .from(projectInterestMessages)
      .where(eq(projectInterestMessages.projectId, projectId))
      .orderBy(desc(projectInterestMessages.createdAt));
  }

  async deleteProjectInterest(id: number): Promise<boolean> {
    try {
      await db.delete(projectInterestMessages).where(eq(projectInterestMessages.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting project interest:", error);
      return false;
    }
  }

  // Blog methods
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, "true"))
      .orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updatedPost] = await db
      .update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    try {
      await db.delete(blogPosts).where(eq(blogPosts.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting blog post:", error);
      return false;
    }
  }

  async getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
    // For array contains, we need to filter after fetching
    const allPosts = await this.getAllBlogPosts();
    return allPosts.filter(post => post.tags.includes(tag));
  }
}