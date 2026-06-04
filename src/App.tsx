import { useCallback, useEffect, useState } from 'react'
import { DeckProvider } from './store/DeckContext'
import { EditorView } from './components/editor/EditorView'
import { PresentView } from './components/editor/PresentView'

type AppMode = 'editor' | 'present'

function AppInner() {
  const [mode, setMode] = useState<AppMode>('editor')

  const enterPresent = useCallback(() => {
    setMode('present')
    document.documentElement.requestFullscreen?.().catch(() => {})
  }, [])

  const exitPresent = useCallback(() => {
    setMode('editor')
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mode === 'present') exitPresent()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mode, exitPresent])

  if (mode === 'present') {
    return <PresentView onExit={exitPresent} />
  }

  return <EditorView onPresent={enterPresent} />
}

export default function App() {
  return (
    <DeckProvider>
      <AppInner />
    </DeckProvider>
  )
}
