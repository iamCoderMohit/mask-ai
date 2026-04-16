const steps = [
  {
    number: "01",
    title: "Describe your website",
    description:
      "Type a plain-English prompt — as short or detailed as you like. Tell Mask the purpose, style, or specific sections you want.",
    example: '"Build a landing page for a yoga studio in Bali with a booking section"',
    accent: "bg-violet-50 dark:bg-violet-950",
    text: "text-violet-500 dark:text-violet-400",
  },
  {
    number: "02",
    title: "Mask generates it instantly",
    description:
      "Our model reads your prompt and produces a fully responsive, styled website — HTML, CSS, layout and all. No templates, no drag-and-drop.",
    example: '"Full responsive site generated in under 10 seconds"',
    accent: "bg-sky-50 dark:bg-sky-950",
    text: "text-sky-500 dark:text-sky-400",
  },
  {
    number: "03",
    title: "Refine with follow-up prompts",
    description:
      "Not quite right? Just say what to change. Swap colors, rewrite copy, add a section, or start fresh — all in plain language.",
    example: '"Make the hero darker and add a testimonials section"',
    accent: "bg-amber-50 dark:bg-amber-950",
    text: "text-amber-500 dark:text-amber-400",
  },
  {
    number: "04",
    title: "Export and ship",
    description:
      "Download clean HTML & CSS or copy the code directly. Your site, your files — no lock-in, no platform dependency.",
    example: '"Export to clean, readable code you actually own"',
    accent: "bg-emerald-50 dark:bg-emerald-950",
    text: "text-emerald-500 dark:text-emerald-400",
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen text-neutral-900 dark:text-white">
      <main className="max-w-6xl mx-auto py-16">

        {/* Header */}
        <div className="mb-16 max-w-lg">
          <span className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            How it works
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-2 mb-3">
            From prompt to website in seconds.
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-base leading-relaxed">
            No design skills needed. No account required. Just describe what you want and Mask does the rest.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
            >
              <div className={`h-28 ${step.accent} flex items-center px-6 sm:px-8`}>
                <span className={`font-mono text-sm leading-relaxed opacity-70 ${step.text}`}>
                  {step.example}
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="text-xs font-mono font-medium text-neutral-300 dark:text-neutral-600 mt-0.5 shrink-0">
                    {step.number}
                  </span>
                  <div>
                    <h2 className="text-sm font-medium text-neutral-900 dark:text-white mb-1.5">
                      {step.title}
                    </h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-100 dark:border-neutral-800 my-16" />

        {/* Bottom section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              label: "No account needed",
              description: "Open the page, type your prompt, get your site. That's it.",
            },
            {
              label: "No design experience",
              description: "Mask handles layout, spacing, typography, and responsiveness for you.",
            },
            {
              label: "No lock-in",
              description: "Export clean code and host it anywhere. You own everything.",
            },
          ].map(({ label, description }) => (
            <div key={label}>
              <h3 className="text-sm font-medium text-neutral-900 dark:text-white mb-1.5">
                {label}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Try it now
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </main>
    </div>
  );
}