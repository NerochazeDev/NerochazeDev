import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  contactMessageSchema, 
  projectSchema, 
  websiteInfoSchema, 
  skillSchema, 
  socialLinkSchema 
} from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const contactData = contactMessageSchema.parse(req.body);
      
      // Store the contact message
      const savedMessage = await storage.saveContactMessage(contactData);
      
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

  const httpServer = createServer(app);

  return httpServer;
}
