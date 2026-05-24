import { CheckCircle2 } from "lucide-react";

export default function AuthLayout({ children, eyebrow, title, subtitle }) {
  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <section className="hidden bg-neutral-950 p-8 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-2xl font-semibold">TaskFlow</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">
            A focused workspace for projects, tasks, and delivery clarity.
          </p>
        </div>

        <div className="mx-auto w-full max-w-md rounded-xl border border-white/10 bg-white/[0.04] p-5 shadow-soft">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-sm text-neutral-400">Sprint board</p>
              <p className="mt-1 text-lg font-semibold">Launch system</p>
            </div>
            <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-300">
              78%
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {["Define scope", "Build dashboard", "QA responsive states"].map(
              (item, index) => (
                <div
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3"
                  key={item}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-neutral-950">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item}</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-white"
                        style={{ width: `${70 + index * 10}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <p className="max-w-sm text-sm leading-6 text-neutral-400">
          Premium workflows should feel quiet, structured, and fast.
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-8 text-center lg:text-left">
            <p className="text-sm font-medium text-neutral-500">{eyebrow}</p>
            <h1 className="mt-3 text-3xl font-semibold text-neutral-950">
              {title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              {subtitle}
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft sm:p-8">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
