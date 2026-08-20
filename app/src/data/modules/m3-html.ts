import type { Module } from '../../types/content'
import { m3LessonsA } from './m3-html-a'
import { m3LessonsB } from './m3-html-b'

export const m3: Module = {
  id: 'm3',
  slug: 'html',
  competency: '10.3',
  index: 3,
  title: 'HTML Foundations',
  promise:
    'Write a complete, correctly structured HTML page from memory — headings, formatted text, colour, lists and tables — and know which tags are current and which are deprecated.',
  blurb:
    'The largest competency level, and the one everything else stands on. Nine lessons take you from an empty file to a page that uses every structural tag in the syllabus, with something to run in each one.',
  lang: 'html',
  lessons: [...m3LessonsA, ...m3LessonsB],
}
