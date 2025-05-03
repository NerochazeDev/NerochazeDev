import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

const SkillsSection = () => {
  // Fetch skills from API
  const { data: skills } = useQuery({
    queryKey: ['/api/skills'],
    queryFn: async () => {
      const response = await fetch('/api/skills');
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch skills");
      }
      return data.data;
    }
  });

  // Group skills by category
  const skillsByCategory = skills ? skills.reduce((acc: any, skill: any) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {}) : {};

  const expertiseAreas = Object.keys(skillsByCategory);

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Skills & Expertise</span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded"></div>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {Object.entries(skillsByCategory).map(([category, categorySkills]: [string, any]) => (
            <motion.div 
              key={category}
              className="tech-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="tech-heading mb-8 capitalize">{category}</h3>

              <div className="space-y-6">
                {categorySkills.map((skill: any, index: number) => (
                  <motion.div 
                    key={skill.id} 
                    className="mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-white">{skill.name}</span>
                      <span className="text-cyan-400 font-mono">{skill.percentage}%</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div 
                        className="progress-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + 0.1 * index, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 p-6 bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 text-white">Let's Build Something Amazing Together</h3>
            <p className="text-gray-400 mb-6 max-w-3xl mx-auto">
              With my diverse skill set and passion for clean, efficient code, I can help bring your digital vision to life.
              From concept to deployment, I'm committed to creating high-quality solutions that exceed expectations.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-md shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
            >
              Start a Project
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;