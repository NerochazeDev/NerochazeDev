import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaCodepen } from "react-icons/fa";
import { Button } from "@/components/ui/button";
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

const HeroSection = () => {
  const [heroContent, setHeroContent] = useState({
    title: "",
    subtitle: "",
    introduction: ""
  });
  
  // Fetch hero section data
  const { data: heroData, isLoading } = useQuery({
    queryKey: ['/api/website-info/hero'],
    queryFn: async () => {
      const response = await fetch('/api/website-info/hero');
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch hero information");
      }
      return data.data as WebsiteInfo[];
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });
  
  // Update hero content when data is loaded
  useEffect(() => {
    if (heroData) {
      const contentMap: Record<string, string> = {};
      
      heroData.forEach(item => {
        contentMap[item.key] = item.value;
      });
      
      setHeroContent({
        title: contentMap.title || "Nerochaze",
        subtitle: contentMap.subtitle || "Full-Stack Developer & Digital Innovator",
        introduction: contentMap.introduction || "I'm an experienced full-stack developer specializing in creating exceptional digital experiences with modern technologies."
      });
    }
  }, [heroData]);
  
  const socialLinks = [
    { icon: <FaGithub className="text-2xl" />, href: "https://github.com/nerochaze", label: "GitHub" },
    { icon: <FaLinkedin className="text-2xl" />, href: "https://linkedin.com/in/nerochaze", label: "LinkedIn" },
    { icon: <FaTwitter className="text-2xl" />, href: "https://twitter.com/nerochaze", label: "Twitter" },
    { icon: <FaCodepen className="text-2xl" />, href: "https://codepen.io/nerochaze", label: "CodePen" },
  ];
  
  return (
    <section id="home" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center">
          <motion.div 
            className="md:w-3/5 mt-10 md:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p 
              className="text-[#64FFDA] font-medium mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Hello, my name is
            </motion.p>
            
            {isLoading ? (
              <>
                <Skeleton className="h-16 w-3/4 mb-2" />
                <Skeleton className="h-12 w-full mb-6" />
                <Skeleton className="h-24 w-full mb-8" />
              </>
            ) : (
              <>
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-[#64FFDA] to-[#172A45] text-transparent bg-clip-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {heroContent.title}
                </motion.h1>
                <motion.h2 
                  className="text-3xl md:text-5xl font-bold text-[#6c757d] mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {heroContent.subtitle}
                </motion.h2>
                <motion.p 
                  className="text-lg text-[#6c757d] max-w-xl mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {heroContent.introduction}
                </motion.p>
              </>
            )}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <a 
                href="#projects" 
                className="bg-[#172A45] hover:bg-[#203a61] text-white px-6 py-3 rounded font-medium transition-colors"
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="border-2 border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#172A45] px-6 py-3 rounded font-medium transition-colors"
              >
                Contact Me
              </a>
            </motion.div>
            <motion.div 
              className="flex mt-10 space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-[#6c757d] hover:text-[#172A45] transition-colors"
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>
          <motion.div 
            className="md:w-2/5 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full h-64 md:h-80 relative overflow-hidden rounded-lg shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[#172A45] to-[#0A192F] opacity-80"></div>
              <img 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" 
                alt="Professional Development Environment"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0A192F] to-transparent">
                <div className="text-white font-medium">Bringing ideas to life through elegant code</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
