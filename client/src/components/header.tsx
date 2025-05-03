import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className={`sticky top-0 bg-white z-10 ${isScrolled ? "shadow-sm" : ""}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-[#172A45] flex items-center">
          <span className="text-[#64FFDA] mr-1">&lt;</span>
          <span>Nerochaze</span>
          <span className="text-[#64FFDA]">/&gt;</span>
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-[#333333] focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              className="nav-item"
              onClick={() => {
                if (location !== "/") {
                  window.location.href = "/" + link.href;
                }
              }}
            >
              {link.label}
            </a>
          ))}
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#172A45] hover:bg-[#203a61] text-white px-4 py-2 rounded transition-colors"
          >
            Resume
          </a>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <nav 
        className={`${isMenuOpen ? "block" : "hidden"} bg-white px-4 py-4 md:hidden`}
      >
        <div className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              className="font-medium text-[#333333] hover:text-[#172A45]"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#172A45] hover:bg-[#203a61] text-white px-4 py-2 rounded text-center transition-colors"
            onClick={closeMenu}
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
