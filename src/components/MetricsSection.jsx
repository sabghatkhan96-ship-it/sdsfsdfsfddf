import React from 'react';

export default function MetricsSection() {
  const metrics = [
    { value: '1,000+', label: 'Studio voices' },
    { value: '75', label: 'Languages' },
    { value: '110', label: 'Accents & regions' },
    { value: '<10s', label: 'To first audio' }
  ];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
        {metrics.map((item, index) => (
          <div key={index} className="bg-[#020b16] px-6 py-7 text-center transition-colors hover:bg-muted/30">
            <p className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
