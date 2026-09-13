import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'Is VoxGravity completely free to use?',
    a: 'Yes! You can generate, customize, preview, and download voiceovers completely free without credit cards, subscriptions, or login walls. Our mission is to make studio-quality AI audio accessible to creators globally.'
  },
  {
    q: 'Can I monetize YouTube videos or podcasts made with VoxGravity audio?',
    a: 'Absolutely. You hold 100% full commercial rights to all audio files generated through VoxGravity. You can freely monetize YouTube channels, TikTok videos, client marketing campaigns, audiobooks, and video games.'
  },
  {
    q: 'How do I download the audio file to my computer or phone?',
    a: 'Simply paste or type your script into the Zero-Gravity Playground, select your preferred voice, and click "Download WAV Audio". A lossless studio-quality .wav file will be downloaded immediately to your device.'
  },
  {
    q: 'Which languages and dialects are supported?',
    a: 'VoxGravity supports over 75 global languages and regional accents including American English, British English, Australian English, Urdu, Hindi, Spanish, French, German, Japanese, Arabic, and more.'
  },
  {
    q: 'What is the benefit of Zero-Gravity Emotion Modulation?',
    a: 'Instead of robotic monotone speech, our emotion presets automatically calculate harmonic pitch and cadence envelopes. Cinematic gives you deep movie trailer bass, Storyteller balances warmth for audiobooks, and Hyper-YouTuber provides fast, punchy delivery for viral retention.'
  },
  {
    q: 'Is my script or personal data saved on your servers?',
    a: 'No. VoxGravity executes voice synthesis on the client side using secure modern browser audio APIs. Your private scripts and voiceovers are never logged or stored on external servers.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-xs font-mono font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
            Frequently Asked <span className="text-gradient-cyan-purple">Questions</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Everything you need to know about voices, formats, and commercial rights.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl glass-card border border-white/5 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-white font-['Space_Grotesk'] pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-neon-cyan shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-neon-purple' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
