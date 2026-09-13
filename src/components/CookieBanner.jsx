import React, { useState, useEffect } from 'react';
import { Cookie, Check } from 'lucide-react';

export default function CookieBanner({ onOpenPrivacy }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('famespeak_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('famespeak_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('famespeak_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50">
      <div className="rounded-2xl border border-border bg-[#020b16]/95 p-5 shadow-2xl backdrop-blur-xl space-y-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl border border-border bg-card text-foreground shrink-0">
            <Cookie className="size-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Cookie &amp; Privacy Notice
            </h4>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              We use cookies to analyze web traffic and deliver personalized experiences. By continuing to use FameSpeak, you agree to our{' '}
              <button
                onClick={onOpenPrivacy}
                className="text-foreground underline hover:text-amber-400 font-medium"
              >
                Privacy Policy
              </button>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleAccept}
            className="flex-1 py-2 rounded-lg bg-foreground text-background font-medium text-xs hover:bg-foreground/90 transition-all flex items-center justify-center gap-1.5 active:translate-y-px"
          >
            <Check className="size-3.5" />
            <span>Accept All</span>
          </button>
          <button
            onClick={handleDecline}
            className="px-4 py-2 rounded-lg border border-border bg-card text-muted-foreground text-xs hover:bg-muted hover:text-foreground transition-colors"
          >
            Necessary Only
          </button>
        </div>
      </div>
    </div>
  );
}
