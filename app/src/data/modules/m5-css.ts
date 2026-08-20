import type { Module } from '../../types/content'
import { m5LessonsA } from './m5-css-a'
import { m5LessonsB } from './m5-css-b'
import { m5LessonsC } from './m5-css-c'

export const m5: Module = {
  id: 'm5',
  slug: 'css',
  competency: '10.5',
  index: 5,
  title: 'Styling with CSS',
  promise:
    'Write a stylesheet that controls typography, colour, spacing, borders and tables across a whole website — and know which rule wins when two of them disagree.',
  blurb:
    'Eleven lessons that take styling out of the markup and into its own file. Selectors, the cascade, the box model, units, and a project that restyles the site you built in Module 4.',
  lang: 'css',
  lessons: [...m5LessonsA, ...m5LessonsB, ...m5LessonsC],
}
