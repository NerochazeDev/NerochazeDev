import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  contactMessageSchema, 
  projectSchema, 
  websiteInfoSchema, 
  skillSchema, 
  socialLinkSchema,
  projectInterestSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { sendContactMessage, sendProjectInterestMessage } from "./telegram";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const contactData = contactMessageSchema.parse(req.body);
      
      // Store the contact message
      const savedMessage = await storage.saveContactMessage(contactData);
      
      // Send notification to Telegram
      try {
        await sendContactMessage(contactData);
      } catch (telegramError) {
        console.error("Telegram notification failed:", telegramError);
        // Continue execution even if Telegram notification fails
      }
      
      // Return success response
      return res.status(200).json({
        success: true,
        message: "Contact message received",
        data: { id: savedMessage.id }
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Server error while processing your request"
      });
    }
  });

  // Project Routes
  // Get all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      return res.status(200).json({
        success: true,
        data: projects
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error while fetching projects"
      });
    }
  });

  // Get single project
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid project ID"
        });
      }

      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found"
        });
      }

      return res.status(200).json({
        success: true,
        data: project
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error while fetching the project"
      });
    }
  });

  // Create project
  app.post("/api/projects", async (req, res) => {
    try {
      // Validate request body
      const projectData = projectSchema.parse(req.body);
      
      // Create the project
      const newProject = await storage.createProject(projectData);
      
      return res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: newProject
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid project data",
          errors: error.errors
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Server error while creating the project"
      });
    }
  });

  // Update project
  app.put("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid project ID"
        });
      }

      // Validate request body
      const projectData = projectSchema.partial().parse(req.body);
      
      // Update the project
      const updatedProject = await storage.updateProject(id, projectData);
      
      if (!updatedProject) {
        return res.status(404).json({
          success: false,
          message: "Project not found"
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: updatedProject
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid project data",
          errors: error.errors
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Server error while updating the project"
      });
    }
  });

  // Delete project
  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid project ID"
        });
      }

      const deleted = await storage.deleteProject(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Project not found"
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Project deleted successfully"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error while deleting the project"
      });
    }
  });
  
  // Website Info Routes
  // Get all website info
  app.get("/api/website-info", async (req, res) => {
    try {
      const info = await storage.getAllWebsiteInfo();
      return res.status(200).json({
        success: true,
        data: info
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error while fetching website information"
      });
    }
  });
  
  // Get website info by section
  app.get("/api/website-info/:section", async (req, res) => {
    try {
      const section = req.params.section;
      const info = await storage.getWebsiteInfoBySection(section);
      
      return res.status(200).json({
        success: true,
        data: info
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error while fetching website information"
      });
    }
  });
  
  // Update or create website info
  app.post("/api/website-info", async (req, res) => {
    try {
      // Validate request body
      const infoData = websiteInfoSchema.parse(req.body);
      
      // Create/update the info
      const updatedInfo = await storage.upsertWebsiteInfo(infoData);
      
      return res.status(200).json({
        success: true,
        message: "Website information updated successfully",
        data: updatedInfo
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid website information data",
          errors: error.errors
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Server error while updating website information"
      });
    }
  });
  
  // Skills Routes
  // Get all skills
  app.get("/api/skills", async (req, res) => {
    try {
      const skills = await storage.getAllSkills();
      return res.status(200).json({
        success: true,
        data: skills
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error while fetching skills"
      });
    }
  });
  
  // Get skills by category
  app.get("/api/skills/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const skills = await storage.getSkillsByCategory(category);
      
      return res.status(200).json({
        success: true,
        data: skills
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error while fetching skills"
      });
    }
  });
  
  // Get single skill
  app.get("/api/skills/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid skill ID"
        });
      }
      
      const skill = await storage.getSkill(id);
      if (!skill) {
        return res.status(404).json({
          success: false,
          message: "Skill not found"
        });
      }
      
      return res.status(200).json({
        success: true,
        data: skill
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error while fetching the skill"
      });
    }
  });
  
  // Create skill
  app.post("/api/skills", async (req, res) => {
    try {
      // Validate request body
      const skillData = skillSchema.parse(req.body);
      
      // Create the skill
      const newSkill = await storage.createSkill(skillData);
      
      return res.status(201).json({
        success: true,
        message: "Skill created successfully",
        data: newSkill
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid skill data",
          errors: error.errors
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Server error while creating the skill"
      });
    }
  });
  
  // Update skill
  app.put("/api/skills/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid skill ID"
        });
      }
      
      // Validate request body
      const skillData = skillSchema.partial().parse(req.body);
      
      // Update the skill
      const updatedSkill = await storage.updateSkill(id, skillData);
      
      if (!updatedSkill) {
        return res.status(404).json({
          success: false,
          message: "Skill not found"
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Skill updated successfully",
        data: updatedSkill
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid skill data",
          errors: error.errors
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Server error while updating the skill"
      });
    }
  });
  
  // Delete skill
  app.delete("/api/skills/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid skill ID"
        });
      }
      
      const deleted = await storage.deleteSkill(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Skill not found"
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Skill deleted successfully"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error while deleting the skill"
      });
    }
  });
  
  // Social Links Routes
  // Get all social links
  app.get("/api/social-links", async (req, res) => {
    try {
      const links = await storage.getAllSocialLinks();
      return res.status(200).json({
        success: true,
        data: links
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error while fetching social links"
      });
    }
  });
  
  // Get single social link
  app.get("/api/social-links/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid social link ID"
        });
      }
      
      const link = await storage.getSocialLink(id);
      if (!link) {
        return res.status(404).json({
          success: false,
          message: "Social link not found"
        });
      }
      
      return res.status(200).json({
        success: true,
        data: link
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error while fetching the social link"
      });
    }
  });
  
  // Create social link
  app.post("/api/social-links", async (req, res) => {
    try {
      // Validate request body
      const linkData = socialLinkSchema.parse(req.body);
      
      // Create the social link
      const newLink = await storage.createSocialLink(linkData);
      
      return res.status(201).json({
        success: true,
        message: "Social link created successfully",
        data: newLink
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid social link data",
          errors: error.errors
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Server error while creating the social link"
      });
    }
  });
  
  // Update social link
  app.put("/api/social-links/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid social link ID"
        });
      }
      
      // Validate request body
      const linkData = socialLinkSchema.partial().parse(req.body);
      
      // Update the social link
      const updatedLink = await storage.updateSocialLink(id, linkData);
      
      if (!updatedLink) {
        return res.status(404).json({
          success: false,
          message: "Social link not found"
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Social link updated successfully",
        data: updatedLink
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid social link data",
          errors: error.errors
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Server error while updating the social link"
      });
    }
  });
  
  // Delete social link
  app.delete("/api/social-links/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid social link ID"
        });
      }
      
      const deleted = await storage.deleteSocialLink(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Social link not found"
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Social link deleted successfully"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error while deleting the social link"
      });
    }
  });
  
  // Contact Messages Routes
  // Get all contact messages
  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      return res.status(200).json({
        success: true,
        data: messages
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error while fetching contact messages"
      });
    }
  });
  
  // Get single contact message
  app.get("/api/contact-messages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid contact message ID"
        });
      }
      
      const message = await storage.getContactMessage(id);
      if (!message) {
        return res.status(404).json({
          success: false,
          message: "Contact message not found"
        });
      }
      
      return res.status(200).json({
        success: true,
        data: message
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error while fetching the contact message"
      });
    }
  });
  
  // Delete contact message
  app.delete("/api/contact-messages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid contact message ID"
        });
      }
      
      const deleted = await storage.deleteContactMessage(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Contact message not found"
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Contact message deleted successfully"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error while deleting the contact message"
      });
    }
  });

  // Project interest routes
  // Submit project interest
  app.post("/api/project-interest", async (req, res) => {
    try {
      // Validate request body
      const interestData = projectInterestSchema.parse(req.body);
      
      // Get the project to include its title in the notification
      const project = await storage.getProject(interestData.projectId);
      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found"
        });
      }
      
      // Store the interest message
      const savedInterest = await storage.saveProjectInterest(interestData);
      
      // Send notification to Telegram
      try {
        await sendProjectInterestMessage({
          ...interestData,
          projectTitle: project.title
        });
      } catch (telegramError) {
        console.error("Telegram project interest notification failed:", telegramError);
        // Continue execution even if Telegram notification fails
      }
      
      // Return success response
      return res.status(200).json({
        success: true,
        message: "Project interest submitted successfully",
        data: { id: savedInterest.id }
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid project interest data",
          errors: error.errors
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "Server error while processing your request"
      });
    }
  });
  
  // Get project interests by project ID
  app.get("/api/project-interest/project/:id", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid project ID"
        });
      }
      
      const interests = await storage.getProjectInterestsByProject(projectId);
      return res.status(200).json({
        success: true,
        data: interests
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error while fetching project interests"
      });
    }
  });
  
  // Get all project interests
  app.get("/api/project-interest", async (req, res) => {
    try {
      const interests = await storage.getAllProjectInterests();
      return res.status(200).json({
        success: true,
        data: interests
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error while fetching project interests"
      });
    }
  });
  
  // Delete project interest
  app.delete("/api/project-interest/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid project interest ID"
        });
      }
      
      const deleted = await storage.deleteProjectInterest(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Project interest not found"
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Project interest deleted successfully"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error while deleting the project interest"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
