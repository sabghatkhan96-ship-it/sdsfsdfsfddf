import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Google AdSense Compliant Slot Component
 * Displays responsive AdSense units with required "Advertisement" labels.
 */
export default function AdSlot({ 
  format = 'horizontal', // 'horizontal' (728x90), 'rectangle' (300x250), 'banner' (full-width responsive)
  className = '',
  adClient = '', 
  adSlot = '',   
  label = "Advertisement"
}) {
  const isLive = Boolean(adClient && adSlot);

  const formatStyles = {
    horizontal: 'min-h-[90px] max-w-4xl',
    rectangle: 'min-h-[250px] max-w-[320px]',
    banner: 'min-h-[100px] w-full max-w-5xl',
  };

  return (
    <div className={`mx-auto w-full my-10 ${formatStyles[format] || ''} ${className}`}>
      {/* Required AdSense label */}
      <div className="flex items-center justify-between px-3 py-1 text-[10px] uppercase font-mono tracking-widest text-muted-foreground">
        <span>{label}</span>
        <span className="text-[9px] text-muted-foreground/60">AdSense Partner Unit</span>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-md flex items-center justify-center text-center shadow-sm">
        {isLive ? (
          <ins
            className="adsbygoogle block w-full"
            style={{ display: 'block' }}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <div className="py-4 px-4 flex flex-col items-center justify-center gap-2 z-10">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
              <Sparkles className="size-3" />
              <span>Google AdSense Responsive Unit</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-md leading-relaxed">
              Place your Google AdSense publisher ID inside <code className="text-foreground font-mono text-[11px] bg-muted px-1.5 py-0.5 rounded">AdSlot.jsx</code> to serve real advertisements and monetize your audience.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
