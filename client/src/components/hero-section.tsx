import { motion } from "framer-motion";
import { 
  FaGithub, FaLinkedin, FaTwitter, FaCodepen, FaFacebook,
  FaInstagram, FaDribbble, FaBehance, FaMedium, FaYoutube, FaStackOverflow 
} from "react-icons/fa";
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
  const { data: heroData, isLoading: heroLoading } = useQuery({
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
  
  // Fetch social links data
  const { data: socialLinksData, isLoading: socialLinksLoading } = useQuery({
    queryKey: ['/api/social-links'],
    queryFn: async () => {
      const response = await fetch('/api/social-links');
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch social links");
      }
      return data.data;
    }
  });
  
  // Combined loading state
  const isLoading = heroLoading || socialLinksLoading;
  
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
  
  // Map platform names to react icons
  const getIconForPlatform = (platform: string) => {
    const platformLower = platform.toLowerCase();
    console.log(`Getting icon for platform: ${platformLower}`);
    
    switch (platformLower) {
      case 'github':
        return <FaGithub className="text-2xl" />;
      case 'linkedin':
        return <FaLinkedin className="text-2xl" />;
      case 'twitter':
        return <FaTwitter className="text-2xl" />;
      case 'codepen':
        return <FaCodepen className="text-2xl" />;
      case 'facebook':
        return <FaFacebook className="text-2xl" />;
      case 'instagram':
        return <FaInstagram className="text-2xl" />;
      case 'dribbble':
        return <FaDribbble className="text-2xl" />;
      case 'behance':
        return <FaBehance className="text-2xl" />;
      case 'medium':
        return <FaMedium className="text-2xl" />;
      case 'youtube':
        return <FaYoutube className="text-2xl" />;
      case 'stackoverflow':
        return <FaStackOverflow className="text-2xl" />;
      default:
        console.warn(`No icon found for platform: ${platformLower}, using default icon`);
        return <FaGithub className="text-2xl" />;
    }
  };
  
  // Default social links in case API fails or returns empty array
  const defaultSocialLinks = [
    { icon: <FaGithub className="text-2xl" />, href: "https://github.com", label: "GitHub" },
    { icon: <FaLinkedin className="text-2xl" />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FaTwitter className="text-2xl" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <FaCodepen className="text-2xl" />, href: "https://codepen.io", label: "CodePen" },
  ];
  
  // Transform API data into the format we need, or use defaults if no data
  const socialLinks = socialLinksData && socialLinksData.length > 0
    ? socialLinksData
        .filter((link: any) => link.isActive === "true") // Only active links
        .map((link: any) => ({
          icon: getIconForPlatform(link.platform),
          href: link.url,
          label: link.platform.charAt(0).toUpperCase() + link.platform.slice(1) // Capitalize platform name
        }))
    : defaultSocialLinks;
  
  return (
    <section id="home" className="min-h-screen flex items-center py-20 bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjMTkxZDI2IiBmaWxsLW9wYWNpdHk9Ii41Ij48cGF0aCBkPSJNMCAwaDJ2Mkgwek0wIDh2MmgyVjh6TTggMGgydjJIOHpNOCA4djJoMlY4ek00IDRoMnYySDR6TTQgMTJoMnYySDR6TTEyIDRoMnYyaC0yek0xMiAxMmgydjJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-cyan-500/5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center">
          <motion.div 
            className="md:w-3/5 mt-10 md:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p 
              className="text-cyan-400 font-mono mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Hello, my name is
            </motion.p>
            
            {isLoading ? (
              <>
                <Skeleton className="h-16 w-3/4 mb-2 bg-gray-800" />
                <Skeleton className="h-12 w-full mb-6 bg-gray-800" />
                <Skeleton className="h-24 w-full mb-8 bg-gray-800" />
              </>
            ) : (
              <>
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {heroContent.title}
                </motion.h1>
                <motion.h2 
                  className="text-3xl md:text-5xl font-bold text-gray-300 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {heroContent.subtitle}
                </motion.h2>
                <motion.p 
                  className="text-lg text-gray-400 max-w-xl mb-8"
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
                className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-6 py-3 rounded-md font-medium transition-colors"
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-6 py-3 rounded-md font-medium transition-colors"
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
                  className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:-translate-y-1 duration-200"
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
            <div className="w-full h-64 md:h-80 relative overflow-hidden rounded-lg shadow-2xl shadow-cyan-500/10 border border-gray-800">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/80 to-gray-900/90 opacity-80"></div>
              <img 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" 
                alt="Professional Development Environment"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-gray-900 to-transparent">
                <div className="text-cyan-400 font-medium">Bringing ideas to life through elegant code</div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-30 mix-blend-overlay"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
