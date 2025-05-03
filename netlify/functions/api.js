const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const { Pool } = require('@neondatabase/serverless');
const { drizzle } = require('drizzle-orm/neon-serverless');
const ws = require('ws');
const { neonConfig } = require('@neondatabase/serverless');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Setup database connection
neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const schema = require('../../dist/shared/schema');
const db = drizzle({ client: pool, schema });

// Define routes
app.get('/api/website-info/:section', async (req, res) => {
  try {
    const { section } = req.params;
    const websiteInfo = await db.query.websiteInfo.findMany({
      where: (info, { eq }) => eq(info.section, section)
    });
    res.json({ success: true, data: websiteInfo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add other necessary API routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await db.query.projects.findMany();
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/blog/published', async (req, res) => {
  try {
    const posts = await db.query.blogPosts.findMany({
      where: (post, { eq }) => eq(post.published, true)
    });
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Export the serverless function
module.exports.handler = serverless(app);