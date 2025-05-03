import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema - keeping this from the original
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Projects schema
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  technologies: text("technologies").array().notNull(),
  tags: text("tags").array().notNull(),
  price: text("price").notNull(),
  liveLink: text("live_link").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projectSchema = createInsertSchema(projects).pick({
  title: true,
  description: true,
  image: true,
  technologies: true,
  tags: true,
  price: true,
  liveLink: true,
  category: true,
});

export type InsertProject = z.infer<typeof projectSchema>;
export type Project = typeof projects.$inferSelect;

// Website information schema for editable content
export const websiteInfo = pgTable("website_info", {
  id: serial("id").primaryKey(),
  section: text("section").notNull(), // hero, about, skills, contact, etc.
  key: text("key").notNull(), // specific field identifier
  value: text("value").notNull(), // the actual content
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const websiteInfoSchema = createInsertSchema(websiteInfo).pick({
  section: true,
  key: true,
  value: true,
});

export type InsertWebsiteInfo = z.infer<typeof websiteInfoSchema>;
export type WebsiteInfo = typeof websiteInfo.$inferSelect;

// Social links schema
export const socialLinks = pgTable("social_links", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(), // github, linkedin, twitter, etc.
  url: text("url").notNull(),
  order: text("order").notNull(),
  isActive: text("is_active").default("true").notNull(),
});

export const socialLinkSchema = createInsertSchema(socialLinks).pick({
  platform: true,
  url: true,
  isActive: true,
});

export type InsertSocialLink = z.infer<typeof socialLinkSchema>;
export type SocialLink = typeof socialLinks.$inferSelect;

// Skills schema
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  percentage: text("percentage").notNull(),
  category: text("category").notNull(), // primary skills, expertise, etc.
  order: text("order").notNull(),
});

export const skillSchema = createInsertSchema(skills).pick({
  name: true,
  percentage: true,
  category: true,
});

export type InsertSkill = z.infer<typeof skillSchema>;
export type Skill = typeof skills.$inferSelect;

// Contact messages schema
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export type InsertContactMessage = z.infer<typeof contactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Project interest messages schema
export const projectInterestMessages = pgTable("project_interest_messages", {
  id: serial("id").primaryKey(),
  projectId: serial("project_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projectInterestSchema = createInsertSchema(projectInterestMessages).pick({
  projectId: true,
  name: true,
  email: true,
  phone: true,
  message: true,
});

export type InsertProjectInterest = z.infer<typeof projectInterestSchema>;
export type ProjectInterest = typeof projectInterestMessages.$inferSelect;
