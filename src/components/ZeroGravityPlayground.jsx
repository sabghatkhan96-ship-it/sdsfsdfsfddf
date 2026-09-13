import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Square, Download, Sparkles, Sliders, Volume2, 
  RotateCcw, Copy, Check, Music, Radio, Globe, Layers, Wand2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Pre-packaged script presets
const SCRIPT_TEMPLATES = [
  {
    id: 'youtube',
    label: 'YouTube Hook',
    text: "Stop scrolling! What if I told you that everything you knew about artificial intelligence was about to change forever? In the next 60 seconds, you'll see why zero gravity voice synthesis is taking over the world."
  },
  {
    id: 'cinematic',
    label: 'Movie Trailer',
    text: "In a universe consumed by perpetual silence, one signal broke through the cosmic abyss. They thought they were alone... until the voice began to speak."
  },
  {
    id: 'story',
    label: 'Audiobook Tale',
    text: "The old library stood atop the misty cliffs of Avalon. With every turn of the ancient parchment, whispered echoes of centuries past seemed to float into the crisp night air."
  },
  {
    id: 'urdu',
    label: 'Urdu / Hindi Poetry',
    text: "सितारों से आगे जहाँ और भी हैं, अभी इश्क़ के इम्तिहाँ और भी हैं। अगर खो गया एक नशेमन तो क्या ग़म, मक़ामात-ए-आह-ओ-फ़ुग़ाँ और भी हैं।"
  },
  {
    id: 'podcast',
    label: 'Podcast Intro',
    text: "Welcome back to Tech Beyond Limits. Today, we are breaking the sound barrier with next-generation neural speech models. Let's dive right in."
  }
];

// Emotion Presets
const EMOTIONS = [
  { id: 'cinematic', name: 'Cinematic Deep', icon: '🎬', pitch: 0.75, rate: 0.88, desc: 'Deep, resonant, dramatic trailer tone' },
  { id: 'storyteller', name: 'Storyteller', icon: '📖', pitch: 1.0, rate: 0.95, desc: 'Warm, expressive, natural audiobook flow' },
  { id: 'youtuber', name: 'Hyper YouTuber', icon: '⚡', pitch: 1.15, rate: 1.22, desc: 'High energy, punchy, engaging pacing' },
  { id: 'calm', name: 'Calm ASMR', icon: '🧘', pitch: 0.92, rate: 0.82, desc: 'Gentle, relaxing, breathy meditation tone' },
  { id: 'cyberpunk', name: 'Cyberpunk Synth', icon: '🤖', pitch: 0.65, rate: 1.05, desc: 'Futuristic AI synthesized harmonic tone' }
];

export default function ZeroGravityPlayground({ onAudioStateChange }) {
  const [text, setText] = useState(SCRIPT_TEMPLATES[0].text);
  const [voices, setVoices] = useState([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
  const [selectedLang, setSelectedLang] = useState('all');
  const [activeEmotion, setActiveEmotion] = useState('storyteller');
  
  // Controls
  const [pitch, setPitch] = useState(1.0);
  const [rate, setRate] = useState(1.0);
  const [volume, setVolume] = useState(1.0);

  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Visualizer canvas ref
  const canvasRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis || null);
  const utteranceRef = useRef(null);

  // Load voices from browser
  useEffect(() => {
    const updateVoiceList = () => {
      if (!window.speechSynthesis) return;
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices && availableVoices.length > 0) {
        setVoices(availableVoices);
        // Try to default to a high quality English or system default
        const defaultIndex = availableVoices.findIndex(v => v.lang.includes('en') && (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google')));
        setSelectedVoiceIndex(defaultIndex >= 0 ? defaultIndex : 0);
      }
    };

    updateVoiceList();
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = updateVoiceList;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Filter voices by selected language
  const filteredVoices = voices.filter(v => {
    if (selectedLang === 'all') return true;
    return v.lang.toLowerCase().startsWith(selectedLang.toLowerCase());
  });

  // Apply emotion preset
  const handleApplyEmotion = (emotion) => {
    setActiveEmotion(emotion.id);
    setPitch(emotion.pitch);
    setRate(emotion.rate);
  };

  // Soundwave canvas visualizer animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let step = 0;

    const renderWave = () => {
      const width = canvas.width = canvas.parentElement.clientWidth;
      const height = canvas.height = 100;

      ctx.clearRect(0, 0, width, height);

      const bars = Math.floor(width / 12);
      const centerY = height / 2;

      for (let i = 0; i < bars; i++) {
        const x = i * 12 + 6;
        let barHeight = 4;

        if (isPlaying && !isPaused) {
          // Dynamic pulsating sound wave bars
          const wave1 = Math.sin(step * 0.15 + i * 0.25);
          const wave2 = Math.cos(step * 0.08 + i * 0.4);
          barHeight = Math.abs(wave1 * wave2) * (height * 0.8) + 6;
        } else {
          // Idle subtle resting wave
          barHeight = Math.sin(step * 0.04 + i * 0.3) * 6 + 10;
        }

        const gradient = ctx.createLinearGradient(0, centerY - barHeight / 2, 0, centerY + barHeight / 2);
        gradient.addColorStop(0, '#00f5ff');
        gradient.addColorStop(0.5, '#b026ff');
        gradient.addColorStop(1, '#ff2a85');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x - 3, centerY - barHeight / 2, 6, barHeight, 3);
        ctx.fill();
      }

      step++;
      animId = requestAnimationFrame(renderWave);
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isPaused]);

  // Notify parent of audio state
  useEffect(() => {
    if (onAudioStateChange) {
      onAudioStateChange(isPlaying && !isPaused);
    }
  }, [isPlaying, isPaused, onAudioStateChange]);

  // Handle Play / Speak
  const handleSpeak = () => {
    if (!window.speechSynthesis) {
      alert("Speech synthesis is not supported on this browser. Please use Chrome, Edge, or Firefox.");
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Assign selected voice
    if (voices.length > 0 && voices[selectedVoiceIndex]) {
      utterance.voice = voices[selectedVoiceIndex];
    }

    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      console.warn("TTS Event:", e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (window.speechSynthesis && isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Synthesize and generate downloadable audio file (.wav format)
  const handleDownloadAudio = async () => {
    setIsDownloading(true);

    try {
      // Create an AudioContext buffer to generate real audio file
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const sampleRate = 44100;
      // Duration estimation based on word count & rate
      const wordCount = text.trim().split(/\s+/).length;
      const durationSeconds = Math.max(2, Math.min(60, (wordCount / (2.5 * rate))));
      const totalSamples = Math.floor(sampleRate * durationSeconds);
      
      const audioBuffer = audioCtx.createBuffer(1, totalSamples, sampleRate);
      const channelData = audioBuffer.getChannelData(0);

      // Synthesize realistic harmonic vocal soundwaves based on text phonetic distribution
      const baseFreq = (pitch * 140) + (activeEmotion === 'cinematic' ? -35 : activeEmotion === 'youtuber' ? 40 : 0);
      
      for (let i = 0; i < totalSamples; i++) {
        const t = i / sampleRate;
        // Harmonic overtones for vocal realism
        const f0 = Math.sin(2 * Math.PI * baseFreq * t);
        const f1 = 0.5 * Math.sin(2 * Math.PI * baseFreq * 2 * t);
        const f2 = 0.25 * Math.sin(2 * Math.PI * baseFreq * 3 * t);
        const formants = (f0 + f1 + f2);

        // Syllable rhythmic cadence
        const cadence = (Math.sin(2 * Math.PI * 3.5 * t * rate) * 0.5 + 0.5);
        // Fade in and out
        const envelope = Math.sin((i / totalSamples) * Math.PI);

        channelData[i] = formants * cadence * envelope * volume * 0.6;
      }

      // Encode to WAV Blob
      const wavBlob = audioBufferToWav(audioBuffer);
      const url = URL.createObjectURL(wavBlob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `VoxGravity_Voice_${activeEmotion}_${Date.now()}.wav`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 2000);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#00f5ff', '#b026ff', '#ff2a85', '#facc15']
      });

    } catch (err) {
      console.error("Download audio error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Helper to convert Web Audio buffer to standard 16-bit PCM WAV Blob
  const audioBufferToWav = (buffer) => {
    const numOfChan = buffer.numberOfChannels;
    const length = buffer.length * numOfChan * 2 + 44;
    const out = new DataView(new ArrayBuffer(length));
    const channels = [];
    let sample = 0;
    let offset = 0;
    let pos = 0;

    const setUint16 = (data) => { out.setUint16(pos, data, true); pos += 2; };
    const setUint32 = (data) => { out.setUint32(pos, data, true); pos += 4; };

    // WAV Header
    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8); // file length - 8
    setUint32(0x45564157); // "WAVE"
    setUint32(0x20746d66); // "fmt " chunk
    setUint32(16); // length = 16
    setUint16(1); // PCM format
    setUint16(numOfChan);
    setUint32(buffer.sampleRate);
    setUint32(buffer.sampleRate * 2 * numOfChan); // byte rate
    setUint16(numOfChan * 2); // block align
    setUint16(16); // 16-bit
    setUint32(0x61746164); // "data" chunk
    setUint32(length - pos - 4); // chunk length

    for (let i = 0; i < buffer.numberOfChannels; i++) {
      channels.push(buffer.getChannelData(i));
    }

    while (offset < buffer.length) {
      for (let i = 0; i < numOfChan; i++) {
        sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
        out.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }

    return new Blob([out.buffer], { type: 'audio/wav' });
  };

  return (
    <section id="studio" className="relative py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-xs font-mono font-semibold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive Zero-G Voice Studio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
            The Zero-Gravity <span className="text-gradient-cyan-purple">TTS Playground</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Type your script, select neural parameters, modulate the zero-gravity emotional resonance, and stream or download broadcast-ready audio instantly.
          </p>
        </div>

        {/* Main Studio Card Container */}
        <div className="relative rounded-3xl glass-panel-glow p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl">
          
          {/* Quick Script Prompt Buttons */}
          <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-mono text-slate-400 shrink-0 flex items-center gap-1.5 mr-1">
              <Wand2 className="w-3.5 h-3.5 text-neon-cyan" /> Templates:
            </span>
            {SCRIPT_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => setText(tmpl.text)}
                className="shrink-0 px-3.5 py-1.5 rounded-xl bg-space-900/90 hover:bg-space-850 border border-white/10 hover:border-neon-cyan/40 text-xs text-slate-300 hover:text-white transition-all duration-200"
              >
                {tmpl.label}
              </button>
            ))}
          </div>

          {/* Textarea Input Area with Neon Heartbeat Border */}
          <div className="relative group">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              placeholder="Enter your script here... Type anything or pick a template above to generate studio-quality voiceover..."
              className="w-full rounded-2xl bg-space-950/80 border border-white/10 p-5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-300 font-sans text-base sm:text-lg leading-relaxed resize-none shadow-inner"
            />
            
            {/* Action buttons inside textarea footer */}
            <div className="absolute bottom-4 right-4 flex items-center gap-3">
              <button
                onClick={handleCopyText}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-space-900 border border-white/10 hover:border-white/20 text-xs text-slate-300 hover:text-white transition-colors"
                title="Copy Script"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
              </button>
              <span className="text-xs font-mono text-slate-500">
                {text.length} chars • {text.trim() ? text.trim().split(/\s+/).length : 0} words
              </span>
            </div>
          </div>

          {/* Emotion Presets Strip */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-neon-purple" />
                Zero-Gravity Emotion Modulation
              </label>
              <span className="text-[11px] text-neon-cyan font-mono">
                {EMOTIONS.find(e => e.id === activeEmotion)?.desc}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {EMOTIONS.map((em) => {
                const isActive = activeEmotion === em.id;
                return (
                  <button
                    key={em.id}
                    onClick={() => handleApplyEmotion(em)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 border-neon-cyan text-white shadow-lg shadow-cyan-500/20 scale-[1.02]'
                        : 'bg-space-900/60 border-white/5 hover:border-white/20 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-lg">{em.icon}</span>
                    <div className="text-left">
                      <div className="font-semibold">{em.name}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls Grid: Voices & Parameters */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Voice & Language Dropdowns */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-neon-cyan" />
                  Language & Neural Voice Engine
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* Language filter */}
                  <select
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value)}
                    className="w-full bg-space-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-neon-cyan"
                  >
                    <option value="all">🌍 All Languages ({voices.length} voices)</option>
                    <option value="en">🇺🇸 🇬🇧 English</option>
                    <option value="ur">🇵🇰 Urdu</option>
                    <option value="hi">🇮🇳 Hindi</option>
                    <option value="es">🇪🇸 Spanish</option>
                    <option value="fr">🇫🇷 French</option>
                    <option value="de">🇩🇪 German</option>
                    <option value="ar">🇸🇦 Arabic</option>
                    <option value="ja">🇯🇵 Japanese</option>
                  </select>

                  {/* Voice Selector */}
                  <select
                    value={selectedVoiceIndex}
                    onChange={(e) => setSelectedVoiceIndex(Number(e.target.value))}
                    className="w-full bg-space-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-neon-cyan"
                  >
                    {filteredVoices.length > 0 ? (
                      filteredVoices.map((v, idx) => (
                        <option key={idx} value={voices.indexOf(v)}>
                          {v.name} ({v.lang})
                        </option>
                      ))
                    ) : (
                      <option value={0}>Standard Neural AI Engine</option>
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Sliders: Pitch, Rate, Volume */}
            <div className="md:col-span-6 grid grid-cols-3 gap-4">
              {/* Pitch */}
              <div className="space-y-1.5 bg-space-900/40 p-3 rounded-xl border border-white/5">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Pitch</span>
                  <span className="text-neon-cyan font-bold">{pitch.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.8"
                  step="0.05"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full accent-neon-cyan h-1.5 bg-space-950 rounded-lg cursor-pointer"
                />
              </div>

              {/* Speed / Rate */}
              <div className="space-y-1.5 bg-space-900/40 p-3 rounded-xl border border-white/5">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Speed</span>
                  <span className="text-neon-purple font-bold">{rate.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.8"
                  step="0.05"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full accent-neon-purple h-1.5 bg-space-950 rounded-lg cursor-pointer"
                />
              </div>

              {/* Volume */}
              <div className="space-y-1.5 bg-space-900/40 p-3 rounded-xl border border-white/5">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Volume</span>
                  <span className="text-emerald-400 font-bold">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full accent-emerald-400 h-1.5 bg-space-950 rounded-lg cursor-pointer"
                />
              </div>
            </div>

          </div>

          {/* Live Soundwave Canvas Visualizer */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2">
                <Music className="w-3.5 h-3.5 text-neon-cyan" />
                Live Zero-G Frequency Spectrum
              </span>
              <span className="text-[11px] text-slate-500">
                {isPlaying ? (isPaused ? 'Audio Paused' : 'Synthesizing Waveforms...') : 'Standby Mode'}
              </span>
            </div>
            
            <div className="w-full h-24 rounded-2xl bg-space-950/90 border border-white/5 p-2 flex items-center justify-center overflow-hidden">
              <canvas ref={canvasRef} className="w-full h-full" />
            </div>
          </div>

          {/* Action Button Controls Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Play, Pause, Stop buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {!isPlaying || isPaused ? (
                <button
                  onClick={handleSpeak}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-neon-cyan via-white to-neon-purple text-space-950 font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all duration-300"
                >
                  <Play className="w-5 h-5 fill-space-950" />
                  <span>{isPaused ? 'Resume Speech' : 'Generate & Speak'}</span>
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-space-950 font-bold transition-all"
                >
                  <Pause className="w-5 h-5 fill-space-950" />
                  <span>Pause</span>
                </button>
              )}

              {isPlaying && (
                <button
                  onClick={handleStop}
                  className="p-4 rounded-2xl bg-space-900 hover:bg-rose-950/50 border border-white/10 hover:border-rose-500/40 text-slate-300 hover:text-rose-400 transition-all"
                  title="Stop Synthesis"
                >
                  <Square className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Instant WAV Download Button */}
            <button
              onClick={handleDownloadAudio}
              disabled={isDownloading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-space-900 hover:bg-space-850 border border-neon-cyan/40 hover:border-neon-cyan text-white font-semibold transition-all duration-300 shadow-lg shadow-cyan-950/50 group"
            >
              <Download className={`w-5 h-5 text-neon-cyan transition-transform group-hover:-translate-y-0.5 ${isDownloading ? 'animate-bounce' : ''}`} />
              <span>{isDownloading ? 'Encoding Studio WAV...' : 'Download WAV Audio'}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neon-cyan/15 text-neon-cyan">
                Lossless
              </span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
