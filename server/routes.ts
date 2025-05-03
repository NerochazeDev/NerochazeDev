import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactMessageSchema } from "@shared/schema";
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

  const httpServer = createServer(app);

  return httpServer;
}
