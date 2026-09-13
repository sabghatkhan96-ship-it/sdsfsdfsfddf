import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

export default function CtaSection() {
  const scrollToPlayground = () => {
    const el = document.getElementById('playground');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-foreground px-6 py-16 text-center text-background sm:px-12 sm:py-20 shadow-2xl">
        
        {/* Background Soundwave Overlay */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
          <div className="flex h-full w-full items-center justify-center gap-1.5">
            {[45, 80, 90, 60, 30, 22, 50, 78, 89, 70, 35, 20, 40, 75, 90, 78, 45, 22, 30, 65, 88, 85, 55, 25, 24, 52, 82, 89, 65, 32, 20, 42, 75, 90, 74, 40, 20, 33, 66, 89, 82, 50, 23, 26, 56, 85, 87, 60, 28, 22, 46, 79, 90, 69, 36, 20, 37, 71, 90, 78].map((h, i) => (
              <span
                key={i}
                className="landing-wave-bar w-1 rounded-full bg-background"
                style={{
                  height: `${h}%`,
                  animationDelay: `${i * 40}ms`
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full bg-background/10 px-3.5 py-1 text-xs font-semibold">
            <Star className="size-3.5 fill-current" />
            Loved by creators
          </div>

          <h2 className="mx-auto mt-6 max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Ready to give your words a famous voice?
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-pretty text-background/70 text-base leading-relaxed">
            Start with free voices today. Upgrade when you’re ready for the premium emotion engine.
          </p>

          <button
            type="button"
            onClick={scrollToPlayground}
            className="group/button mt-9 inline-flex h-12 w-44 items-center justify-center gap-2 rounded-md bg-background text-base font-semibold text-foreground hover:bg-background/90 transition-all active:translate-y-px shadow-lg"
          >
            Get started
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
