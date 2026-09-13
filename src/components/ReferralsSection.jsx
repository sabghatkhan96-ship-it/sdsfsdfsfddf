import React, { useState } from 'react';
import { Gift, Link2, UserPlus, ArrowRight, Users, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReferralsSection() {
  const [copied, setCopied] = useState(false);
  const referralLink = "famespeak.online/?ref=CREATOR";

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${referralLink}`);
    setCopied(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#f59e0b', '#10b981']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToPlayground = () => {
    const el = document.getElementById('playground');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="referrals" className="scroll-mt-20 border-y border-border bg-muted/20">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          
          {/* Left Column: Details & Steps */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
              <Gift className="size-3.5" />
              Referral campaign
            </span>

            <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
              Invite friends, <span className="landing-shimmer">earn 10,000 premium credits</span> each.
            </h2>

            <p className="mt-4 max-w-xl text-pretty text-muted-foreground leading-relaxed">
              Share your personal link. When a friend joins FameSpeak, you both get <strong className="font-semibold text-foreground">10,000 premium credits</strong> — enough to generate hours of premium audio. No limits on how many friends you invite.
            </p>

            <ol className="mt-8 space-y-4">
              <li className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card">
                  <Link2 className="size-5 text-muted-foreground" />
                </span>
                <div>
                  <p className="font-semibold tracking-tight text-foreground">
                    <span className="mr-2 text-muted-foreground tabular-nums">1.</span>
                    Share your link
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    Grab your unique referral link from the dashboard and send it anywhere.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card">
                  <UserPlus className="size-5 text-muted-foreground" />
                </span>
                <div>
                  <p className="font-semibold tracking-tight text-foreground">
                    <span className="mr-2 text-muted-foreground tabular-nums">2.</span>
                    Friends sign up
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    They create a free account through your link in seconds.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card">
                  <Gift className="size-5 text-muted-foreground" />
                </span>
                <div>
                  <p className="font-semibold tracking-tight text-foreground">
                    <span className="mr-2 text-muted-foreground tabular-nums">3.</span>
                    You both earn
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    10,000 premium credits land in both accounts, instantly.
                  </p>
                </div>
              </li>
            </ol>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={scrollToPlayground}
                className="group/button inline-flex h-12 items-center justify-center gap-2 rounded-md bg-foreground px-6 text-base font-medium text-background transition-all hover:bg-foreground/90 active:translate-y-px shadow-sm"
              >
                Start referring
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users className="size-4" />
                Unlimited invites · Premium credits never expire
              </p>
            </div>
          </div>

          {/* Right Column: Floating Reward Card */}
          <div className="landing-float relative">
            <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-foreground/5 blur-2xl"></div>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Gift className="size-4 text-amber-400" />
                  Your reward
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
                  Active
                </span>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">You earn</p>
                <p className="mt-1 text-6xl font-bold tracking-tight tabular-nums text-foreground">
                  10,000
                </p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  premium credits per friend
                </p>
              </div>

              {/* Referral Link Box */}
              <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4">
                <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Link2 className="size-3.5 text-amber-400" />
                  Your referral link
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <code className="min-w-0 flex-1 truncate rounded-lg bg-background/80 px-3 py-2 font-mono text-sm font-semibold text-amber-200 border border-border/50">
                    {referralLink}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all active:translate-y-px"
                    title="Copy referral link"
                  >
                    {copied ? <Check className="size-4 text-emerald-600 font-bold" /> : <Copy className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Bottom 2 metric pills */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border p-3 text-center bg-background/40">
                  <p className="text-2xl font-semibold tabular-nums text-foreground">∞</p>
                  <p className="text-xs text-muted-foreground">Invites</p>
                </div>
                <div className="rounded-xl border border-border p-3 text-center bg-background/40">
                  <p className="text-2xl font-semibold tabular-nums text-foreground">2×</p>
                  <p className="text-xs text-muted-foreground">Both rewarded</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
