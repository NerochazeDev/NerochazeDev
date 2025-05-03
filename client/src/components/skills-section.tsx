import { motion } from "framer-motion";

const SkillsSection = () => {
  const technicalSkills = [
    { name: "JavaScript", percentage: 95 },
    { name: "React", percentage: 90 },
    { name: "TypeScript", percentage: 88 },
    { name: "Node.js", percentage: 85 },
    { name: "Next.js", percentage: 82 },
    { name: "Tailwind CSS", percentage: 80 },
  ];

  const expertiseAreas = [
    "Full-Stack Development",
    "Modern Frontend Frameworks",
    "Responsive Design",
    "Server-Side Rendering",
    "REST & GraphQL APIs",
    "Database Design & ORM",
    "Cloud Deployment",
    "Performance Optimization",
    "CI/CD Workflows",
    "Authentication & Security",
    "State Management",
    "Microservices Architecture",
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold mb-6 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#64FFDA] font-mono mr-2">02.</span>
          Skills & Expertise
          <span className="ml-4 h-px bg-gray-300 flex-grow"></span>
        </motion.h2>
        
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold mb-6">Technical Skills</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technicalSkills.map((skill, index) => (
              <motion.div 
                key={index} 
                className="mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <span>{skill.percentage}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-bar-fill"
                    data-width={skill.percentage}
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold mb-6">Areas of Expertise</h3>
          
          <div className="flex flex-wrap gap-3">
            {expertiseAreas.map((area, index) => (
              <motion.span 
                key={index} 
                className="skill-tag"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
              >
                {area}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
