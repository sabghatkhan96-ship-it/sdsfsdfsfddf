import React, { useState } from 'react';
import { X, ShieldCheck, FileText, AlertCircle, Mail, Send, Check } from 'lucide-react';

export default function LegalModals({ activeModal, onClose }) {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!activeModal) return null;

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
      <div className="relative w-full max-w-3xl max-h-[85vh] rounded-3xl border border-border bg-[#020b16] p-6 sm:p-8 overflow-y-auto shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex size-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close dialog"
        >
          <X className="size-5" />
        </button>

        {/* Modal: Privacy Policy */}
        {activeModal === 'privacy' && (
          <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-7 text-amber-400" />
              <div>
                <h3 className="text-2xl font-bold text-foreground">Privacy Policy</h3>
                <span className="text-xs font-mono text-muted-foreground">Last updated: September 2026 • GDPR &amp; Google AdSense Compliant</span>
              </div>
            </div>

            <p>
              At <strong>FameSpeak Studio</strong>, we take the privacy of our visitors and creators very seriously. This Privacy Policy outlines the types of information collected and recorded by FameSpeak and how we handle it.
            </p>

            <h4 className="text-base font-semibold text-foreground">1. Client-Side Speech Processing</h4>
            <p>
              All text typed or pasted into the Studio Playground is synthesized directly in your browser using high-performance client-side Web Audio and Speech APIs. FameSpeak does not store, monitor, or transmit your scripts or synthesized audio to external databases without explicit account actions.
            </p>

            <h4 className="text-base font-semibold text-foreground">2. Google AdSense &amp; Third-Party Cookies</h4>
            <p>
              We partner with Google AdSense and third-party advertising networks to display relevant advertisements on our website. Google, as a third-party vendor, uses cookies (including the DoubleClick DART cookie) to serve ads to our users based on their visits to this site and other websites across the internet. Users may opt out of personalized advertising by visiting Google Ads Settings.
            </p>

            <h4 className="text-base font-semibold text-foreground">3. Log Files &amp; Analytics</h4>
            <p>
              Like most standard web services, FameSpeak may use basic analytics to monitor aggregate traffic patterns (e.g. browser type, referring pages, time spent on site) to optimize performance and server reliability.
            </p>

            <h4 className="text-base font-semibold text-foreground">4. User Rights &amp; GDPR / CCPA Compliance</h4>
            <p>
              You have the right to request access to any personal data held about you, request corrections, or request deletion under applicable data protection laws.
            </p>
          </div>
        )}

        {/* Modal: Terms of Service */}
        {activeModal === 'terms' && (
          <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
            <div className="flex items-center gap-3">
              <FileText className="size-7 text-amber-400" />
              <div>
                <h3 className="text-2xl font-bold text-foreground">Terms of Service</h3>
                <span className="text-xs font-mono text-muted-foreground">Effective Date: September 2026</span>
              </div>
            </div>

            <p>
              By accessing or using <strong>FameSpeak Studio</strong>, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please do not use our platform.
            </p>

            <h4 className="text-base font-semibold text-foreground">1. Voice Usage &amp; Commercial Rights</h4>
            <p>
              Audio generated on FameSpeak may be utilized for personal, educational, and commercial purposes (including YouTube videos, audiobooks, podcasts, social media reels, and client presentations) subject to fair use standards.
            </p>

            <h4 className="text-base font-semibold text-foreground">2. Prohibited Conduct</h4>
            <p>
              Users agree not to use FameSpeak to generate defamatory, abusive, hateful, discriminatory, or unlawful audio, or impersonate real persons without authorization or commit fraud.
            </p>

            <h4 className="text-base font-semibold text-foreground">3. Service Availability &amp; Disclaimer</h4>
            <p>
              The service is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied.
            </p>
          </div>
        )}

        {/* Modal: AI Disclaimer */}
        {activeModal === 'disclaimer' && (
          <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
            <div className="flex items-center gap-3">
              <AlertCircle className="size-7 text-amber-400" />
              <div>
                <h3 className="text-2xl font-bold text-foreground">AI Voice Disclaimer</h3>
                <span className="text-xs font-mono text-muted-foreground">Transparency in Generative Media</span>
              </div>
            </div>

            <p>
              The audio tracks and voice samples generated on <strong>FameSpeak</strong> are produced by deep learning algorithms and neural speech synthesis systems.
            </p>

            <h4 className="text-base font-semibold text-foreground">1. Synthetic Media Notice</h4>
            <p>
              Voices are synthetic digital representations and are not real human speech recordings unless explicitly labeled as studio voice actor partnerships.
            </p>

            <h4 className="text-base font-semibold text-foreground">2. Responsible Disclosure</h4>
            <p>
              We recommend creators disclose when voiceovers are AI-generated, especially when publishing journalistic, news, or sensitive educational content.
            </p>
          </div>
        )}

        {/* Modal: Contact Form */}
        {activeModal === 'contact' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Mail className="size-7 text-amber-400" />
              <div>
                <h3 className="text-2xl font-bold text-foreground">Contact &amp; Studio Support</h3>
                <p className="text-xs text-muted-foreground">We reply within 24 hours.</p>
              </div>
            </div>

            {contactSubmitted ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center space-y-2">
                <Check className="size-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-foreground">Message Sent Successfully!</h4>
                <p className="text-xs text-muted-foreground">Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-border bg-card p-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-border bg-card p-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Message / Inquiry</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you?"
                    className="w-full rounded-xl border border-border bg-card p-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-amber-400 focus:outline-none resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:bg-foreground/90 transition-all flex items-center justify-center gap-2 active:translate-y-px"
                >
                  <Send className="size-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
