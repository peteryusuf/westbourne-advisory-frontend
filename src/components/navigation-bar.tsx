"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <span className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 font-heading">
                WESTBOURNE ADVISORY
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-100 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300"
            >
              Speak to Our Team
            </Button>
            <Link href="/start-journey">
              <Button 
                className="bg-gray-900 hover:bg-black text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Start Your Journey
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-white/20 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200 space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300"
              >
                Speak to Our Team
              </Button>
              <Link href="/start-journey">
                <Button 
                  className="w-full bg-gray-900 hover:bg-black text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                >
                  Start Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 