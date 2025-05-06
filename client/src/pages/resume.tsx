import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FaDownload, FaBriefcase, FaGraduationCap, FaCode, FaUsers, FaCertificate } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Resume = () => {
  // Professional Experience
  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      period: "2021 - Present",
      description: "Lead the development of enterprise-level web applications using React, Node.js, and PostgreSQL. Implemented CI/CD pipelines and improved application performance by 40%.",
      achievements: [
        "Architected and developed a real-time dashboard system for monitoring customer data",
        "Mentored junior developers and conducted code reviews",
        "Implemented automated testing strategies that increased code coverage by 35%"
      ]
    },
    {
      title: "Web Developer",
      company: "Digital Creations Agency",
      period: "2018 - 2021",
      description: "Specialized in building responsive, interactive websites and web applications for various clients across industries.",
      achievements: [
        "Created over 30 custom websites for clients ranging from small businesses to corporate enterprises",
        "Implemented e-commerce solutions with payment gateway integrations",
        "Optimized websites for speed and SEO performance"
      ]
    },
    {
      title: "Frontend Developer",
      company: "InnovateTech Startups",
      period: "2016 - 2018",
      description: "Developed user interfaces for startup products using React and modern JavaScript frameworks.",
      achievements: [
        "Built responsive interfaces for web and mobile applications",
        "Collaborated with UX designers to implement intuitive user experiences",
        "Contributed to open-source libraries and frameworks"
      ]
    }
  ];

  // Education
  const education = [
    {
      degree: "Master of Computer Science",
      institution: "Tech University",
      period: "2014 - 2016",
      description: "Specialized in Software Engineering and Web Technologies."
    },
    {
      degree: "Bachelor of Science in Computer Engineering",
      institution: "State Engineering College",
      period: "2010 - 2014",
      description: "Graduated with honors. Focus on programming and system architecture."
    }
  ];

  // Skills
  const skills = [
    {
      category: "Frontend Development",
      items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "JavaScript", "HTML/CSS", "Redux"]
    },
    {
      category: "Backend Development",
      items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL", "Firebase"]
    },
    {
      category: "DevOps & Tools",
      items: ["Git", "Docker", "CI/CD", "AWS", "Vercel", "Netlify", "Jest", "Cypress"]
    }
  ];

  // Certifications
  const certifications = [
    {
      name: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      date: "2023"
    },
    {
      name: "Professional Scrum Master I (PSM I)",
      issuer: "Scrum.org",
      date: "2022"
    },
    {
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "2021"
    }
  ];

  // Projects
  const projects = [
    {
      name: "E-commerce Platform",
      description: "Built a complete e-commerce solution with payment processing, inventory management, and customer analytics.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe API"]
    },
    {
      name: "Healthcare Management System",
      description: "Developed a patient management system for healthcare providers with telemedicine capabilities.",
      technologies: ["Next.js", "Express", "MongoDB", "WebRTC"]
    },
    {
      name: "Real Estate Marketplace",
      description: "Created a platform for property listings with virtual tours and mortgage calculators.",
      technologies: ["React", "Firebase", "Google Maps API", "Three.js"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Professional Resume | Nerochaze Portfolio</title>
        <meta name="description" content="View my professional experience, skills, and qualifications as a software developer." />
        <meta name="keywords" content="resume, CV, software developer, web developer, full-stack, React, Node.js" />
        <link rel="canonical" href="https://nerochaze.replit.app/resume" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <motion.h1
              className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Professional Resume
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Full-stack developer with 7+ years of experience building modern web applications and digital solutions
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 py-3 px-6">
                <FaDownload className="mr-2" />
                Download Resume (PDF)
              </Button>
            </motion.div>
          </div>

          {/* Professional Experience */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <FaBriefcase className="text-2xl text-cyan-400 mr-3" />
              <h2 className="text-3xl font-bold text-white">Professional Experience</h2>
            </div>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="bg-gray-800/40 rounded-lg p-6 border-l-4 border-cyan-400">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <p className="text-cyan-400">{exp.company}</p>
                    </div>
                    <div className="bg-gray-900/60 px-3 py-1 rounded-full text-gray-300 text-sm inline-flex items-center justify-center md:mt-0 mt-2 w-fit">
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{exp.description}</p>
                  
                  <h4 className="text-lg font-semibold text-white mb-2">Key Achievements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Skills */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center mb-6">
              <FaCode className="text-2xl text-cyan-400 mr-3" />
              <h2 className="text-3xl font-bold text-white">Technical Skills</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skillGroup, index) => (
                <div key={index} className="bg-gray-800/40 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, i) => (
                      <span key={i} className="bg-gray-700/50 text-cyan-300 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Education */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <FaGraduationCap className="text-2xl text-cyan-400 mr-3" />
              <h2 className="text-3xl font-bold text-white">Education</h2>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="bg-gray-800/40 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                    <div className="bg-gray-900/60 px-3 py-1 rounded-full text-gray-300 text-sm inline-flex items-center justify-center md:mt-0 mt-2 w-fit">
                      {edu.period}
                    </div>
                  </div>
                  <p className="text-cyan-400 mb-2">{edu.institution}</p>
                  <p className="text-gray-300">{edu.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Projects */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <FaUsers className="text-2xl text-cyan-400 mr-3" />
              <h2 className="text-3xl font-bold text-white">Notable Projects</h2>
            </div>

            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-gray-800/40 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                  <p className="text-gray-300 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="bg-gray-700/50 text-cyan-300 px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Certifications */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="flex items-center mb-6">
              <FaCertificate className="text-2xl text-cyan-400 mr-3" />
              <h2 className="text-3xl font-bold text-white">Certifications</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-gray-800/40 rounded-lg p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{cert.name}</h3>
                    <p className="text-cyan-400">{cert.issuer}</p>
                  </div>
                  <div className="mt-4 bg-gray-900/60 px-3 py-1 rounded-full text-gray-300 text-sm w-fit">
                    {cert.date}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.div 
            className="text-center bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-lg p-8 border border-cyan-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Interested in working together?</h2>
            <p className="text-gray-300 mb-6">I'm currently available for freelance projects and full-time positions.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                onClick={() => window.location.href = "/#contact"}
              >
                Contact Me
              </Button>
              <Button 
                variant="outline" 
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                onClick={() => window.location.href = "/#projects"}
              >
                View My Projects
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Resume;