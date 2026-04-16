import Navbar from "../components/Navbar";

const examples = [
  {
    title: "SaaS Landing Page",
    description: "A clean product landing page with pricing and feature sections.",
    prompt: "Build a SaaS landing page for a project management tool",
    tag: "Landing",
    bg: "bg-violet-50 dark:bg-violet-950",
    accent: "text-violet-600 dark:text-violet-400",
    badge: "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300",
  },
  {
    title: "Portfolio Site",
    description: "A minimal personal portfolio with project cards and contact form.",
    prompt: "Make a portfolio site for a frontend developer",
    tag: "Portfolio",
    bg: "bg-sky-50 dark:bg-sky-950",
    accent: "text-sky-600 dark:text-sky-400",
    badge: "bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300",
  },
  {
    title: "Restaurant Website",
    description: "A warm, inviting site with menu, hours, and a reservation CTA.",
    prompt: "Design a website for an Italian restaurant in Rome",
    tag: "Business",
    bg: "bg-amber-50 dark:bg-amber-950",
    accent: "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  },
  {
    title: "Blog",
    description: "A readable editorial blog with tag filtering and article cards.",
    prompt: "Create a blog site for a travel writer",
    tag: "Blog",
    bg: "bg-emerald-50 dark:bg-emerald-950",
    accent: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
  },
  {
    title: "Agency Site",
    description: "A bold, full-screen agency site with case studies and team section.",
    prompt: "Build a creative agency website with a dark aesthetic",
    tag: "Agency",
    bg: "bg-neutral-100 dark:bg-neutral-800",
    accent: "text-neutral-700 dark:text-neutral-300",
    badge: "bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200",
  },
  {
    title: "Event Page",
    description: "A countdown-driven event page with speakers and ticket section.",
    prompt: "Make an event landing page for a design conference",
    tag: "Event",
    bg: "bg-rose-50 dark:bg-rose-950",
    accent: "text-rose-600 dark:text-rose-400",
    badge: "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300",
  },
];

export default function Examples() {
  return (
    <div className="min-h-screen text-neutral-900 dark:text-white">

      <main className="max-w-6xl mx-auto py-16">

        {/* Header */}
        <div className="mb-12 max-w-xl">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
            Examples
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-base leading-relaxed">
            Browse websites built with Mask. Click any card to try the prompt yourself.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {examples.map((ex) => (
            <a
              key={ex.title}
            //   href={`/build?prompt=${encodeURIComponent(ex.prompt)}`}
              className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
            >
              {/* Preview area */}
              <div className={`h-40 ${ex.bg} flex items-center justify-center`}>
                <span className={`text-sm font-mono opacity-60 ${ex.accent} px-4 text-center leading-relaxed`}>
                  "{ex.prompt}"
                </span>
              </div>

              {/* Card body */}
              <div className="p-4 bg-white dark:bg-neutral-900">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h2 className="text-sm font-medium text-neutral-900 dark:text-white">
                    {ex.title}
                  </h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${ex.badge}`}>
                    {ex.tag}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {ex.description}
                </p>

                <div className="mt-3 flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                  Try this prompt
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4">
            Don't see what you need? Just describe it.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Start building
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </main>
    </div>
  );
}