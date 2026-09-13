import React from 'react';
import { CreditCard, Check, ArrowRight } from 'lucide-react';

export default function PricingSection({ onOpenLegal }) {
  const plans = [
    {
      name: 'Basic',
      price: '$5',
      interval: '/ month',
      description: 'A practical entry plan for individual creators producing regular voice content.',
      credits: '3,000,000 credits',
      expiry: 'Credits expire after 30 days',
      popular: false,
      benefits: [
        'Unlimited generations with standard voices',
        '3,000,000 credits for studio emotion engine',
        'Create and save up to 3 custom voice profiles',
        'Up to 50,000 characters per generation',
        'API: 30 requests/minute and 1 concurrent generation',
        'No monthly API character cap'
      ]
    },
    {
      name: 'Starter',
      price: '$10',
      interval: '/ month',
      description: 'A balanced plan for growing creators with higher output and more saved voices.',
      credits: '7,000,000 credits',
      expiry: 'Credits expire after 30 days',
      popular: true,
      benefits: [
        'Unlimited generations with standard voices',
        '7,000,000 credits for studio emotion engine',
        'Create and save up to 5 custom voice profiles',
        'Up to 100,000 characters per generation',
        'API: 50 requests/minute and 5 concurrent generations',
        'No monthly API character cap',
        'Priority studio support'
      ]
    },
    {
      name: 'Pro',
      price: '$20',
      interval: '/ month',
      description: 'Built for professional creators and teams running high-volume production workflows.',
      credits: '18,000,000 credits',
      expiry: 'Credits expire after 30 days',
      popular: false,
      benefits: [
        '18,000,000 credits for studio emotion engine',
        'Unlimited saved custom voice profiles',
        'Up to 200,000 characters per generation',
        'API: 200 requests/minute and 50 concurrent generations',
        'Broadcast commercial license included',
        'No monthly API character cap',
        'Dedicated account priority support'
      ]
    },
    {
      name: 'Custom',
      price: 'Custom',
      interval: '',
      description: 'A tailored solution for organizations with specialized volume, access, or support needs.',
      credits: 'Enterprise tier volume',
      expiry: 'Custom validity set by account admin',
      popular: false,
      isCustom: true,
      benefits: [
        'Tailored studio credits for enterprise workloads',
        'Unlimited saved cloned voice models',
        'Custom per-generation character limit',
        'API: 500 requests/minute & 100 concurrent slots',
        'No monthly API character cap',
        'Flexible SLA and invoice payment terms',
        'Direct 24/7 priority technical support'
      ]
    }
  ];

  const scrollToPlayground = () => {
    const el = document.getElementById('playground');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          <CreditCard className="size-3.5" />
          Premium plans
        </span>
        <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
          Upgrade when your script needs more range
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground">
          Pick a credit pack, then complete secure checkout from your account.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`flex min-w-0 flex-col rounded-2xl border p-6 shadow-sm transition-all duration-200 ${
              plan.popular 
                ? 'border-amber-500/40 bg-card/90 shadow-amber-500/5 ring-1 ring-amber-500/30' 
                : 'border-border bg-card/60'
            }`}
          >
            {/* Plan Name & Popular Pill */}
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold tracking-tight text-foreground">
                {plan.name}
              </p>
              {plan.popular && (
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300 uppercase tracking-wide">
                  Popular
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-2 min-h-10 text-sm leading-5 text-muted-foreground">
              {plan.description}
            </p>

            {/* Price */}
            <div className="mt-6">
              <span className="text-4xl font-bold tracking-tight text-foreground">
                {plan.price}
              </span>
              {plan.interval && (
                <span className="ml-1 text-sm text-muted-foreground">
                  {plan.interval}
                </span>
              )}
            </div>

            {/* Credits Info */}
            <div className="mt-4 space-y-1 text-xs text-muted-foreground border-t border-border/50 pt-3">
              <p className="font-semibold text-foreground/90">{plan.credits}</p>
              <p>{plan.expiry}</p>
            </div>

            {/* Feature Checklist */}
            <ul className="mt-6 flex-1 space-y-3">
              {plan.benefits.map((benefit, bIdx) => (
                <li key={bIdx} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Button */}
            {plan.isCustom ? (
              <button
                type="button"
                onClick={() => onOpenLegal('contact')}
                className="group/button mt-7 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-md border border-border bg-background text-sm font-medium text-foreground hover:bg-muted transition-all active:translate-y-px"
              >
                Contact support
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={scrollToPlayground}
                className="group/button mt-7 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-md border border-transparent bg-foreground text-sm font-medium text-background hover:bg-foreground/90 transition-all active:translate-y-px shadow-sm"
              >
                Buy plan
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
