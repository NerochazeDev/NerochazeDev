import { users, type User, type InsertUser, type ContactMessage, type InsertContactMessage } from "@shared/schema";

// Extend the storage interface with contact message methods
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  getAllContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, ContactMessage>;
  private userCurrentId: number;
  private messageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.userCurrentId = 1;
    this.messageCurrentId = 1;
  }

  // User methods from the original
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
}

export const storage = new MemStorage();
