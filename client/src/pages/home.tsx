import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import BlogSection from "@/components/blog-section";
import ContactSection from "@/components/contact-section";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const Home = () => {
  useEffect(() => {
    // Add intersection observer for progress bars animation
    const progressBars = document.querySelectorAll(".progress-bar-fill");
    
    const animateProgressBars = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute("data-width");
          if (width) {
            entry.target.setAttribute("style", `width: ${width}%`);
          }
        }
      });
    };
    
    const observer = new IntersectionObserver(animateProgressBars, {
      root: null,
      threshold: 0.1
    });
    
    progressBars.forEach(bar => {
      observer.observe(bar);
    });
    
    return () => observer.disconnect();
  }, []);

  // Create person structured data
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nerochaze",
    "url": "https://nerochaze.replit.app/",
    "jobTitle": "Full Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Nerochaze Tech"
    },
    "description": "A professional full-stack developer specializing in web development, blockchain technology, and AI solutions.",
    "sameAs": [
      "https://github.com/nerochaze",
      "https://linkedin.com/in/nerochaze",
      "https://twitter.com/nerochaze"
    ]
  };

  // Create website structured data
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nerochaze - Full Stack Developer Portfolio",
    "url": "https://nerochaze.replit.app/",
    "description": "Professional portfolio showcasing projects, skills and services of Nerochaze, a full-stack developer specializing in web development.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://nerochaze.replit.app/blog?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Helmet>
        <title>Nerochaze | Professional Full-Stack Developer Portfolio</title>
        <meta name="description" content="Portfolio of Nerochaze, a professional full-stack developer specializing in web development, blockchain technology, and AI-powered solutions." />
        <meta name="keywords" content="Nerochaze, web developer, full stack developer, blockchain developer, portfolio, web development, software engineer, react developer, javascript developer, typescript, node.js" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://nerochaze.replit.app/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nerochaze | Professional Full-Stack Developer Portfolio" />
        <meta property="og:description" content="Portfolio of Nerochaze, a professional full-stack developer specializing in web development, blockchain technology, and AI-powered solutions." />
        <meta property="og:url" content="https://nerochaze.replit.app/" />
        <meta property="og:site_name" content="Nerochaze Portfolio" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nerochaze | Professional Full-Stack Developer Portfolio" />
        <meta name="twitter:description" content="Portfolio of Nerochaze, a professional full-stack developer specializing in web development, blockchain technology, and AI-powered solutions." />
        <meta name="twitter:creator" content="@Nerochaze" />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(personStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteStructuredData)}
        </script>
      </Helmet>
      
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />
    </>
  );
};

export default Home;
