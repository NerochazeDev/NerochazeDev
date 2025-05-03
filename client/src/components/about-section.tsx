import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

type WebsiteInfo = {
  id: number;
  section: string;
  key: string;
  value: string;
  updatedAt: string;
};

const AboutSection = () => {
  const [aboutContent, setAboutContent] = useState({
    professional_summary: "",
    expertise: "",
    experience: ""
  });
  
  const technologies = [
    "JavaScript (ES6+)",
    "React",
    "Node.js",
    "TypeScript",
    "Next.js",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "Tailwind CSS",
  ];
  
  // Fetch about section data
  const { data: aboutData, isLoading } = useQuery({
    queryKey: ['/api/website-info/about'],
    queryFn: async () => {
      const response = await fetch('/api/website-info/about');
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch about information");
      }
      return data.data as WebsiteInfo[];
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });
  
  // Update about content when data is loaded
  useEffect(() => {
    if (aboutData) {
      const contentMap: Record<string, string> = {};
      
      aboutData.forEach(item => {
        contentMap[item.key] = item.value;
      });
      
      setAboutContent({
        professional_summary: contentMap.professional_summary || "",
        expertise: contentMap.expertise || "",
        experience: contentMap.experience || ""
      });
    }
  }, [aboutData]);

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">About Me</span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded"></div>
          </h2>
        </motion.div>
        
        <div className="flex flex-col md:flex-row md:space-x-12">
          <motion.div 
            className="md:w-2/3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isLoading ? (
              <>
                <Skeleton className="h-24 w-full mb-4 bg-gray-800" />
                <Skeleton className="h-24 w-full mb-4 bg-gray-800" />
                <Skeleton className="h-24 w-full mb-4 bg-gray-800" />
              </>
            ) : (
              <>
                <p className="text-lg mb-6 text-gray-300 leading-relaxed">
                  Hello! I'm <span className="font-semibold text-cyan-400">Nerochaze</span>, {aboutContent.professional_summary || "a passionate full-stack developer with expertise in building modern, scalable web applications."}
                </p>
                {aboutContent.expertise && (
                  <div className="mb-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-2 text-cyan-400">Expertise</h3>
                    <p className="text-gray-300">{aboutContent.expertise}</p>
                  </div>
                )}
                {aboutContent.experience && (
                  <div className="mb-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-2 text-cyan-400">Experience</h3>
                    <p className="text-gray-300">{aboutContent.experience}</p>
                  </div>
                )}
              </>
            )}
            <p className="text-lg mb-6 text-gray-300">
              Here are a few technologies I've been working with recently:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-md">
              {technologies.map((tech, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center bg-gray-800/50 px-3 py-2 rounded-md border border-gray-700 hover:border-cyan-500/50 transition-all"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 12 12" 
                    className="text-cyan-400 mr-2 flex-shrink-0"
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
                  <span className="text-sm text-gray-300">{tech}</span>
                </motion.div>
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
            <div className="relative rounded-lg overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-50 mix-blend-overlay z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
                alt="Modern development workspace"
                className="w-full rounded-lg shadow-2xl shadow-cyan-500/10 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 border border-cyan-500/30 rounded-lg transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-gray-900/80 to-black/80 z-20">
                <span className="text-cyan-400 font-bold text-xl">Tech Expert</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-cyan-400">Why Work With Me?</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <svg className="text-cyan-500 mr-2 mt-1 flex-shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm">Deep technical expertise</span>
                </li>
                <li className="flex items-start">
                  <svg className="text-cyan-500 mr-2 mt-1 flex-shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm">Responsive communication</span>
                </li>
                <li className="flex items-start">
                  <svg className="text-cyan-500 mr-2 mt-1 flex-shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm">Clean, maintainable code</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
