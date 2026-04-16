
const features = [
  "Unlimited website generations",
  "Responsive layouts out of the box",
  "Dark mode support",
  "Export to clean HTML & CSS",
  "Custom domain support",
  "Priority generation speed",
  "Access to all templates",
  "Community support",
];

export default function Pricing() {
  return (
    <div className="min-h-screen text-neutral-900 dark:text-white">

      <main className="max-w-6xl mx-auto py-16">

        {/* Header */}
        <div className="mb-14 max-w-lg">
          <span className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            Pricing
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-2 mb-3">
            Free, forever.
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-base leading-relaxed">
            No credit card. No trial period. No catch. Mask is completely free while we're in beta.
          </p>
        </div>

        {/* Plan card + features side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Plan card */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-medium text-neutral-900 dark:text-white">Free plan</h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">Everything included, no limits.</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 font-medium">
                  Current plan
                </span>
              </div>

              <div className="flex items-end gap-1 mb-8">
                <span className="text-5xl font-semibold tracking-tight">$0</span>
                <span className="text-neutral-400 dark:text-neutral-500 text-sm mb-2">/ month</span>
              </div>

              <a
                href="/"
                className="w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:opacity-80 transition-opacity"
              >
                Start building
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            <div className="border-t border-neutral-100 dark:border-neutral-800 px-6 sm:px-8 py-5">
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                Paid plans may be introduced in the future. Current users will always keep their free access.
              </p>
            </div>
          </div>

          {/* Features list */}
          <div>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-5 uppercase tracking-widest text-xs">
              What's included
            </p>
            <ul className="space-y-3.5">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 5L4 7L8 3" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-xl">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6">
            FAQ
          </p>
          <div className="space-y-8">
            {[
              {
                q: "Will it always be free?",
                a: "While we're in beta, yes. We may introduce paid plans down the road for advanced features, but anyone using Mask today will keep free access.",
              },
              {
                q: "Do I need to create an account?",
                a: "Nope. Just describe the website you want and Mask builds it — no sign-up required.",
              },
              {
                q: "Can I use the generated sites commercially?",
                a: "Yes. Everything Mask generates is yours to use however you like.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <h3 className="text-sm font-medium text-neutral-900 dark:text-white mb-1.5">{q}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}