import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'
const KEY = 'wdsp.theme'
const listeners = new Set<() => void>()

function current(): Theme {
  return (document.documentElement.dataset.theme as Theme) ?? 'light'
}

export const theme = {
  get: current,
  subscribe(l: () => void) {
    listeners.add(l)
    return () => {
      listeners.delete(l)
    }
  },
  set(next: Theme) {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* ignore */
    }
    listeners.forEach((l) => l())
  },
  toggle() {
    theme.set(current() === 'dark' ? 'light' : 'dark')
  },
}

export function useTheme(): Theme {
  return useSyncExternalStore(theme.subscribe, theme.get, () => 'light' as Theme)
}
