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
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#skills", label: "Skills" },
    { href: "/#projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-gray-900/95 backdrop-blur-sm shadow-lg shadow-black/10" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white flex items-center group">
          <span className="text-cyan-400 mr-1 group-hover:text-cyan-300 transition-colors">&lt;</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:from-cyan-300 group-hover:to-blue-400 transition-all">Nerochaze</span>
          <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">/&gt;</span>
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-300 hover:text-cyan-400 focus:outline-none transition-colors" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            link.href.includes('#') ? (
              <a 
                key={link.href} 
                href={link.href} 
                className="relative text-gray-300 hover:text-cyan-400 px-1 py-2 text-sm font-medium transition-colors group"
              >
                <span className="text-cyan-400 font-mono mr-1 text-xs opacity-70">{(index + 1).toString().padStart(2, '0')}.</span>
                {link.label}
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ) : (
              <Link 
                key={link.href} 
                href={link.href}
                className={`relative ${location === link.href ? 'text-cyan-400' : 'text-gray-300'} hover:text-cyan-400 px-1 py-2 text-sm font-medium transition-colors group`}
              >
                <span className="text-cyan-400 font-mono mr-1 text-xs opacity-70">{(index + 1).toString().padStart(2, '0')}.</span>
                {link.label}
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          ))}
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative overflow-hidden border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-5 py-2 rounded-md text-sm font-medium transition-all group ml-2"
          >
            <span className="relative z-10">Resume</span>
            <span className="absolute inset-0 bg-cyan-400 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-10"></span>
          </a>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={`${
          isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        } fixed top-[72px] right-0 bottom-0 w-[70vw] bg-gray-900/95 backdrop-blur-sm shadow-xl transition-all duration-300 ease-in-out md:hidden z-40`}
      >
        <nav className="h-full flex flex-col p-6">
          <div className="flex flex-col space-y-6 mt-4">
            {navLinks.map((link, index) => (
              link.href.includes('#') ? (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className="text-gray-300 hover:text-cyan-400 text-lg font-medium transition-colors transform hover:translate-x-2 duration-300 flex items-center"
                  onClick={closeMenu}
                >
                  <span className="text-cyan-400 font-mono mr-2 text-sm opacity-80">{(index + 1).toString().padStart(2, '0')}.</span>
                  {link.label}
                </a>
              ) : (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`${location === link.href ? 'text-cyan-400' : 'text-gray-300'} hover:text-cyan-400 text-lg font-medium transition-colors transform hover:translate-x-2 duration-300 flex items-center`}
                  onClick={closeMenu}
                >
                  <span className="text-cyan-400 font-mono mr-2 text-sm opacity-80">{(index + 1).toString().padStart(2, '0')}.</span>
                  {link.label}
                </Link>
              )
            ))}
            <div className="pt-6 mt-6 border-t border-gray-800">
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-gray-800 hover:bg-gray-700 border border-cyan-500/30 text-cyan-400 px-5 py-3 rounded-md text-center transition-all"
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
      
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 md:hidden"
          onClick={closeMenu}
        ></div>
      )}
    </header>
  );
};

export default Header;
