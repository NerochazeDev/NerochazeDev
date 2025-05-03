import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaFolder } from "react-icons/fa";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
}

const ProjectsSection = () => {
  const projects: Project[] = [
    {
      title: "Modern E-commerce Platform",
      description: "A high-performance e-commerce application with advanced product filtering, user authentication, and secure payment processing.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS"],
      githubLink: "https://github.com/nerochaze",
      liveLink: "https://shop.nerochaze.com",
    },
    {
      title: "AI-Powered Task Manager",
      description: "A productivity application leveraging AI to categorize, prioritize and manage tasks with real-time collaboration features and smart notifications.",
      image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Node.js", "OpenAI API", "WebSockets", "Redux"],
      githubLink: "https://github.com/nerochaze",
      liveLink: "https://taskmaster.nerochaze.com",
    },
    {
      title: "Real-time Analytics Dashboard",
      description: "A comprehensive analytics platform with customizable widgets, real-time data tracking, and interactive visualizations for business intelligence.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "D3.js", "Express", "MongoDB", "WebSockets"],
      githubLink: "https://github.com/nerochaze",
      liveLink: "https://analytics.nerochaze.com",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold mb-6 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#64FFDA] font-mono mr-2">03.</span>
          Projects
          <span className="ml-4 h-px bg-gray-300 flex-grow"></span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="project-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="relative h-48">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#172A45] bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="flex space-x-4">
                    <a 
                      href={project.liveLink} 
                      className="bg-white text-[#172A45] p-2 rounded-full" 
                      aria-label="View Project"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt />
                    </a>
                    <a 
                      href={project.githubLink} 
                      className="bg-white text-[#172A45] p-2 rounded-full" 
                      aria-label="View Code"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <div className="text-[#64FFDA]">
                    <FaFolder />
                  </div>
                </div>
                <p className="text-[#6c757d] mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap text-sm gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="text-[#6c757d]">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <motion.a 
            href="https://github.com/nerochaze" 
            className="border-2 border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#172A45] px-6 py-3 rounded font-medium inline-block transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            See More Projects
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
