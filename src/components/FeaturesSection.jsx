import React from 'react';
import { Mic, Globe, SlidersVertical, Gauge, Sparkles, AudioLines } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Mic,
      title: 'Studio-grade voices',
      description: 'Over a thousand natural, expressive voices — from cinematic narrators to friendly explainers — ready in a click.'
    },
    {
      icon: Globe,
      title: 'Speak every language',
      description: 'Generate audio in 75 languages and 110 regional accents without ever leaving the editor.'
    },
    {
      icon: SlidersVertical,
      title: 'Fine-tuned control',
      description: 'Dial in pitch, pace, and emotion so each line lands exactly the way you hear it in your head.'
    },
    {
      icon: Gauge,
      title: 'Built for speed',
      description: 'Paste a script and get clean, usable audio in seconds — no rendering queues, no waiting around.'
    },
    {
      icon: Sparkles,
      title: 'Premium emotion engine',
      description: 'Unlock our premium tier for ultra-realistic delivery with nuanced, human emotional range.'
    },
    {
      icon: AudioLines,
      title: 'Export ready',
      description: 'Download crisp MP3 and WAV audio that drops straight into your videos, reels, podcasts, and ads.'
    }
  ];

  return (
    <section id="features" className="scroll-mt-20 border-y border-border bg-muted/20">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
            Everything you need to sound professional
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            A focused toolkit built for creators who care about how their content sounds.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group rounded-2xl border border-border bg-card/70 p-6 transition-all duration-200 hover:border-foreground/20 hover:shadow-lg hover:shadow-black/20"
              >
                <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-[#020b16] transition-colors group-hover:bg-foreground group-hover:text-background">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
