import katex from 'katex'
import 'katex/dist/katex.min.css'
import { useEffect, useRef } from 'react'

interface MathViewProps {
  latex: string
  displayMode: boolean
}

export function MathView({ latex, displayMode }: MathViewProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return
    try {
      katex.render(latex, ref.current, {
        displayMode,
        throwOnError: false,
      })
    } catch {
      ref.current.textContent = latex
    }
  }, [latex, displayMode])

  return (
    <span
      ref={ref}
      className={displayMode ? 'math-display' : 'math-inline'}
    />
  )
}
