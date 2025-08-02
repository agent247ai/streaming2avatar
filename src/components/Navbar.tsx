import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Bot } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent background scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-lg shadow-modern border-b border-secondary-100" 
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between px-6 sm:px-8 lg:px-12">
        {/* Logo */}
        <a 
          href="#" 
          className="flex items-center space-x-3 group" 
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }} 
          aria-label="Streaming2Avatar"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-modern group-hover:shadow-modern-lg transition-all duration-200">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200">
            Streaming2Avatar
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-2">
          <a 
            href="#" 
            className="nav-link px-4 py-2 rounded-xl" 
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            Home
          </a>
          <a href="#features" className="nav-link px-4 py-2 rounded-xl">
            Features
          </a>
          <a href="#details" className="nav-link px-4 py-2 rounded-xl">
            About
          </a>
          <a href="#get-access" className="nav-link px-4 py-2 rounded-xl">
            Contact
          </a>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-3 rounded-xl text-secondary-700 hover:text-primary-600 hover:bg-secondary-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2" 
          onClick={toggleMenu} 
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-white flex flex-col pt-20 px-6 md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <nav className="flex flex-col space-y-4 items-center mt-8">
          <a 
            href="#" 
            className="text-lg font-semibold py-4 px-8 w-full max-w-xs text-center rounded-2xl text-secondary-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200" 
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Home
          </a>
          <a 
            href="#features" 
            className="text-lg font-semibold py-4 px-8 w-full max-w-xs text-center rounded-2xl text-secondary-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Features
          </a>
          <a 
            href="#details" 
            className="text-lg font-semibold py-4 px-8 w-full max-w-xs text-center rounded-2xl text-secondary-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            About
          </a>
          <a 
            href="#get-access" 
            className="text-lg font-semibold py-4 px-8 w-full max-w-xs text-center rounded-2xl text-secondary-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;