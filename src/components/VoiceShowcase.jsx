import React, { useState, useEffect } from 'react';
import { AudioLines, Play, Pause, ArrowRight } from 'lucide-react';

export default function VoiceShowcase() {
  const [playingVoiceId, setPlayingVoiceId] = useState(null);
  const [progress, setProgress] = useState(0);

  const voices = [
    {
      id: 'apollo',
      name: 'Apollo',
      origin: 'American · Male',
      tag: 'Cinematic',
      quote: '“In a world of endless noise, one voice rises above them all.”',
      pitch: 0.9,
      rate: 0.95,
      isFemale: false
    },
    {
      id: 'abigail',
      name: 'Abigail',
      origin: 'American · Female',
      tag: 'Storyteller',
      quote: '“Once upon a quiet evening, the story finally began to tell itself.”',
      pitch: 1.05,
      rate: 0.9,
      isFemale: true
    },
    {
      id: 'ben',
      name: 'Ben',
      origin: 'American · Male',
      tag: 'Sportscaster',
      quote: '“And there it is - an unbelievable finish in the final seconds!”',
      pitch: 1.1,
      rate: 1.15,
      isFemale: false
    },
    {
      id: 'audrey',
      name: 'Audrey',
      origin: 'American · Female',
      tag: 'Expressive',
      quote: '“I can\'t believe it. After everything, we actually made it here.”',
      pitch: 1.1,
      rate: 1.0,
      isFemale: true
    },
    {
      id: 'aaron',
      name: 'Aaron',
      origin: 'American · Male',
      tag: 'Explainer',
      quote: '“Let\'s break this down step by step so it\'s easy to follow along.”',
      pitch: 1.0,
      rate: 1.0,
      isFemale: false
    },
    {
      id: 'athena',
      name: 'Athena',
      origin: 'American · Female',
      tag: 'Powerful',
      quote: '“We do not wait for the moment. We become the moment.”',
      pitch: 0.95,
      rate: 0.95,
      isFemale: true
    },
    {
      id: 'bruce',
      name: 'Bruce',
      origin: 'American · Male',
      tag: 'Motivational',
      quote: '“Every great journey starts the second you decide not to quit.”',
      pitch: 0.85,
      rate: 1.05,
      isFemale: false
    },
    {
      id: 'annie',
      name: 'Annie',
      origin: 'American · Female',
      tag: 'Conversational',
      quote: '“Hey! So glad you\'re here - let me walk you through how this works.”',
      pitch: 1.15,
      rate: 1.05,
      isFemale: true
    }
  ];

  // Handle Play/Pause
  const togglePlayVoice = (voice) => {
    if (playingVoiceId === voice.id) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setPlayingVoiceId(null);
      setProgress(0);
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanQuote = voice.quote.replace(/[“”]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanQuote);
      
      const voicesList = window.speechSynthesis.getVoices();
      const matchedVoice = voicesList.find(v => {
        const n = v.name.toLowerCase();
        if (voice.isFemale) {
          return n.includes('female') || n.includes('zira') || n.includes('samantha') || n.includes('google us english');
        } else {
          return n.includes('david') || n.includes('mark') || n.includes('male') || n.includes('george');
        }
      }) || voicesList[0];

      if (matchedVoice) utterance.voice = matchedVoice;
      utterance.rate = voice.rate;
      utterance.pitch = voice.pitch;

      setPlayingVoiceId(voice.id);
      setProgress(15);

      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 95) {
            clearInterval(interval);
            return 95;
          }
          return p + 10;
        });
      }, 250);

      utterance.onend = () => {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setPlayingVoiceId(null);
          setProgress(0);
        }, 300);
      };

      utterance.onerror = () => {
        clearInterval(interval);
        setPlayingVoiceId(null);
        setProgress(0);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback simulation
      setPlayingVoiceId(voice.id);
      setProgress(50);
      setTimeout(() => {
        setPlayingVoiceId(null);
        setProgress(0);
      }, 2500);
    }
  };

  const scrollToPlayground = () => {
    const el = document.getElementById('playground');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="voices" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          <AudioLines className="size-3.5" />
          Listen for yourself
        </span>
        <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
          Real voices. Press play.
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground">
          A small taste of the library. Each one is generated by FameSpeak — tap any card to hear how it sounds.
        </p>
      </div>

      {/* Voice Cards Grid */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {voices.map((voice, idx) => {
          const isCurrentPlaying = playingVoiceId === voice.id;

          return (
            <div 
              key={voice.id}
              className="landing-fade-up group relative flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-5 transition-all duration-300 hover:border-foreground/20 hover:bg-muted/30"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              {/* Card Header: Name + Premium Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold tracking-tight text-foreground">
                    {voice.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {voice.origin}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide border-amber-500/30 bg-amber-500/10 text-amber-300">
                  Premium
                </span>
              </div>

              {/* Quote */}
              <p className="line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground">
                {voice.quote}
              </p>

              {/* Bottom Playback Strip */}
              <div className="mt-auto flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => togglePlayVoice(voice)}
                  aria-label={`Play ${voice.name}`}
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full border transition-all active:translate-y-px ${
                    isCurrentPlaying 
                      ? 'border-amber-500/50 bg-amber-400 text-background shadow-md' 
                      : 'border-border bg-background text-foreground hover:bg-muted'
                  }`}
                >
                  {isCurrentPlaying ? (
                    <Pause className="size-4 fill-current" />
                  ) : (
                    <Play className="size-4 translate-x-px fill-current" />
                  )}
                </button>

                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span className="w-16 shrink-0 truncate text-xs font-medium text-muted-foreground">
                    {voice.tag}
                  </span>
                  
                  {/* Progress Bar */}
                  <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-border">
                    <div 
                      className="absolute inset-y-0 left-0 rounded-full bg-foreground transition-[width] duration-150"
                      style={{ width: `${isCurrentPlaying ? progress : 0}%` }}
                    />
                  </div>

                  {/* Equalizer Wavelet Bars */}
                  <div className="shrink-0 text-muted-foreground">
                    <div className="flex h-4 items-end gap-[3px]" aria-hidden="true">
                      {[1, 2, 3, 4, 5, 6, 7].map((bar, bIdx) => (
                        <span
                          key={bIdx}
                          className={`w-[3px] rounded-full transition-[height,opacity] duration-300 ${
                            isCurrentPlaying ? 'bg-amber-400 opacity-100 animate-pulse' : 'bg-current opacity-40'
                          }`}
                          style={{
                            height: isCurrentPlaying ? `${Math.sin((bIdx + 1) * 1.2) * 8 + 10}px` : '6px',
                            animationDelay: `${bIdx * 80}ms`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* 9th "Explore 1,000+ more" card */}
        <button
          onClick={scrollToPlayground}
          className="group flex flex-col justify-between gap-6 rounded-2xl border border-dashed border-border bg-muted/20 p-6 text-left transition-colors hover:border-foreground/30 hover:bg-muted/40"
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-foreground text-background">
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-foreground">
              Explore 1,000+ more
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse the full voice library and find the perfect match.
            </p>
          </div>
        </button>
      </div>
    </section>
  );
}
