import React, { useState } from 'react';
import { Zap, Sparkles, Globe, Download, ShieldCheck, Cpu, Volume2, ArrowUpRight } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    color: 'from-cyan-400 to-blue-500',
    borderColor: 'hover:border-neon-cyan/50',
    glowColor: 'group-hover:shadow-cyan-500/20',
    title: 'Zero-Gravity Latency',
    tag: '< 15ms Response',
    description: 'Instant vocal generation right in the browser. Say goodbye to loading spinners and server queue bottlenecks.'
  },
  {
    icon: Sparkles,
    color: 'from-purple-400 to-pink-500',
    borderColor: 'hover:border-neon-purple/50',
    glowColor: 'group-hover:shadow-purple-500/20',
    title: 'Quantum Emotion Modulation',
    tag: '5 Dynamic Modes',
    description: 'Switch between Cinematic Deep, Storyteller, Hyper-YouTuber, and Calm ASMR with a single click.'
  },
  {
    icon: Globe,
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'hover:border-emerald-400/50',
    glowColor: 'group-hover:shadow-emerald-500/20',
    title: '75+ Global Languages',
    tag: 'Accents & Dialects',
    description: 'From English (US, UK, AUS) to Urdu, Hindi, Spanish, French, German, and Arabic. Reach international audiences seamlessly.'
  },
  {
    icon: Download,
    color: 'from-amber-400 to-orange-500',
    borderColor: 'hover:border-amber-400/50',
    glowColor: 'group-hover:shadow-amber-500/20',
    title: 'Studio-Grade WAV Export',
    tag: '48kHz Lossless',
    description: 'Export raw, crystal-clear audio files directly to your device for instant editing in Premiere Pro, CapCut, or DaVinci Resolve.'
  },
  {
    icon: ShieldCheck,
    color: 'from-sky-400 to-indigo-500',
    borderColor: 'hover:border-sky-400/50',
    glowColor: 'group-hover:shadow-sky-500/20',
    title: '100% Commercial Rights',
    tag: 'Monetize Freely',
    description: 'Use generated speech on monetized YouTube channels, client video commercials, podcasts, and digital products without copyright strikes.'
  },
  {
    icon: Cpu,
    color: 'from-rose-400 to-red-500',
    borderColor: 'hover:border-rose-400/50',
    glowColor: 'group-hover:shadow-rose-500/20',
    title: 'Neural Synthesizer Core',
    tag: 'Next-Gen DSP',
    description: 'Harmonic pitch shifts and formant tuning algorithms that keep voices natural and human, eliminating robotic stutter.'
  }
];

export default function FeatureCards() {
  const [mousePos, setMousePos] = useState({});

  const handleMouseMove = (e, index) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos(prev => ({ ...prev, [index]: { x, y } }));
  };

  return (
    <section id="features" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineered for Creators</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
            Floating Beyond the <br />
            <span className="text-gradient-cyan-purple">Sound Barrier</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every feature in VoxGravity is designed to make voiceover generation effortless, cinematic, and weightless.
          </p>
        </div>

        {/* 3D Floating Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            const pos = mousePos[idx] || { x: 0, y: 0 };

            return (
              <div
                key={idx}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                className={`group relative rounded-3xl glass-card p-8 border border-white/5 ${feat.borderColor} hover:scale-[1.02] shadow-xl ${feat.glowColor} transition-all duration-300 overflow-hidden animate-float-slow`}
                style={{ animationDelay: `${idx * 200}ms` }}
              >
                {/* Mouse spotlight tracking inside card */}
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(0, 245, 255, 0.1), transparent 40%)`
                  }}
                />

                {/* Top card header */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${feat.color} p-0.5 shadow-lg`}>
                    <div className="w-full h-full bg-space-950 rounded-[14px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {feat.tag}
                  </span>
                </div>

                {/* Card Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors font-['Space_Grotesk'] flex items-center gap-1.5">
                    {feat.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-neon-cyan" />
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Bottom interactive wave accent */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1">
                  {[...Array(12)].map((_, i) => (
                    <span
                      key={i}
                      className="w-1 h-2 rounded-full bg-white/10 group-hover:bg-neon-cyan/50 transition-colors"
                      style={{ height: `${(i % 4 + 1) * 4}px` }}
                    />
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
