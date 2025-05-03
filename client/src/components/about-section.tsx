import { motion } from "framer-motion";

const AboutSection = () => {
  const technologies = [
    "JavaScript (ES6+)",
    "React",
    "Node.js",
    "TypeScript",
    "GraphQL",
    "Tailwind CSS",
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold mb-6 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#64FFDA] font-mono mr-2">01.</span>
          About Me
          <span className="ml-4 h-px bg-gray-300 flex-grow"></span>
        </motion.h2>
        
        <div className="flex flex-col md:flex-row md:space-x-10">
          <motion.div 
            className="md:w-2/3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg mb-4">
              Hello! I'm Jane, a passionate web developer with a strong background in building 
              responsive and performant web applications. My journey in programming started 
              5 years ago when I was studying Computer Science at 
              University of Technology.
            </p>
            <p className="text-lg mb-4">
              I enjoy creating things that live on the internet, whether that be websites, applications, or anything in between. 
              My goal is to always build products that provide pixel-perfect, performance experiences.
            </p>
            <p className="text-lg mb-6">
              Here are a few technologies I've been working with recently:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-md">
              {technologies.map((tech, index) => (
                <div key={index} className="flex items-center">
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    className="text-[#64FFDA] mr-2"
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M4 8L7 5L4 2" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/3 mt-10 md:mt-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative rounded-md overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
                alt="Developer working on code"
                className="w-full rounded-md"
              />
              <div className="absolute inset-0 border-4 border-[#64FFDA] rounded-md transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
