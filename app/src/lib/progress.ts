import { useSyncExternalStore } from 'react'

/* Progress lives entirely in the browser. No account, no server,
   nothing to lose a password to. */

const KEY = 'wdsp.progress.v1'

export interface ProgressState {
  /** lessonId -> completion timestamp */
  done: Record<string, number>
  /** quizId -> { score, total, at } */
  quiz: Record<string, { score: number; total: number; at: number }>
  /** challengeId -> timestamp solved */
  solved: Record<string, number>
  /** lessonId -> last scroll ratio, so "continue" lands where they left */
  seen: Record<string, number>
  /** ISO date strings the student opened a lesson on. */
  days: string[]
  lastLesson?: string
}

const empty: ProgressState = { done: {}, quiz: {}, solved: {}, seen: {}, days: [] }

let state: ProgressState = load()
const listeners = new Set<() => void>()

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    return { ...empty, ...parsed }
  } catch {
    return empty
  }
}

function commit(next: ProgressState) {
  state = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* private mode, quota — progress is a nicety, never a blocker */
  }
  listeners.forEach((l) => l())
}

export const progress = {
  get: () => state,
  subscribe(l: () => void) {
    listeners.add(l)
    return () => {
      listeners.delete(l)
    }
  },
  markDone(lessonId: string) {
    if (state.done[lessonId]) return
    commit({ ...state, done: { ...state.done, [lessonId]: Date.now() } })
  },
  clearDone(lessonId: string) {
    const done = { ...state.done }
    delete done[lessonId]
    commit({ ...state, done })
  },
  recordQuiz(id: string, score: number, total: number) {
    const prev = state.quiz[id]
    if (prev && prev.score >= score) return
    commit({ ...state, quiz: { ...state.quiz, [id]: { score, total, at: Date.now() } } })
  },
  markSolved(id: string) {
    if (state.solved[id]) return
    commit({ ...state, solved: { ...state.solved, [id]: Date.now() } })
  },
  visit(lessonId: string) {
    const today = new Date().toISOString().slice(0, 10)
    const days = state.days.includes(today) ? state.days : [...state.days, today].slice(-400)
    if (state.lastLesson === lessonId && days.length === state.days.length) return
    commit({ ...state, days, lastLesson: lessonId })
  },
  reset() {
    commit(empty)
  },
  exportJSON() {
    return JSON.stringify(state, null, 2)
  },
  importJSON(text: string) {
    const parsed = JSON.parse(text) as Partial<ProgressState>
    commit({ ...empty, ...parsed })
  },
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(progress.subscribe, progress.get, () => empty)
}

/** Consecutive days ending today (or yesterday, so a late night still counts). */
export function streakOf(days: string[]): number {
  if (!days.length) return 0
  const set = new Set(days)
  const d = new Date()
  let streak = 0
  if (!set.has(iso(d))) {
    d.setDate(d.getDate() - 1)
    if (!set.has(iso(d))) return 0
  }
  while (set.has(iso(d))) {
    streak++
    d.setDate(d.getDate() - 1)
  }
  return streak
}

function iso(d: Date) {
  return d.toISOString().slice(0, 10)
}
