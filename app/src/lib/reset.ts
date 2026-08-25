import { useCallback, useState } from 'react'

/**
 * A remount key for the surfaces a lab's Reset button has to restore.
 *
 * Two things in a lab drift out of React's reach once the student touches
 * them, and re-rendering alone will not pull either back:
 *
 * - The editor is controlled through CodeMirror's `value` prop, but the
 *   wrapper defers external changes while the student is mid-keystroke.
 *   Press Reset within a second of typing and the change is dropped: state
 *   holds the starting code while the editor still shows the edit, and since
 *   the state is already correct nothing re-syncs them afterwards.
 * - The preview is an iframe. Follow a link inside it and it navigates away
 *   from its `srcDoc`; the `srcDoc` string never changed, so React leaves the
 *   attribute alone and the pane stays on the linked page for good.
 *
 * Bumping the key rebuilds both outright, which is what Reset means anyway.
 */
export function useResetKey() {
  const [resetKey, setResetKey] = useState(0)
  return [resetKey, useCallback(() => setResetKey((n) => n + 1), [])] as const
}
