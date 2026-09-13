import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, Moon, Sun, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenLegal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 border-b ${
      scrolled 
        ? 'border-border/80 bg-[#020b16]/90 backdrop-blur-xl shadow-lg shadow-black/20' 
        : 'border-border/50 bg-[#020b16]/70 backdrop-blur-lg'
    }`}>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
            <Volume2 className="size-4.5 stroke-[2.5]" />
          </div>
          <span className="text-base font-bold tracking-tight text-foreground">
            FameSpeak<span className="text-amber-400">.</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <button onClick={() => scrollToSection('voices')} className="transition-colors hover:text-foreground">
            Voices
          </button>
          <button onClick={() => scrollToSection('playground')} className="transition-colors hover:text-foreground flex items-center gap-1 text-foreground font-semibold">
            <Sparkles className="size-3.5 text-amber-400" />
            Studio
          </button>
          <button onClick={() => scrollToSection('features')} className="transition-colors hover:text-foreground">
            Features
          </button>
          <button onClick={() => scrollToSection('referrals')} className="transition-colors hover:text-foreground">
            Referrals
          </button>
          <button onClick={() => scrollToSection('how')} className="transition-colors hover:text-foreground">
            How it works
          </button>
          <button onClick={() => scrollToSection('pricing')} className="transition-colors hover:text-foreground">
            Pricing
          </button>
          <button onClick={() => onOpenLegal('contact')} className="transition-colors hover:text-foreground">
            Support
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={toggleTheme}
            aria-label="Toggle theme" 
            className="flex size-9 items-center justify-center rounded-md border border-border bg-card/60 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </button>

          <button 
            onClick={() => scrollToSection('playground')}
            className="group/button inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-transparent bg-foreground px-3.5 text-sm font-medium text-background transition-all hover:bg-foreground/90 active:translate-y-px"
          >
            Get started
          </button>

          {/* Mobile Menu Button */}
          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-[#020b16]/98 px-6 py-5 backdrop-blur-xl">
          <nav className="flex flex-col gap-4 text-sm font-medium text-muted-foreground">
            <button onClick={() => scrollToSection('playground')} className="text-left font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="size-4 text-amber-400" />
              Studio Playground
            </button>
            <button onClick={() => scrollToSection('voices')} className="text-left hover:text-foreground">Voices</button>
            <button onClick={() => scrollToSection('features')} className="text-left hover:text-foreground">Features</button>
            <button onClick={() => scrollToSection('referrals')} className="text-left hover:text-foreground">Referrals</button>
            <button onClick={() => scrollToSection('how')} className="text-left hover:text-foreground">How it works</button>
            <button onClick={() => scrollToSection('pricing')} className="text-left hover:text-foreground">Pricing</button>
            <button onClick={() => onOpenLegal('contact')} className="text-left hover:text-foreground">Support</button>
          </nav>
        </div>
      )}
    </header>
  );
}
