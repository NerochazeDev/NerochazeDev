import fetch from 'node-fetch';

// Sample project data - URLs will be placeholders you can change later
const sampleProjects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with product management, shopping cart, checkout process, and user authentication. Built with React, Node.js, and PostgreSQL.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "Stripe", "Redux"],
    tags: ["Web Application", "E-Commerce", "Full Stack"],
    price: "$5,000 - $10,000",
    liveLink: "https://example.com/ecommerce-demo",
    category: "Web Development"
  },
  {
    title: "Real-Time Chat Application",
    description: "A real-time messaging platform with features like private chats, group conversations, file sharing, and message encryption. Implements WebSockets for instant communication.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    technologies: ["React", "Socket.io", "Node.js", "MongoDB", "WebRTC"],
    tags: ["Real-Time", "Communication", "Web Application"],
    price: "$3,000 - $7,000",
    liveLink: "https://example.com/chat-demo",
    category: "Web Development"
  },
  {
    title: "Portfolio Website Builder",
    description: "A drag-and-drop portfolio website builder for creatives. Features customizable templates, responsive design, and built-in analytics. Optimized for showcasing visual work.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    technologies: ["React", "Typescript", "Firebase", "Tailwind CSS", "Framer Motion"],
    tags: ["SaaS", "Design", "Portfolio"],
    price: "$2,500 - $5,000",
    liveLink: "https://example.com/portfolio-builder-demo",
    category: "Web Application"
  },
  {
    title: "Task Management System",
    description: "A comprehensive project and task management tool with features like Kanban boards, time tracking, team collaboration, and detailed reporting. Suitable for teams of all sizes.",
    image: "https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    technologies: ["Vue.js", "Vuex", "Express", "MongoDB", "Chart.js"],
    tags: ["Productivity", "SaaS", "Project Management"],
    price: "$4,000 - $8,000",
    liveLink: "https://example.com/task-manager-demo",
    category: "Web Application"
  },
  {
    title: "AI-Powered Content Generator",
    description: "An AI tool that generates high-quality blog articles, social media posts, and marketing copy. Includes SEO optimization features and audience targeting capabilities.",
    image: "https://images.unsplash.com/photo-1677442135136-760c813170c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
    technologies: ["Python", "TensorFlow", "React", "FastAPI", "OpenAI API"],
    tags: ["Artificial Intelligence", "Content", "Marketing"],
    price: "$8,000 - $15,000",
    liveLink: "https://example.com/ai-content-demo",
    category: "AI Solutions"
  }
];

async function createProjects() {
  console.log("Starting to create projects...");
  
  for (let i = 0; i < sampleProjects.length; i++) {
    const project = sampleProjects[i];
    console.log(`Creating project ${i+1}/${sampleProjects.length}: "${project.title}"`);
    
    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        console.log(`✓ Successfully created project: "${project.title}"`);
      } else {
        console.error(`✗ Failed to create project: "${project.title}"`, result);
      }
    } catch (error) {
      console.error(`✗ Error creating project: "${project.title}"`, error.message);
    }
  }
  
  console.log("Finished creating all projects!");
}

createProjects().catch(console.error);