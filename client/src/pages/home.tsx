import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import BlogSection from "@/components/blog-section";
import ContactSection from "@/components/contact-section";
import { useEffect } from "react";

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

  return (
    <>
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
