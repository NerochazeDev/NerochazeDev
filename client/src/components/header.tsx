import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#skills", label: "Skills" },
    { href: "/#projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/#contact", label: "Contact" },
  ];

  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (location !== "/" && href.startsWith("/#")) {
      window.location.href = href;
    } else if (href.includes("#")) {
      const id = href.split("#")[1];
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
    
    if (isMenuOpen) closeMenu();
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white flex items-center group">
          <span className="text-cyan-400 mr-1">&lt;</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Nerochaze</span>
          <span className="text-cyan-400">/&gt;</span>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-300 hover:text-cyan-400" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link, index) => {
            const isActive = 
              link.href === location || 
              (location === "/" && link.href.startsWith("/#"));
            
            return link.href.includes("#") ? (
              <a
                key={link.href}
                href={link.href}
                className={`${isActive ? "text-cyan-400" : "text-gray-300"} hover:text-cyan-400 text-sm relative group`}
                onClick={(e) => handleHashLink(e, link.href)}
              >
                <span className="text-cyan-400 font-mono mr-1 text-xs opacity-70">
                  {(index + 1).toString().padStart(2, "0")}.
                </span>
                {link.label}
                <span className={`absolute left-0 bottom-0 h-[2px] ${isActive ? "w-full" : "w-0"} bg-cyan-400 transition-all duration-300 group-hover:w-full`}></span>
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`${isActive ? "text-cyan-400" : "text-gray-300"} hover:text-cyan-400 text-sm relative group`}
              >
                <span className="text-cyan-400 font-mono mr-1 text-xs opacity-70">
                  {(index + 1).toString().padStart(2, "0")}.
                </span>
                {link.label}
                <span className={`absolute left-0 bottom-0 h-[2px] ${isActive ? "w-full" : "w-0"} bg-cyan-400 transition-all duration-300 group-hover:w-full`}></span>
              </Link>
            );
          })}
          
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-4 py-2 rounded-md text-sm"
          >
            Resume
          </a>
        </nav>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={closeMenu}
        ></div>
      )}

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-[72px] right-0 bottom-0 w-[70vw] bg-gray-900/95 backdrop-blur-sm shadow-xl transition-all duration-300 ease-in-out md:hidden z-40 ${
          isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <nav className="h-full flex flex-col p-6">
          <div className="flex flex-col space-y-6 mt-4">
            {navLinks.map((link, index) => {
              const isActive = 
                link.href === location || 
                (location === "/" && link.href.startsWith("/#"));
              
              return link.href.includes("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  className={`${isActive ? "text-cyan-400" : "text-gray-300"} hover:text-cyan-400 text-lg font-medium flex items-center`}
                  onClick={(e) => handleHashLink(e, link.href)}
                >
                  <span className="text-cyan-400 font-mono mr-2 text-sm opacity-80">
                    {(index + 1).toString().padStart(2, "0")}.
                  </span>
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${isActive ? "text-cyan-400" : "text-gray-300"} hover:text-cyan-400 text-lg font-medium flex items-center`}
                  onClick={closeMenu}
                >
                  <span className="text-cyan-400 font-mono mr-2 text-sm opacity-80">
                    {(index + 1).toString().padStart(2, "0")}.
                  </span>
                  {link.label}
                </Link>
              );
            })}
            
            <div className="pt-6 mt-4 border-t border-gray-800">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gray-800 hover:bg-gray-700 border border-cyan-500/30 text-cyan-400 px-5 py-3 rounded-md text-center w-full"
                onClick={closeMenu}
              >
                Download Resume
              </a>
            </div>
          </div>
          
          <div className="mt-auto pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Nerochaze</p>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;