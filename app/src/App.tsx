import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Shell } from './components/layout/Shell'
import { HomePage } from './pages/HomePage'
import { ModulePage } from './pages/ModulePage'
import { LessonPage } from './pages/LessonPage'
import { PlaygroundPage } from './pages/PlaygroundPage'
import { ProgressPage } from './pages/ProgressPage'
import { ReferencePage } from './pages/ReferencePage'
import { PracticePage } from './pages/PracticePage'

/* Hash routing on purpose: the built site then works from a plain folder,
   a school intranet, GitHub Pages or a USB stick with no server config. */
const router = createHashRouter([
  {
    path: '/',
    element: <Shell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'm/:moduleSlug', element: <ModulePage /> },
      { path: 'm/:moduleSlug/:lessonSlug', element: <LessonPage /> },
      { path: 'playground', element: <PlaygroundPage /> },
      { path: 'reference', element: <ReferencePage /> },
      { path: 'practice', element: <PracticePage /> },
      { path: 'progress', element: <ProgressPage /> },
      { path: '*', element: <HomePage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
