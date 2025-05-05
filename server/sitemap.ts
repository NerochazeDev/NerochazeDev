import { storage } from './storage';
import { join } from 'path';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

// Consider making this configurable via environment variable
const DOMAIN = 'https://nerochaze.replit.app';

/**
 * Advanced sitemap generator with enhanced SEO features and structured data support
 * This implementation follows Google's latest sitemap guidelines and best practices
 */
export async function generateSitemap() {
  try {
    // Fetch all necessary data for comprehensive sitemap
    const blogPosts = await storage.getPublishedBlogPosts();
    const projects = await storage.getAllProjects();
    const skills = await storage.getAllSkills();
    
    // Get current timestamp for default lastmod values
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Create XML sitemap with expanded namespaces for rich results
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Primary Pages -->
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <url>
    <loc>${DOMAIN}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${DOMAIN}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${DOMAIN}/portfolio</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>${DOMAIN}/services</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Blog Section -->
  <url>
    <loc>${DOMAIN}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;

    // Create a set of unique tags from blog posts for tag pages
    const blogTags = new Set<string>();
    
    // Add all blog posts to sitemap with rich image data
    for (const post of blogPosts) {
      // Collect tags for tag pages
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => blogTags.add(tag));
      }
      
      // Format lastmod date (using updatedAt or createdAt with fallback)
      const lastMod = post.updatedAt || post.createdAt 
        ? new Date(post.updatedAt || post.createdAt).toISOString().split('T')[0]
        : currentDate;
      
      // Enhanced blog post entry with image data for rich snippets
      sitemap += `
  <url>
    <loc>${DOMAIN}/blog/${post.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    ${post.coverImage ? `
    <image:image>
      <image:loc>${post.coverImage}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
      <image:caption>${escapeXml(post.excerpt || '')}</image:caption>
    </image:image>` : ''}
  </url>`;
    }
    
    // Add tag pages to sitemap
    for (const tag of Array.from(blogTags)) {
      sitemap += `
  <url>
    <loc>${DOMAIN}/blog/tag/${encodeURIComponent(tag.toLowerCase())}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    // Add all projects to sitemap with rich image data
    for (const project of projects) {
      // Format lastmod date if available
      const lastMod = project.updatedAt 
        ? new Date(project.updatedAt).toISOString().split('T')[0]
        : currentDate;
      
      sitemap += `
  <url>
    <loc>${DOMAIN}/project/${project.id}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    ${project.image ? `
    <image:image>
      <image:loc>${project.image}</image:loc>
      <image:title>${escapeXml(project.title)}</image:title>
      <image:caption>${escapeXml(project.description || '')}</image:caption>
    </image:image>` : ''}
  </url>`;
    }
    
    // Add category pages for projects
    const projectCategories = new Set<string>();
    projects.forEach(project => {
      if (project.category) {
        projectCategories.add(project.category);
      }
    });
    
    for (const category of Array.from(projectCategories)) {
      sitemap += `
  <url>
    <loc>${DOMAIN}/portfolio/category/${encodeURIComponent(category.toLowerCase())}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }
    
    // Add skills page if we have skills
    if (skills.length > 0) {
      sitemap += `
  <url>
    <loc>${DOMAIN}/skills</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    // Close sitemap XML
    sitemap += `
</urlset>`;

    // Create directory if it doesn't exist
    const publicDir = join(process.cwd(), 'client/public');
    if (!existsSync(publicDir)) {
      mkdirSync(publicDir, { recursive: true });
    }
    
    // Write sitemap to public directory
    const sitemapPath = join(publicDir, 'sitemap.xml');
    writeFileSync(sitemapPath, sitemap);
    
    // Also generate robots.txt if it doesn't exist
    const robotsPath = join(publicDir, 'robots.txt');
    if (!existsSync(robotsPath)) {
      const robotsTxt = `# robots.txt generated by NerochazeTech portfolio
User-agent: *
Allow: /

# Sitemap
Sitemap: ${DOMAIN}/sitemap.xml
`;
      writeFileSync(robotsPath, robotsTxt);
      console.log('robots.txt generated successfully!');
    }
    
    console.log('Sitemap.xml generated successfully!');
    return true;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return false;
  }
}

/**
 * Helper function to escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}