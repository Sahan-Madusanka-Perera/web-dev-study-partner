import type { Module } from '../../types/content'
import { m7LessonsA } from './m7-php-a'
import { m7LessonsB } from './m7-php-b'
import { m7LessonsC } from './m7-php-c'
import { m7LessonsD } from './m7-php-d'

export const m7: Module = {
  id: 'm7',
  slug: 'php-mysql',
  competency: '10.7',
  index: 7,
  title: 'Dynamic Web: PHP & MySQL',
  promise:
    'Write PHP that reads a form, decides what to do with it, and stores or retrieves the answer from a MySQL database — the whole of a simple web information system.',
  blurb:
    'The largest and most practical competency level. Eighteen lessons take you from your first echo to a working form that writes to a real database — with a genuine PHP 8 interpreter and SQL engine running in this tab.',
  lang: 'php',
  lessons: [...m7LessonsA, ...m7LessonsB, ...m7LessonsC, ...m7LessonsD],
}
