import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Database, CheckCircle2 } from "lucide-react";

export function DataSeeder() {
  const [isAddingProjects, setIsAddingProjects] = useState(false);
  const [isAddingBlogs, setIsAddingBlogs] = useState(false);
  const [projectsAdded, setProjectsAdded] = useState(false);
  const [blogsAdded, setBlogsAdded] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Project templates data
  const projectTemplates = [
    {
      title: "Elegance - Premium Tailor Shop Template",
      description: "A sophisticated website template for tailors and bespoke clothing businesses. Features appointment booking, measurement tracking, and a fabric gallery. The elegant design showcases your craftsmanship and creates a premium online presence for your tailoring business.",
      image: "https://images.unsplash.com/photo-1564859228273-274232fdb516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Tailwind CSS"],
      tags: ["tailor", "fashion", "e-commerce", "appointment", "premium", "bespoke"],
      category: "Tailor Shop Website",
      price: "1,299 USDT",
      liveLink: "https://tailorshop-template.example.com",
    },
    {
      title: "Aperture - Professional Photographer Portfolio",
      description: "A visually stunning portfolio website template for photographers. Featuring fullscreen galleries, client proofing areas, and integrated booking system. Optimized for displaying high-resolution images with minimal loading times and interactive galleries to showcase your best work.",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
      technologies: ["React", "Next.js", "MongoDB", "AWS S3", "Cloudinary", "Framer Motion"],
      tags: ["photography", "portfolio", "gallery", "booking", "creative"],
      category: "Photographer Website",
      price: "999 USDT",
      liveLink: "https://aperture-portfolio.example.com",
    },
    {
      title: "Gloss - Modern Hair Salon & Spa Template",
      description: "A stylish and feature-rich website template for hair salons, barbershops, and spas. Includes appointment scheduling, service catalog with pricing, staff profiles, and before/after galleries. The design combines modern aesthetics with practical features to help grow your beauty business.",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
      technologies: ["React", "Firebase", "Stripe", "Google Calendar API", "Tailwind CSS", "Redux"],
      tags: ["salon", "hairdresser", "beauty", "spa", "appointment", "booking"],
      category: "Salon & Spa Website",
      price: "899 USDT",
      liveLink: "https://gloss-salon.example.com",
    },
    {
      title: "Freelance Pro - Digital Nomad Portfolio",
      description: "A comprehensive portfolio website template for freelancers and digital nomads. Features project showcases, testimonials, service listings, and integrated contact forms. Designed to help freelancers convert visitors into clients with persuasive content sections and clear calls to action.",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2570&q=80",
      technologies: ["React", "Express", "MongoDB", "Nodemailer", "Framer Motion", "Tailwind CSS"],
      tags: ["freelancer", "portfolio", "services", "digital-nomad", "remote-work"],
      category: "Freelancer Portfolio",
      price: "799 USDT",
      liveLink: "https://freelance-pro.example.com",
    },
    {
      title: "Personal Brand - Professional Bio Website",
      description: "An elegant personal website template for professionals, consultants, and thought leaders. Highlights your expertise, blog content, speaking engagements, and media appearances. Perfect for building your personal brand and establishing authority in your field with a professional online presence.",
      image: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
      technologies: ["React", "Next.js", "Sanity CMS", "Vercel", "Tailwind CSS", "TypeScript"],
      tags: ["personal-brand", "professional", "bio", "consultant", "speaker"],
      category: "Personal Website",
      price: "699 USDT",
      liveLink: "https://personal-brand.example.com",
    }
  ];

  // Blog posts data
  const blogPosts = [
    {
      title: "The Evolution of Web Design: Trends to Watch in 2025",
      slug: "web-design-trends-2025",
      excerpt: "An exploration of the latest web design trends that are shaping the digital landscape in 2025, from AI-driven personalization to immersive 3D experiences.",
      content: `
# The Evolution of Web Design: Trends to Watch in 2025

In the fast-paced world of web design, staying ahead of trends isn't just about aesthetics—it's about creating experiences that resonate with users and drive engagement. As we move through 2025, several key trends are reshaping how we approach web design.

## AI-Driven Personalization

Artificial intelligence has transcended being just a buzzword and is now a fundamental component of advanced web design. In 2025, websites are increasingly leveraging AI to:

- Create dynamically personalized user experiences based on behavior patterns
- Adjust content layout and presentation according to individual preferences
- Predict user needs and present relevant information proactively

This level of personalization makes users feel understood and valued, significantly boosting engagement metrics and conversion rates.

## Immersive 3D Experiences

The line between digital and physical continues to blur with the rise of immersive 3D elements in web design. Rather than simple animations, websites are now incorporating:

- Interactive 3D models that users can manipulate
- Spatial interfaces that create depth and dimension
- Virtual showrooms for products that mimic in-person shopping experiences

These elements transform passive browsing into active exploration, keeping users engaged for longer periods.

## Minimalism 2.0

Minimalism has evolved from stark simplicity to thoughtful restraint. The updated approach focuses on:

- Strategic use of whitespace to guide attention
- Limited color palettes with occasional bold accents
- Typography as a central design element
- Subtle micro-interactions that add delight without distraction

This refined minimalism creates interfaces that feel clean and uncluttered while still offering rich functionality.

## Dark Mode by Default

Dark mode has transitioned from an alternative option to the primary design choice for many sites. Benefits include:

- Reduced eye strain, especially in low-light environments
- Energy savings on OLED displays
- Enhanced visual hierarchy and content focus
- Sophisticated, premium aesthetic

Smart implementations now automatically adjust to user preferences and environmental conditions.

## Voice User Interfaces

As voice search and commands become ubiquitous, web designs are adapting to accommodate these interactions:

- Voice-activated navigation options
- Audio feedback for interactions
- Content structured to answer spoken queries
- Multimodal interfaces that combine voice with traditional inputs

This trend is making websites more accessible and convenient across a broader range of contexts.

## Microinteractions with Purpose

Subtle animations and interactive elements now serve specific functional purposes:

- Providing feedback on user actions
- Guiding attention to important elements
- Communicating system status
- Creating moments of delight that strengthen brand connection

These purposeful microinteractions enhance usability while adding personality to digital experiences.

## Conclusion

The web design landscape of 2025 blends technological advancement with human-centered design principles. By thoughtfully implementing these trends, designers can create websites that not only look contemporary but also deliver meaningful, engaging experiences that serve both users and business goals.

Whether you're refreshing an existing site or building something new, consider how these trends might enhance your digital presence and connect with your audience in more effective ways.`,
      coverImage: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      tags: ["web design", "design trends", "UX/UI", "technology"],
      published: "true",
    },
    {
      title: "Building a High-Converting E-commerce Website: Essential Elements",
      slug: "high-converting-ecommerce-essentials",
      excerpt: "Discover the critical components that transform an ordinary online store into a high-converting e-commerce powerhouse that drives sales and customer loyalty.",
      content: `
# Building a High-Converting E-commerce Website: Essential Elements

In today's competitive digital marketplace, having an e-commerce website is just the starting point. The real challenge lies in creating an online store that consistently converts visitors into customers. This guide explores the essential elements that separate high-performing e-commerce sites from the rest.

## Streamlined Navigation

The foundation of any successful e-commerce site is intuitive navigation that helps customers find products quickly:

- Implement a logical category structure that reflects how customers think about your products
- Utilize breadcrumbs to help users track their location within your site
- Create persistent navigation elements that remain accessible throughout the shopping journey
- Use mega menus for stores with large product catalogs

A well-designed navigation system reduces friction and keeps potential customers engaged with your offerings.

## Search Functionality That Works

Even with excellent navigation, many users prefer to search directly for what they want:

- Implement robust search with autocomplete suggestions
- Enable filtering by product attributes (size, color, price range, etc.)
- Incorporate synonym recognition to account for different search terms
- Provide useful results for misspelled queries

High-quality search functionality can significantly increase conversion rates, especially for stores with extensive inventories.

## Compelling Product Pages

Your product pages are where purchase decisions happen, making them critical conversion points:

- Feature high-quality, zoomable product images from multiple angles
- Include detailed, scannable product descriptions that address common questions
- Display clear pricing information and any available discounts
- Showcase genuine customer reviews and ratings
- Implement size guides and comparison tools when relevant
- Use prominent, distinctively styled call-to-action buttons

Remember that each product page is potentially a landing page, so it needs to tell a complete story about the item.

## Transparent Checkout Process

Shopping cart abandonment often happens during checkout. Combat this with:

- A progress indicator showing how many steps remain
- Guest checkout options that don't force account creation
- Multiple payment methods to accommodate different preferences
- Clear display of all costs, including shipping, before the final step
- Persistent order summary throughout the checkout flow
- Trust signals like security badges and guarantees

The checkout process should feel safe, straightforward, and respectfully efficient.

## Conclusion

Building a high-converting e-commerce website requires careful attention to both user experience and technical details. While these elements provide a foundation, continuous testing and refinement based on analytics and customer feedback will help you maximize your conversion potential over time.

The most successful e-commerce sites are those that evolve with changing consumer expectations while maintaining a consistent focus on making the shopping experience as frictionless and enjoyable as possible.`,
      coverImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      tags: ["e-commerce", "web development", "conversion optimization", "UX/UI"],
      published: "true",
    },
    {
      title: "The Rise of Headless CMS: Revolutionizing Content Management",
      slug: "headless-cms-revolution",
      excerpt: "Learn how headless CMS architecture is transforming content management and enabling more flexible, future-proof digital experiences across multiple platforms.",
      content: `
# The Rise of Headless CMS: Revolutionizing Content Management

Content management systems (CMS) have been the backbone of websites for decades, but traditional monolithic CMS platforms are increasingly being challenged by a more flexible approach: headless CMS. This architectural shift is revolutionizing how organizations create, manage, and deploy content across digital channels.

## What Is a Headless CMS?

Unlike traditional CMS platforms that combine content management with content presentation, a headless CMS:

- Decouples the content repository (the "body") from the presentation layer (the "head")
- Delivers content via APIs rather than rendering web pages directly
- Allows content to be published to any device or channel, from websites to mobile apps, IoT devices, and beyond
- Treats content as structured data rather than page elements

This approach represents a fundamental shift from page-centric to content-centric digital experiences.

## Key Benefits of Going Headless

The growing adoption of headless architecture is driven by several compelling advantages:

### Future-Proof Flexibility

With content separated from presentation, organizations can:

- Adapt to new devices and channels as they emerge without rearchitecting their content
- Update the design and user experience independently from content updates
- Implement new front-end technologies without migrating content

This separation creates significant long-term flexibility as digital channels continue to evolve.

### Developer Experience

Modern development teams particularly benefit from headless architecture:

- Freedom to use preferred front-end frameworks (React, Vue, Angular, etc.)
- Ability to implement JAMstack architectures for improved performance and security
- Streamlined development workflows with familiar tools
- Easier integration with other systems and services

These factors often lead to faster development cycles and greater innovation.

## Conclusion

The headless CMS revolution represents a broader shift toward composable digital experiences, where organizations assemble best-of-breed components rather than relying on monolithic platforms.

As digital channels continue to multiply and consumer expectations rise, the flexibility and scalability of headless architecture will likely become increasingly valuable for organizations of all sizes.`,
      coverImage: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2568&q=80",
      tags: ["CMS", "headless", "content management", "web development", "architecture"],
      published: "true",
    },
    {
      title: "Optimizing Website Performance: Speed Matters More Than Ever",
      slug: "website-performance-optimization",
      excerpt: "A comprehensive guide to improving website speed and performance, covering everything from image optimization to advanced caching strategies.",
      content: `
# Optimizing Website Performance: Speed Matters More Than Ever

In today's digital landscape, website performance isn't just a technical consideration—it's a critical business factor that affects everything from user experience to search rankings and conversion rates. This guide explores practical strategies for optimizing website speed and performance.

## Why Performance Matters

Before diving into optimization techniques, it's worth understanding the impact of performance:

- **User Experience**: 53% of mobile users abandon sites that take longer than 3 seconds to load
- **Conversion Rates**: A 1-second delay in page load time can reduce conversions by 7%
- **SEO Rankings**: Site speed is a ranking factor for search engines
- **Brand Perception**: Fast, responsive sites create an impression of quality and reliability

These factors make performance optimization one of the highest-ROI improvements you can make to your website.

## Core Web Vitals: The New Performance Baseline

Google's Core Web Vitals have established standardized metrics for measuring user experience:

### Largest Contentful Paint (LCP)
Measures loading performance—how quickly the largest content element becomes visible.
- **Goal**: LCP should occur within 2.5 seconds of page load

### First Input Delay (FID)
Measures interactivity—how quickly the page responds to user interactions.
- **Goal**: FID should be less than 100 milliseconds

### Cumulative Layout Shift (CLS)
Measures visual stability—how much elements move around during page load.
- **Goal**: CLS should be less than 0.1

Optimizing for these metrics creates a solid foundation for overall performance.

## Image Optimization Strategies

Images often account for the largest portion of page weight:

- **Format Selection**: Use WebP with JPEG/PNG fallbacks for broader compatibility
- **Responsive Images**: Implement \`srcset\` and \`sizes\` attributes to serve appropriate image sizes
- **Lazy Loading**: Defer off-screen images with \`loading="lazy"\` or Intersection Observer

Properly optimized images can reduce page weight by 50% or more in many cases.

## Conclusion

Website performance optimization has evolved from a technical nice-to-have to a business-critical practice. The strategies outlined here provide a framework for improvement, but each site will have unique optimization opportunities.

By approaching performance as an ongoing priority rather than a one-time project, you can create experiences that satisfy both users and search engines while supporting your business objectives.`,
      coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2669&q=80",
      tags: ["performance", "web development", "optimization", "Core Web Vitals", "speed"],
      published: "true",
    },
    {
      title: "Effective UI/UX Principles for Non-Designers",
      slug: "ui-ux-principles-for-non-designers",
      excerpt: "Learn the fundamental UI/UX design principles that every developer, product manager, and business owner should understand to create better digital products.",
      content: `
# Effective UI/UX Principles for Non-Designers

You don't need to be a professional designer to create better digital experiences. Understanding fundamental UI/UX principles can help developers, product managers, and business owners make more informed decisions about their digital products. This guide covers the essential concepts that non-designers should know.

## Understanding the Difference: UI vs. UX

Before diving into principles, it's important to clarify the distinction:

- **User Interface (UI)** refers to the visual elements users interact with—buttons, input fields, navigation menus, typography, colors, and layouts.
- **User Experience (UX)** encompasses the entire journey and how users feel when interacting with a product or service, including ease of use, efficiency, and emotional response.

While interconnected, these disciplines focus on different aspects of product design.

## The Hierarchy of User Needs

Digital products, like physical ones, must satisfy fundamental needs before addressing higher-level concerns:

1. **Functionality**: Does it work reliably?
2. **Usability**: Is it easy to use?
3. **Comfort**: Is it pleasant to use?
4. **Delight**: Does it provide unexpected value or joy?

This hierarchy (adapted from Aarron Walter's work) helps prioritize improvements: fix functional issues before polishing aesthetics.

## Essential UI Principles

### Visual Hierarchy

Not all elements deserve equal attention. Visual hierarchy guides users through content in order of importance:

- Use size, contrast, color, and space to indicate importance
- Place critical elements where users naturally look first (typically top-left in Western cultures)
- Limit the number of "important" elements to avoid overwhelming users

Effective hierarchy ensures users notice what matters most.

## Conclusion

While mastering design takes years of practice, understanding these fundamental principles can significantly improve the quality of digital products created by non-designers. Remember that good design often feels invisible—users notice when something is difficult or confusing, but rarely recognize when it works perfectly.

By focusing on user needs, reducing friction, maintaining consistency, and learning from observation, anyone involved in product development can contribute to better user experiences.`,
      coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2664&q=80",
      tags: ["UI/UX", "design principles", "web design", "product development"],
      published: "true",
    },
    {
      title: "The Strategic Value of Custom Web Development for Growing Businesses",
      slug: "custom-web-development-value",
      excerpt: "Explore how custom web development delivers long-term business value beyond off-the-shelf solutions, enabling scalability, competitive differentiation, and better customer experiences.",
      content: `
# The Strategic Value of Custom Web Development for Growing Businesses

In a digital landscape crowded with templated websites and SaaS platforms, growing businesses face critical decisions about their web presence. While off-the-shelf solutions offer quick deployment and lower upfront costs, custom web development provides strategic advantages that can deliver superior long-term value. This article explores when and why businesses should consider custom development as a strategic investment.

## Beyond Templates: When Custom Development Makes Business Sense

Custom web development isn't necessary for every business, but certain scenarios make it particularly valuable:

### Complex Business Processes

When your business operates with unique workflows or specialized processes:

- **Integration Capabilities**: Custom solutions can seamlessly connect with existing business systems
- **Process Optimization**: Digital workflows can be designed to match your exact business procedures
- **Automation Opportunities**: Repetitive tasks specific to your business can be automated

These benefits are difficult to achieve with generic solutions that assume standardized operations.

### Competitive Differentiation

In crowded markets, your digital presence is increasingly part of your competitive advantage:

- **Unique User Experiences**: Create interactions that align precisely with your brand and value proposition
- **Proprietary Features**: Build functionality that supports your specific competitive advantages
- **Brand Expression**: Implement design that truly represents your brand rather than conforming to templates

Custom development allows you to extend your differentiation strategy into the digital realm rather than forcing digital conformity.

## The Business Value Proposition of Custom Development

Beyond addressing specific scenarios, custom development creates tangible business value:

### Enhanced Customer Experience

Customer experience has become a primary competitive differentiator:

- **Streamlined Journeys**: Design user flows specifically optimized for your customer needs
- **Reduced Friction**: Eliminate unnecessary steps or information required from users
- **Personalization Capabilities**: Build systems that recognize and respond to individual user preferences

## Conclusion

For growing businesses with unique processes, differentiation needs, or scalability concerns, custom web development represents a strategic investment rather than merely a technical expense. By creating digital assets that precisely align with business goals and customer needs, custom development can deliver superior long-term value despite higher initial costs.`,
      coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      tags: ["web development", "custom development", "business strategy", "digital transformation"],
      published: "true",
    }
  ];

  // Add projects mutation
  const addProjectsMutation = useMutation({
    mutationFn: async () => {
      setIsAddingProjects(true);
      
      // Add each project sequentially
      for (const project of projectTemplates) {
        await apiRequest({
          url: "/api/projects",
          method: "POST",
          body: JSON.stringify(project)
        });
      }
      
      return true;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Projects added successfully",
      });
      setProjectsAdded(true);
      setIsAddingProjects(false);
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `Failed to add projects: ${error.message}`,
        variant: "destructive",
      });
      setIsAddingProjects(false);
    }
  });

  // Add blog posts mutation
  const addBlogPostsMutation = useMutation({
    mutationFn: async () => {
      setIsAddingBlogs(true);
      
      // Add each blog post sequentially
      for (const blog of blogPosts) {
        await apiRequest({
          url: "/api/blog",
          method: "POST",
          body: JSON.stringify(blog)
        });
      }
      
      return true;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Blog posts added successfully",
      });
      setBlogsAdded(true);
      setIsAddingBlogs(false);
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `Failed to add blog posts: ${error.message}`,
        variant: "destructive",
      });
      setIsAddingBlogs(false);
    }
  });

  return (
    <Card className="border-gray-800 bg-gray-900">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white flex items-center">
          <Database className="mr-2 h-5 w-5 text-cyan-400" /> 
          Data Management Tools
        </CardTitle>
        <CardDescription className="text-gray-400">
          Add demo data to your portfolio website
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-medium text-white">Project Templates</h3>
              <p className="text-sm text-gray-400">Add 5 website template projects to your portfolio</p>
            </div>
            <div>
              {projectsAdded ? (
                <div className="flex items-center text-green-400">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  <span>Added</span>
                </div>
              ) : (
                <Button 
                  onClick={() => addProjectsMutation.mutate()}
                  disabled={isAddingProjects || projectsAdded}
                  className="bg-cyan-600 hover:bg-cyan-700"
                >
                  {isAddingProjects ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : "Add Projects"}
                </Button>
              )}
            </div>
          </div>
          <div className="text-xs text-gray-400">
            <p>Includes templates for: Tailor, Photographer, Hairdresser, Freelancer and Personal websites</p>
          </div>
        </div>
        
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-medium text-white">Blog Content</h3>
              <p className="text-sm text-gray-400">Add 6 professional blog posts to your website</p>
            </div>
            <div>
              {blogsAdded ? (
                <div className="flex items-center text-green-400">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  <span>Added</span>
                </div>
              ) : (
                <Button 
                  onClick={() => addBlogPostsMutation.mutate()}
                  disabled={isAddingBlogs || blogsAdded}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isAddingBlogs ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : "Add Blog Posts"}
                </Button>
              )}
            </div>
          </div>
          <div className="text-xs text-gray-400">
            <p>Topics include: Web Design, E-commerce, Headless CMS, Website Performance, UI/UX Principles, and Custom Development</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}