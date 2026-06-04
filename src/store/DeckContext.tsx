import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { sampleDeck } from '../data/sampleDeck'
import type { Block, Deck, Slide } from '../types/deck'
import { createEmptySlide, createId } from '../types/deck'

const STORAGE_KEY = 'computeslides-deck-v1'

function loadDeck(): Deck {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Deck
  } catch {
    /* ignore corrupt storage */
  }
  return sampleDeck
}

interface DeckContextValue {
  deck: Deck
  selectedSlideId: string
  selectedSlide: Slide
  selectSlide: (id: string) => void
  updateDeckMeta: (patch: Partial<Pick<Deck, 'title'>>) => void
  updateSlide: (slideId: string, patch: Partial<Slide>) => void
  updateBlock: (slideId: string, blockId: string, patch: Partial<Block>) => void
  addSlide: () => void
  removeSlide: (slideId: string) => void
  addBlock: (slideId: string, block: Block) => void
  removeBlock: (slideId: string, blockId: string) => void
  resetToSample: () => void
}

const DeckContext = createContext<DeckContextValue | null>(null)

function persist(deck: Deck) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deck))
}

export function DeckProvider({ children }: { children: ReactNode }) {
  const [deck, setDeck] = useState<Deck>(loadDeck)
  const [selectedSlideId, setSelectedSlideId] = useState(
    () => loadDeck().slides[0]?.id ?? '',
  )

  const selectedSlide = useMemo(
    () => deck.slides.find((s) => s.id === selectedSlideId) ?? deck.slides[0],
    [deck, selectedSlideId],
  )

  const commit = useCallback((next: Deck) => {
    setDeck(next)
    persist(next)
  }, [])

  const selectSlide = useCallback((id: string) => setSelectedSlideId(id), [])

  const updateDeckMeta = useCallback(
    (patch: Partial<Pick<Deck, 'title'>>) => {
      commit({ ...deck, ...patch })
    },
    [deck, commit],
  )

  const updateSlide = useCallback(
    (slideId: string, patch: Partial<Slide>) => {
      commit({
        ...deck,
        slides: deck.slides.map((s) =>
          s.id === slideId ? { ...s, ...patch } : s,
        ),
      })
    },
    [deck, commit],
  )

  const updateBlock = useCallback(
    (slideId: string, blockId: string, patch: Partial<Block>) => {
      commit({
        ...deck,
        slides: deck.slides.map((s) => {
          if (s.id !== slideId) return s
          return {
            ...s,
            blocks: s.blocks.map((b) =>
              b.id === blockId ? ({ ...b, ...patch } as Block) : b,
            ),
          }
        }),
      })
    },
    [deck, commit],
  )

  const addSlide = useCallback(() => {
    const slide = createEmptySlide()
    commit({ ...deck, slides: [...deck.slides, slide] })
    setSelectedSlideId(slide.id)
  }, [deck, commit])

  const removeSlide = useCallback(
    (slideId: string) => {
      if (deck.slides.length <= 1) return
      const slides = deck.slides.filter((s) => s.id !== slideId)
      commit({ ...deck, slides })
      if (selectedSlideId === slideId) {
        setSelectedSlideId(slides[0].id)
      }
    },
    [deck, commit, selectedSlideId],
  )

  const addBlock = useCallback(
    (slideId: string, block: Block) => {
      commit({
        ...deck,
        slides: deck.slides.map((s) =>
          s.id === slideId ? { ...s, blocks: [...s.blocks, block] } : s,
        ),
      })
    },
    [deck, commit],
  )

  const removeBlock = useCallback(
    (slideId: string, blockId: string) => {
      commit({
        ...deck,
        slides: deck.slides.map((s) => {
          if (s.id !== slideId) return s
          const blocks = s.blocks.filter((b) => b.id !== blockId)
          return { ...s, blocks: blocks.length ? blocks : s.blocks }
        }),
      })
    },
    [deck, commit],
  )

  const resetToSample = useCallback(() => {
    commit(sampleDeck)
    setSelectedSlideId(sampleDeck.slides[0].id)
  }, [commit])

  const value = useMemo<DeckContextValue>(
    () => ({
      deck,
      selectedSlideId: selectedSlide.id,
      selectedSlide,
      selectSlide,
      updateDeckMeta,
      updateSlide,
      updateBlock,
      addSlide,
      removeSlide,
      addBlock,
      removeBlock,
      resetToSample,
    }),
    [
      deck,
      selectedSlide,
      selectSlide,
      updateDeckMeta,
      updateSlide,
      updateBlock,
      addSlide,
      removeSlide,
      addBlock,
      removeBlock,
      resetToSample,
    ],
  )

  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>
}

export function useDeck(): DeckContextValue {
  const ctx = useContext(DeckContext)
  if (!ctx) throw new Error('useDeck must be used within DeckProvider')
  return ctx
}

export function newTextBlock(): Block {
  return { id: createId(), type: 'text', content: '' }
}

export function newMathBlock(): Block {
  return { id: createId(), type: 'math', latex: 'x^2', displayMode: true }
}

export function newCodeBlock(): Block {
  return {
    id: createId(),
    type: 'code',
    language: 'javascript',
    source: 'console.log("hello")\n',
    runnable: true,
  }
}
