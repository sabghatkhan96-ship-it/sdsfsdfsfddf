import React from 'react';
import { Volume2 } from 'lucide-react';

export default function Footer({ onOpenLegal }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border bg-[#020b16]/80 backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        
        {/* Top bar: Brand + Nav */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-foreground text-background font-bold text-sm">
              <Volume2 className="size-4 stroke-[2.5]" />
            </div>
            <span className="text-base font-bold tracking-tight text-foreground">
              FameSpeak<span className="text-amber-400">.</span>
            </span>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <button onClick={() => scrollToSection('voices')} className="transition-colors hover:text-foreground">
              Voices
            </button>
            <button onClick={() => scrollToSection('features')} className="transition-colors hover:text-foreground">
              Features
            </button>
            <button onClick={() => scrollToSection('pricing')} className="transition-colors hover:text-foreground">
              Pricing
            </button>
            <button onClick={() => scrollToSection('referrals')} className="transition-colors hover:text-foreground">
              Referrals
            </button>
            <button onClick={() => onOpenLegal('contact')} className="transition-colors hover:text-foreground">
              Contact &amp; support
            </button>
            <button onClick={() => onOpenLegal('terms')} className="transition-colors hover:text-foreground">
              Terms
            </button>
            <button onClick={() => onOpenLegal('privacy')} className="transition-colors hover:text-foreground">
              Privacy
            </button>
            <button onClick={() => onOpenLegal('disclaimer')} className="transition-colors hover:text-foreground">
              AI Disclaimer
            </button>
          </nav>
        </div>

        {/* Bottom copyright and legal notices (Vital for AdSense approval) */}
        <div className="mt-8 space-y-1 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          <p>
            Support:{' '}
            <button 
              onClick={() => onOpenLegal('contact')} 
              className="font-medium text-foreground hover:underline"
            >
              support@famespeak.online
            </button>{' '}
            — we reply within 24 hours.
          </p>
          <p>
            FameSpeak Studio is an AI-powered text-to-speech platform built for creators, educators, and businesses worldwide.
          </p>
          <p className="pt-2 text-[11px] text-muted-foreground/70">
            © 2026 FameSpeak Studio. All rights reserved. Google AdSense™ is a trademark of Google LLC.
          </p>
        </div>

      </div>
    </footer>
  );
}
