import React from 'react';
import { WandSparkles, Mic, AudioLines } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: 1,
      icon: WandSparkles,
      title: 'Write your script',
      description: 'Type or paste your text into the editor. Break it into lines, scenes, or a full narration.'
    },
    {
      num: 2,
      icon: Mic,
      title: 'Pick your voice',
      description: 'Browse free and premium voices, preview them instantly, and tune the delivery to taste.'
    },
    {
      num: 3,
      icon: AudioLines,
      title: 'Generate & download',
      description: 'Hit generate, listen back, and export broadcast-ready audio in seconds.'
    }
  ];

  return (
    <section id="how" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
          From script to sound in three steps
        </h2>
      </div>

      {/* Steps Grid */}
      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.num} className="relative rounded-2xl border border-border/70 bg-card/40 p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full border border-border bg-[#020b16] text-sm font-bold text-foreground">
                  {step.num}
                </span>
                <div className="h-px flex-1 bg-border"></div>
                <Icon className="size-5 text-muted-foreground" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
