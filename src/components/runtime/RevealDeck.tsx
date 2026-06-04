import { useEffect, useRef } from 'react'
import Reveal from 'reveal.js'
import 'reveal.js/reveal.css'
import 'reveal.js/theme/black.css'
import type { Deck } from '../../types/deck'
import { BlockView } from '../blocks/BlockView'

interface RevealDeckProps {
  deck: Deck
  mode: 'edit' | 'present'
}

export function RevealDeck({ deck, mode }: RevealDeckProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<InstanceType<typeof Reveal> | null>(null)

  useEffect(() => {
    if (!rootRef.current) return

    const reveal = new Reveal(rootRef.current, {
      hash: mode === 'present',
      controls: true,
      progress: true,
      center: true,
      transition: 'slide',
    })

    reveal.initialize().then(() => {
      revealRef.current = reveal
    })

    return () => {
      reveal.destroy()
      revealRef.current = null
    }
  }, [mode])

  useEffect(() => {
    revealRef.current?.sync()
    revealRef.current?.layout()
  }, [deck])

  return (
    <div
      ref={rootRef}
      className={`reveal ${mode === 'present' ? 'reveal-present' : 'reveal-preview'}`}
    >
      <div className="slides">
        {deck.slides.map((slide) => (
          <section key={slide.id} data-transition="slide">
            {slide.blocks.map((block) => (
              <div key={block.id} className="deck-block">
                <BlockView block={block} mode={mode} />
              </div>
            ))}
            {slide.speakerNotes && (
              <aside className="notes">{slide.speakerNotes}</aside>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
