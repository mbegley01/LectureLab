/** Deck file format — versioned JSON you own; renderer maps blocks → reveal.js slides */

export const DECK_VERSION = 1 as const

export type BlockType = 'text' | 'math' | 'code'

export interface TextBlock {
  id: string
  type: 'text'
  /** Plain text for now; markdown can layer on later */
  content: string
}

export interface MathBlock {
  id: string
  type: 'math'
  latex: string
  displayMode: boolean
}

export interface CodeBlock {
  id: string
  type: 'code'
  language: 'javascript' | 'typescript' | 'python' | 'html'
  source: string
  /** When true, Sandpack runs the snippet in present mode */
  runnable: boolean
}

export type Block = TextBlock | MathBlock | CodeBlock

export interface Slide {
  id: string
  title: string
  blocks: Block[]
  speakerNotes?: string
}

export interface Deck {
  version: typeof DECK_VERSION
  title: string
  slides: Slide[]
}

export function createId(): string {
  return crypto.randomUUID()
}

export function createEmptySlide(): Slide {
  return {
    id: createId(),
    title: 'Untitled slide',
    blocks: [
      {
        id: createId(),
        type: 'text',
        content: 'Click to edit…',
      },
    ],
  }
}
