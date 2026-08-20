import type { Lesson, Module } from '../types/content'
import { modules } from '../data/course'

export interface LessonRef {
  module: Module
  lesson: Lesson
  /** Position across the whole course, 1-based. */
  n: number
}

export const allLessons: LessonRef[] = modules.flatMap((module) =>
  module.lessons.map((lesson) => ({ module, lesson, n: 0 })),
)
allLessons.forEach((r, i) => (r.n = i + 1))

export const totalLessons = allLessons.length

export const lessonById = new Map(allLessons.map((r) => [r.lesson.id, r]))

export function findLesson(moduleSlug: string, lessonSlug: string): LessonRef | undefined {
  return allLessons.find((r) => r.module.slug === moduleSlug && r.lesson.slug === lessonSlug)
}

export function findModule(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug)
}

export function neighbours(ref: LessonRef) {
  const i = ref.n - 1
  return { prev: allLessons[i - 1], next: allLessons[i + 1] }
}

export function lessonPath(ref: LessonRef | { module: Module; lesson: Lesson }) {
  return `/m/${ref.module.slug}/${ref.lesson.slug}`
}

export function moduleMinutes(m: Module) {
  return m.lessons.reduce((sum, l) => sum + l.minutes, 0)
}

export function courseMinutes() {
  return modules.reduce((sum, m) => sum + moduleMinutes(m), 0)
}

/** Every quiz and challenge id in a lesson, so progress can be counted. */
export function lessonTasks(lesson: Lesson) {
  const quizzes: string[] = []
  const challenges: string[] = []
  lesson.blocks.forEach((b, i) => {
    if (b.b === 'quiz') quizzes.push(`${lesson.id}:quiz:${i}`)
    if (b.b === 'challenge') challenges.push(b.spec.id)
  })
  return { quizzes, challenges }
}
