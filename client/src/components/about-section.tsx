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
            {isLoading ? (
              <>
                <Skeleton className="h-24 w-full mb-4" />
                <Skeleton className="h-24 w-full mb-4" />
                <Skeleton className="h-24 w-full mb-4" />
              </>
            ) : (
              <>
                <p className="text-lg mb-4">
                  Hello! I'm <span className="font-semibold text-[#172A45]">Nerochaze</span>, {aboutContent.professional_summary || "a passionate full-stack developer with expertise in building modern, scalable web applications."}
                </p>
                {aboutContent.expertise && (
                  <p className="text-lg mb-4">
                    <span className="font-semibold">Expertise:</span> {aboutContent.expertise}
                  </p>
                )}
                {aboutContent.experience && (
                  <p className="text-lg mb-4">
                    <span className="font-semibold">Experience:</span> {aboutContent.experience}
                  </p>
                )}
              </>
            )}
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
                src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
                alt="Modern development workspace"
                className="w-full rounded-md shadow-lg"
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
