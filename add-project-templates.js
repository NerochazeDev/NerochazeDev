import { db } from "./server/db.ts";
import { projects } from "./shared/schema.ts";

async function createProjectTemplates() {
  console.log("Creating project templates...");

  try {
    // 1. Tailor Website Template
    await db.insert(projects).values({
      title: "Elegance - Premium Tailor Shop Template",
      description: "A sophisticated website template for tailors and bespoke clothing businesses. Features appointment booking, measurement tracking, and a fabric gallery. The elegant design showcases your craftsmanship and creates a premium online presence for your tailoring business.",
      image: "https://images.unsplash.com/photo-1564859228273-274232fdb516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Tailwind CSS"],
      tags: ["tailor", "fashion", "e-commerce", "appointment", "premium", "bespoke"],
      category: "Tailor Shop Website",
      price: "1,299 USDT",
      liveLink: "https://tailorshop-template.example.com",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // 2. Photographer Portfolio Template
    await db.insert(projects).values({
      title: "Aperture - Professional Photographer Portfolio",
      description: "A visually stunning portfolio website template for photographers. Featuring fullscreen galleries, client proofing areas, and integrated booking system. Optimized for displaying high-resolution images with minimal loading times and interactive galleries to showcase your best work.",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
      technologies: ["React", "Next.js", "MongoDB", "AWS S3", "Cloudinary", "Framer Motion"],
      tags: ["photography", "portfolio", "gallery", "booking", "creative"],
      category: "Photographer Website",
      price: "999 USDT",
      liveLink: "https://aperture-portfolio.example.com",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // 3. Hairdresser/Salon Template
    await db.insert(projects).values({
      title: "Gloss - Modern Hair Salon & Spa Template",
      description: "A stylish and feature-rich website template for hair salons, barbershops, and spas. Includes appointment scheduling, service catalog with pricing, staff profiles, and before/after galleries. The design combines modern aesthetics with practical features to help grow your beauty business.",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
      technologies: ["React", "Firebase", "Stripe", "Google Calendar API", "Tailwind CSS", "Redux"],
      tags: ["salon", "hairdresser", "beauty", "spa", "appointment", "booking"],
      category: "Salon & Spa Website",
      price: "899 USDT",
      liveLink: "https://gloss-salon.example.com",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // 4. Freelancer Portfolio Template
    await db.insert(projects).values({
      title: "Freelance Pro - Digital Nomad Portfolio",
      description: "A comprehensive portfolio website template for freelancers and digital nomads. Features project showcases, testimonials, service listings, and integrated contact forms. Designed to help freelancers convert visitors into clients with persuasive content sections and clear calls to action.",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2570&q=80",
      technologies: ["React", "Express", "MongoDB", "Nodemailer", "Framer Motion", "Tailwind CSS"],
      tags: ["freelancer", "portfolio", "services", "digital-nomad", "remote-work"],
      category: "Freelancer Portfolio",
      price: "799 USDT",
      liveLink: "https://freelance-pro.example.com",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // 5. Personal Website Template
    await db.insert(projects).values({
      title: "Personal Brand - Professional Bio Website",
      description: "An elegant personal website template for professionals, consultants, and thought leaders. Highlights your expertise, blog content, speaking engagements, and media appearances. Perfect for building your personal brand and establishing authority in your field with a professional online presence.",
      image: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
      technologies: ["React", "Next.js", "Sanity CMS", "Vercel", "Tailwind CSS", "TypeScript"],
      tags: ["personal-brand", "professional", "bio", "consultant", "speaker"],
      category: "Personal Website",
      price: "699 USDT",
      liveLink: "https://personal-brand.example.com",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    console.log("5 project templates created successfully!");
  } catch (error) {
    console.error("Error creating project templates:", error);
  } finally {
    process.exit(0);
  }
}

createProjectTemplates();