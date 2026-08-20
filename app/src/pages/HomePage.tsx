import { Link } from 'react-router-dom'
import { ArrowRight, Check, FlaskConical } from 'lucide-react'
import { modules } from '../data/course'
import { allLessons, courseMinutes, lessonPath, moduleMinutes, totalLessons } from '../lib/course'
import { useProgress, streakOf } from '../lib/progress'
import { LinkButton } from '../components/ui'
import { HtmlLab } from '../components/labs/MarkupLab'
import { ThemeToggle } from '../components/layout/Shell'
import { cn } from '../lib/cn'

const DEMO_HTML = `<h1>My first web page</h1>

<p>Written in <b>Colombo</b>, rendered
   right here — no software to install.</p>

<ul>
  <li>Change a word</li>
  <li>Add a &lt;li&gt; of your own</li>
  <li>Watch the page keep up</li>
</ul>`

const PROOFS = [
  {
    title: 'PHP 8 runs in this tab',
    body: 'A complete interpreter, compiled to WebAssembly. Change a loop, press Run, and read the output PHP actually produced — warnings and fatal errors included.',
  },
  {
    title: 'A real database, seeded',
    body: 'Write mysqli code exactly as the syllabus teaches it. SELECT, INSERT, ALTER, GROUP BY and JOIN all execute against a live engine already holding the resource book’s own tables.',
  },
  {
    title: 'Forms that really submit',
    body: 'Fill in a form, press its submit button, and watch the request leave — then see precisely what landed in $_GET or $_POST on the other side.',
  },
  {
    title: 'Checked, not just read',
    body: 'Coding challenges inspect the page you built and tell you which requirement is still missing, the way a teacher marking your practical would.',
  },
]

export function HomePage() {
  const state = useProgress()
  const doneCount = allLessons.filter((r) => state.done[r.lesson.id]).length
  const streak = streakOf(state.days)
  const resume =
    allLessons.find((r) => r.lesson.id === state.lastLesson) ??
    allLessons.find((r) => !state.done[r.lesson.id]) ??
    allLessons[0]
  const started = doneCount > 0 || !!state.lastLesson

  const labCount = allLessons.reduce(
    (n, r) => n + r.lesson.blocks.filter((b) => b.b === 'lab' || b.b === 'widget').length,
    0,
  )
  const taskCount = allLessons.reduce(
    (n, r) => n + r.lesson.blocks.filter((b) => b.b === 'quiz' || b.b === 'challenge').length,
    0,
  )

  return (
    <div className="pb-24">
      <div className="flex justify-end px-5 pt-4 sm:px-8 lg:hidden">
        <ThemeToggle />
      </div>

      {/* ── Opening ─────────────────────────────────────────── */}
      <header className="mx-auto max-w-[62rem] px-5 pt-10 sm:px-8 sm:pt-20">
        <h1 className="anim-rise max-w-[18ch] font-display text-[2.7rem] leading-[1.03] font-semibold tracking-[-0.025em] text-ink sm:text-[4.1rem]">
          Learn web development
          <span className="block text-accent">by actually running it</span>
        </h1>

        <p
          className="anim-rise mt-6 max-w-[64ch] text-[1.12rem] leading-[1.6] text-ink-2 sm:text-[1.22rem]"
          style={{ animationDelay: '80ms' }}
        >
          The whole of G.C.E. A/L ICT Competency 10 — HTML, CSS, PHP and MySQL — as{' '}
          {totalLessons} lessons you can type into and run. A real PHP interpreter and a real SQL
          engine load into this page, so every example is genuinely executed, never faked.
        </p>

        <div
          className="anim-rise mt-8 flex flex-wrap items-center gap-3"
          style={{ animationDelay: '150ms' }}
        >
          <LinkButton to={lessonPath(resume)} variant="primary" className="gap-2 px-5">
            {started ? 'Continue where you left off' : 'Start the course'}
            <ArrowRight className="size-4" strokeWidth={2.2} />
          </LinkButton>
          <LinkButton to="/playground" variant="secondary" className="gap-2">
            <FlaskConical className="size-4" strokeWidth={2} />
            Open the playground
          </LinkButton>
        </div>

        <dl
          className="anim-rise mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-rule pt-5 font-mono text-[0.78rem] sm:flex sm:justify-between"
          style={{ animationDelay: '220ms' }}
        >
          <Stat k="lessons" v={String(totalLessons)} />
          <Stat k="hands-on labs" v={String(labCount)} />
          <Stat k="quizzes & challenges" v={String(taskCount)} />
          <Stat k="reading time" v={`${Math.round(courseMinutes() / 60)} h`} />
          {started && <Stat k="you have finished" v={`${doneCount}/${totalLessons}`} accent />}
          {streak > 1 && <Stat k="day streak" v={String(streak)} accent />}
        </dl>
      </header>

      {/* ── Proof, not a promise ────────────────────────────── */}
      <section className="mx-auto mt-16 max-w-[62rem] px-5 sm:mt-24 sm:px-8">
        <h2 className="max-w-[20ch] font-display text-[1.65rem] leading-tight font-semibold text-ink sm:text-[2.1rem]">
          No XAMPP. No account. No “imagine the output”.
        </h2>
        <p className="mt-3 max-w-[64ch] text-[1.02rem] leading-relaxed text-ink-2">
          Change the markup below. The page beside it is a real browser rendering, updating as you
          type — and that is the smallest of the tools waiting inside the course.
        </p>

        <div className="mt-6">
          <HtmlLab
            title="Go on — edit this"
            html={DEMO_HTML}
            height={210}
          />
        </div>

        <dl className="mt-2 divide-y divide-rule border-y border-rule">
          {PROOFS.map((p) => (
            <div key={p.title} className="grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[14rem_minmax(0,1fr)]">
              <dt className="flex items-baseline gap-2.5 font-display text-[1.05rem] font-semibold text-ink">
                <span className="mt-[0.35em] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                {p.title}
              </dt>
              <dd className="text-[0.95rem] leading-relaxed text-ink-2">{p.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── The syllabus ────────────────────────────────────── */}
      <section className="mx-auto mt-16 max-w-[62rem] px-5 sm:mt-24 sm:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-3">
          <h2 className="font-display text-[1.65rem] font-semibold text-ink sm:text-[2rem]">
            The eight competency levels
          </h2>
          <p className="font-mono text-[0.74rem] text-ink-3">
            10.1 — 10.8 · in the order the syllabus teaches them
          </p>
        </div>

        <ol className="mt-2">
          {modules.map((m) => {
            const done = m.lessons.filter((l) => state.done[l.id]).length
            const pct = Math.round((done / m.lessons.length) * 100)
            const complete = done === m.lessons.length
            return (
              <li key={m.id} className="border-b border-rule">
                <Link
                  to={`/m/${m.slug}`}
                  className="group grid gap-x-5 gap-y-2 py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto]"
                >
                  <span
                    className={cn(
                      'grid size-11 place-items-center rounded-xl font-mono text-[0.86rem] font-semibold tabular-nums transition-colors',
                      complete
                        ? 'bg-ok text-white'
                        : done > 0
                          ? 'bg-accent-tint text-accent'
                          : 'bg-surface-sunk text-ink-3 group-hover:bg-brand group-hover:text-brand-on',
                    )}
                  >
                    {complete ? <Check className="size-5" strokeWidth={3} /> : m.competency}
                  </span>

                  <span className="min-w-0">
                    <span className="block font-display text-[1.26rem] leading-snug font-semibold text-ink transition-colors group-hover:text-accent">
                      {m.title}
                    </span>
                    <span className="mt-1 block max-w-[64ch] text-[0.95rem] leading-relaxed text-ink-2">
                      {m.promise}
                    </span>
                    <span className="mt-2.5 flex items-center gap-3">
                      <span className="h-1.5 w-28 overflow-hidden rounded-full bg-surface-sunk">
                        <span
                          className="block h-full rounded-full bg-accent transition-[width] duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </span>
                      <span className="font-mono text-[0.72rem] text-ink-3 tabular-nums">
                        {done}/{m.lessons.length} lessons · {moduleMinutes(m)} min
                      </span>
                    </span>
                  </span>

                  <ArrowRight
                    className="hidden size-5 self-center text-ink-3 transition-all group-hover:translate-x-1 group-hover:text-accent sm:block"
                    strokeWidth={1.8}
                  />
                </Link>
              </li>
            )
          })}
        </ol>
      </section>

      <section className="mx-auto mt-16 max-w-[62rem] px-5 sm:px-8">
        <div className="rounded-2xl border border-rule bg-surface px-6 py-7">
          <h2 className="font-display text-[1.3rem] font-semibold text-ink">
            Your progress stays on this device
          </h2>
          <p className="mt-2 max-w-[64ch] text-[0.95rem] leading-relaxed text-ink-2">
            There is no sign-up, because there is nothing to sign up to. Completed lessons, quiz
            scores and solved challenges are saved in this browser, and you can export them to a
            file if you switch computers.
          </p>
          <LinkButton to="/progress" variant="secondary" className="mt-4 gap-2">
            See your progress
            <ArrowRight className="size-4" strokeWidth={2.2} />
          </LinkButton>
        </div>
      </section>
    </div>
  )
}

function Stat({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div>
      <dt className="text-[0.7rem] tracking-[0.1em] text-ink-3 uppercase">{k}</dt>
      <dd className={cn('mt-0.5 text-[1.1rem] tabular-nums', accent ? 'text-accent' : 'text-ink')}>
        {v}
      </dd>
    </div>
  )
}
