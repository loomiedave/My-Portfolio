'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { ArrowDownRightIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When menu opens, prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed w-full flex justify-center z-50 top-2">
      <nav className={`w-10/12 transition-all duration-300 rounded-full border border-gray-600 dark:border-gray-600 ${
        isScrolled 
          ? 'bg-blue-600/80 backdrop-blur-md shadow-lg dark:bg-blue-800/80' 
          : 'bg-blue-500 dark:bg-blue-700'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-4">
          <div className="flex justify-between p-2 items-center">
            <Link href="/" className="text-xs text-white">
              <span className="lg:hidden">Benjamin David</span>
              <span className="hidden lg:inline">Benjamin Olumide David</span>
            </Link>

            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-6 text-sm">
              <Link href="#about" className="text-white hover:text-blue-200 transition-colors">
                About
              </Link>
              <Link href="#projects" className="text-white hover:text-blue-200 transition-colors">
                Projects
              </Link>
              <Link href="#experience" className="text-white hover:text-blue-200 transition-colors">
                Experience
              </Link>
              <Link href="#contact" className="text-white hover:text-blue-200 transition-colors">
                Contact
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              <Link href="#contact" className="hidden lg:flex items-center bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-full text-sm font-semibold transition-colors">
                Hire Me
                <ArrowDownRightIcon className="h-4 w-4 ml-2" />
              </Link>
              
              {/* Mobile menu button */}
              <button
                className="lg:hidden text-white p-2"
                onClick={toggleMenu}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation - Always in DOM but transformed out of view when closed */}
        <div className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
          {/* Overlay to capture clicks outside the menu */}
          <div 
            className="fixed inset-0 bg-black/50 transition-opacity duration-300"
            onClick={toggleMenu}
            aria-hidden="true"
          ></div>
          
          {/* Side menu panel that slides in and out */}
          <div className={`fixed top-0 right-0 h-full w-60 bg-blue-600 dark:bg-blue-800 p-4 shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="flex justify-end mb-4">
              <button 
                onClick={toggleMenu}
                className="text-white p-2 hover:bg-blue-700 dark:hover:bg-blue-900 rounded-full"
                aria-label="Close menu"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="px-2 pt-2 pb-3 space-y-3">
              <Link 
                href="#about"
                className="block px-3 py-2 rounded-lg text-white hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link 
                href="#projects"
                className="block px-3 py-2 rounded-lg text-white hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors"
                onClick={toggleMenu}
              >
                Projects
              </Link>
              <Link 
                href="#experience"
                className="block px-3 py-2 rounded-lg text-white hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors"
                onClick={toggleMenu}
              >
                Experience
              </Link>
              <Link 
                href="#contact"
                className="block px-3 py-2 rounded-lg text-white hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Link 
                href="#contact"
                className="flex items-center justify-center bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-full font-medium transition-colors mt-6"
                onClick={toggleMenu}
              >
                Hire Me
                <ArrowDownRightIcon className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;