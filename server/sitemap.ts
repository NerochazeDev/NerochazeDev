import { storage } from './storage';
import { join } from 'path';
import { writeFileSync } from 'fs';

const DOMAIN = 'https://nerochaze.replit.app';

/**
 * Dynamically generates sitemap.xml with all blog posts and projects
 */
export async function generateSitemap() {
  try {
    // Fetch all published blog posts and projects from the database
    const blogPosts = await storage.getPublishedBlogPosts();
    const projects = await storage.getAllProjects();
    
    // Create XML sitemap content
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${DOMAIN}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Blog Page -->
  <url>
    <loc>${DOMAIN}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

    // Add all blog posts to sitemap
    for (const post of blogPosts) {
      // Format lastmod date (using updatedAt or createdAt)
      const lastMod = new Date(post.updatedAt || post.createdAt).toISOString().split('T')[0];
      
      sitemap += `
  <url>
    <loc>${DOMAIN}/blog/${post.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    // Add all projects to sitemap
    for (const project of projects) {
      sitemap += `
  <url>
    <loc>${DOMAIN}/project/${project.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    // Close sitemap XML
    sitemap += `
</urlset>`;

    // Write sitemap to public directory
    const sitemapPath = join(process.cwd(), 'client/public/sitemap.xml');
    writeFileSync(sitemapPath, sitemap);
    
    console.log('Sitemap.xml generated successfully!');
    return true;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return false;
  }
}