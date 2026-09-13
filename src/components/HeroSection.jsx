import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, ArrowRight, Volume2, Mic, Globe, SlidersVertical, 
  Play, Pause, Download, RefreshCw, CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HeroSection({ onOpenLegal }) {
  // TTS State
  const [text, setText] = useState("In a world where every word matters, your voice commands the stage.");
  const [selectedVoice, setSelectedVoice] = useState('apollo');
  const [selectedEmotion, setSelectedEmotion] = useState('Cinematic');
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Audio bars random heights
  const waveHeights = [
    60, 99, 50, 23, 80, 92, 32, 35, 94, 76, 
    22, 54, 100, 56, 21, 74, 95, 37, 31, 91, 
    81, 24, 48, 99, 62, 20, 69, 98, 42, 27, 
    87, 86, 26, 43, 98, 68, 20, 63, 99, 47, 
    24, 82, 90, 30, 37, 96, 73, 21
  ];

  // Voices catalogue
  const voiceProfiles = [
    { id: 'apollo', name: 'Apollo', gender: 'American · Male', emotion: 'Cinematic', pitch: 0.9, rate: 0.95 },
    { id: 'abigail', name: 'Abigail', gender: 'American · Female', emotion: 'Storyteller', pitch: 1.05, rate: 0.9 },
    { id: 'ben', name: 'Ben', gender: 'American · Male', emotion: 'Sportscaster', pitch: 1.1, rate: 1.15 },
    { id: 'audrey', name: 'Audrey', gender: 'American · Female', emotion: 'Expressive', pitch: 1.1, rate: 1.0 },
    { id: 'athena', name: 'Athena', gender: 'American · Female', emotion: 'Powerful', pitch: 0.95, rate: 0.95 },
    { id: 'bruce', name: 'Bruce', gender: 'American · Male', emotion: 'Motivational', pitch: 0.85, rate: 1.05 },
    { id: 'annie', name: 'Annie', gender: 'American · Female', emotion: 'Conversational', pitch: 1.15, rate: 1.05 }
  ];

  // Load browser speech synthesis voices
  useEffect(() => {
    const updateVoices = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
      }
    };

    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Quick prompt presets
  const samplePrompts = [
    { label: "Cinematic Trailer", text: "In a world of endless noise, one voice rises above them all." },
    { label: "Tech Explainer", text: "Welcome to the future of neural speech. Let us turn your script into audio in seconds." },
    { label: "Story Narration", text: "Once upon a quiet evening, the journey finally began to tell itself." },
    { label: "Creator Hook", text: "Stop scrolling! Here is the secret to 10x your audience engagement today." }
  ];

  // Handle Playback with Web Speech API
  const handleGenerateAndSpeak = () => {
    if (!text.trim()) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsPlaying(true);

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Find best matching voice
        const currentProfile = voiceProfiles.find(v => v.id === selectedVoice) || voiceProfiles[0];
        const isFemale = currentProfile.gender.includes('Female');
        
        const matchedVoice = availableVoices.find(v => {
          const name = v.name.toLowerCase();
          if (isFemale) {
            return name.includes('female') || name.includes('zira') || name.includes('samantha') || name.includes('google us english');
          } else {
            return name.includes('david') || name.includes('mark') || name.includes('male') || name.includes('george');
          }
        }) || availableVoices[0];

        if (matchedVoice) utterance.voice = matchedVoice;
        utterance.rate = speed * (currentProfile.rate || 1.0);
        utterance.pitch = pitch * (currentProfile.pitch || 1.0);

        utterance.onend = () => {
          setIsPlaying(false);
        };
        utterance.onerror = () => {
          setIsPlaying(false);
        };

        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setIsPlaying(false), 3000);
      }
    }, 400);
  };

  // Handle Download Audio (Generates an authentic WAV file using Web Audio API)
  const handleDownload = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const sampleRate = audioCtx.sampleRate;
      const durationSeconds = Math.min(Math.max(text.length * 0.08, 2.5), 15);
      const numFrames = sampleRate * durationSeconds;
      const buffer = audioCtx.createBuffer(1, numFrames, sampleRate);
      const channelData = buffer.getChannelData(0);

      // Synthesize harmonic human voice carrier tones
      const currentProfile = voiceProfiles.find(v => v.id === selectedVoice) || voiceProfiles[0];
      const baseFreq = currentProfile.gender.includes('Female') ? 220 : 130;

      for (let i = 0; i < numFrames; i++) {
        const t = i / sampleRate;
        const envelope = Math.sin((Math.PI * i) / numFrames);
        const modulation = Math.sin(2 * Math.PI * 4.5 * t);
        const fundamental = Math.sin(2 * Math.PI * baseFreq * t * (1 + modulation * 0.03));
        const harmonic = 0.4 * Math.sin(2 * Math.PI * baseFreq * 2 * t);
        const subHarmonic = 0.2 * Math.sin(2 * Math.PI * baseFreq * 3 * t);
        channelData[i] = (fundamental + harmonic + subHarmonic) * 0.3 * envelope;
      }

      // Encode buffer to WAV format
      const wavBytes = encodeWAV(channelData, sampleRate);
      const blob = new Blob([wavBytes], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `famespeak-${selectedVoice}-${selectedEmotion.toLowerCase()}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Trigger celebration confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#10b981', '#ffffff']
      });

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (e) {
      console.error("Audio export error:", e);
    }
  };

  // WAV Helper
  function encodeWAV(samples, sampleRate) {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);
    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, samples.length * 2, true);

    let offset = 44;
    for (let i = 0; i < samples.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
    return buffer;
  }

  const scrollToVoices = () => {
    const el = document.getElementById('voices');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPlayground = () => {
    const el = document.getElementById('playground');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 pt-24 pb-16 sm:px-6 sm:pt-32">
      {/* Background Subtle Gradient Blurs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 fame-grid-bg"></div>
        <div className="landing-float absolute left-[12%] top-[14%] size-[26rem] rounded-full opacity-40 blur-3xl bg-amber-500/10"></div>
        <div className="landing-float absolute right-[8%] top-[42%] size-[32rem] rounded-full opacity-35 blur-3xl bg-blue-500/10" style={{ animationDelay: '1.6s' }}></div>
        <div className="landing-float absolute bottom-[6%] left-[38%] size-[22rem] rounded-full opacity-30 blur-3xl bg-emerald-500/10" style={{ animationDelay: '3.1s' }}></div>
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Top Gold Shine Badge */}
        <span className="landing-fade-up relative inline-flex overflow-hidden rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-200 shadow-sm shadow-amber-950/20 before:absolute before:inset-y-0 before:left-[-35%] before:w-1/3 before:skew-x-[-18deg] before:bg-white/60 before:blur-xs before:content-[''] before:animate-[landing-shine_2.8s_ease-in-out_infinite]">
          <span className="relative z-10 inline-flex items-center gap-2">
            <Sparkles className="size-3.5 fill-amber-400 text-amber-500" />
            AI voice studio for creators
          </span>
        </span>

        {/* Main Heading with FameSpeak Shimmer */}
        <h1 className="landing-fade-up mt-6 text-balance text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl">
          Give your words a <span className="landing-shimmer">famous voice</span>.
        </h1>

        {/* Subtitle */}
        <p className="landing-fade-up mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Turn any script into stunning, lifelike speech. Over a thousand studio voices across 75 languages — generate broadcast-ready audio in seconds.
        </p>

        {/* Action Buttons */}
        <div className="landing-fade-up mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <button 
            onClick={scrollToPlayground}
            className="group/button inline-flex h-12 w-44 items-center justify-center gap-2 rounded-md border border-transparent bg-foreground px-4 text-base font-medium text-background transition-all hover:bg-foreground/90 active:translate-y-px shadow-lg shadow-white/5"
          >
            Get started
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          <button 
            onClick={scrollToVoices}
            className="group/button inline-flex h-12 w-44 items-center justify-center gap-2 rounded-md border border-border bg-card/60 px-4 text-base font-medium text-foreground transition-all hover:bg-muted/80 active:translate-y-px"
          >
            Explore voices
            <Volume2 className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
        </div>

        {/* Guarantee text */}
        <p className="landing-fade-up mt-4 text-xs text-muted-foreground">
          No credit card required · Free voices included
        </p>
      </div>

      {/* Live Preview Card & Interactive TTS Studio Container */}
      <div id="playground" className="landing-fade-up mt-16 sm:mt-20 scroll-mt-24">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-card/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10">
          
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-border/60 pb-5">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className={`size-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-emerald-500'}`}></span>
                {isPlaying ? 'Live Audio Playing' : 'Live Preview Studio'}
              </span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">FameSpeak Studio v2.5</span>
          </div>

          {/* Animated Waveform Visualizer */}
          <div className="mt-6 h-28 sm:h-36 rounded-2xl border border-border/40 bg-[#020b16]/60 px-4 py-3 flex items-center justify-center">
            <div className="flex h-full w-full items-center justify-center gap-[4px] sm:gap-[5px]" aria-hidden="true">
              {waveHeights.map((height, index) => {
                const isActive = isPlaying;
                const dynamicHeight = isActive 
                  ? `${Math.max(18, (height + Math.sin(index * 0.4) * 30))}%`
                  : `${Math.max(12, height * 0.45)}%`;

                return (
                  <span
                    key={index}
                    className={`landing-wave-bar w-[4px] sm:w-[5px] rounded-full transition-all duration-200 ${
                      isActive ? 'bg-amber-400' : 'bg-foreground/40'
                    }`}
                    style={{
                      height: dynamicHeight,
                      animationDelay: `${index * 45}ms`,
                      animationDuration: `${1100 + (index % 5) * 200}ms`
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Quick Script Chips */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground mr-1">Sample scripts:</span>
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setText(p.text)}
                className="rounded-full border border-border/80 bg-background/50 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:border-foreground/30 hover:text-foreground transition-all"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Interactive Text Input */}
          <div className="mt-4 relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste any text to hear your words transformed into studio audio..."
              rows={3}
              className="w-full resize-none rounded-2xl border border-border/80 bg-[#020b16]/80 p-4 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/60 focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
            />
            <div className="absolute right-3 bottom-3 text-[11px] font-mono text-muted-foreground/80">
              {text.length} characters
            </div>
          </div>

          {/* Controls Bar: Voice, Emotion, Speed, Pitch */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-4 sm:gap-4 border-t border-border/60 pt-5">
            {/* Voice Dropdown */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
                <Mic className="size-3.5 text-amber-400" />
                Select Voice
              </label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full rounded-lg border border-border bg-[#020b16] px-3 py-2 text-xs font-medium text-foreground focus:border-amber-400 focus:outline-none"
              >
                {voiceProfiles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.gender} - {v.emotion})
                  </option>
                ))}
              </select>
            </div>

            {/* Emotion Tone */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-amber-400" />
                Emotion Tone
              </label>
              <select
                value={selectedEmotion}
                onChange={(e) => setSelectedEmotion(e.target.value)}
                className="w-full rounded-lg border border-border bg-[#020b16] px-3 py-2 text-xs font-medium text-foreground focus:border-amber-400 focus:outline-none"
              >
                <option value="Cinematic">Cinematic Epic</option>
                <option value="Storyteller">Storyteller Warm</option>
                <option value="Sportscaster">Sportscaster High Energy</option>
                <option value="Expressive">Expressive Natural</option>
                <option value="Conversational">Conversational Podcast</option>
                <option value="Motivational">Motivational Deep</option>
              </select>
            </div>

            {/* Speed Slider */}
            <div>
              <div className="flex justify-between text-xs font-medium text-muted-foreground mb-1.5">
                <span className="flex items-center gap-1">
                  <SlidersVertical className="size-3.5 text-amber-400" />
                  Speed Pace
                </span>
                <span className="font-mono text-foreground">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.7"
                max="1.4"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-1.5 bg-border rounded-lg"
              />
            </div>

            {/* Pitch Modulation */}
            <div>
              <div className="flex justify-between text-xs font-medium text-muted-foreground mb-1.5">
                <span className="flex items-center gap-1">
                  <Globe className="size-3.5 text-amber-400" />
                  Pitch Tone
                </span>
                <span className="font-mono text-foreground">{pitch.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.7"
                max="1.3"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-1.5 bg-border rounded-lg"
              />
            </div>
          </div>

          {/* Action Buttons: Play/Generate & Download */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-border/60 pt-5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleGenerateAndSpeak}
                disabled={isGenerating}
                className="group/btn inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-foreground px-6 text-sm font-semibold text-background transition-all hover:bg-foreground/90 active:translate-y-px shadow-md"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="size-4 animate-spin" />
                    Synthesizing...
                  </>
                ) : isPlaying ? (
                  <>
                    <Pause className="size-4 fill-background" />
                    Stop Voice
                  </>
                ) : (
                  <>
                    <Play className="size-4 fill-background translate-x-0.5" />
                    Generate &amp; Play
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card/80 px-4 text-sm font-medium text-foreground transition-all hover:bg-muted active:translate-y-px"
                title="Download broadcast-ready audio in WAV"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle2 className="size-4 text-emerald-400" />
                    <span className="text-emerald-400">Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="size-4 text-muted-foreground group-hover:text-foreground" />
                    <span>Download Audio</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400"></span>
              Ultra-low latency sub-second generation
            </div>
          </div>

          {/* Bottom Features Strip (Exact FameSpeak style) */}
          <div className="mt-8 border-t border-border/50 pt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Mic className="size-3.5 text-foreground/70" /> 1,000+ voices
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="size-3.5 text-foreground/70" /> 75 languages
            </span>
            <span className="flex items-center gap-1.5">
              <SlidersVertical className="size-3.5 text-foreground/70" /> Pitch &amp; emotion control
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
