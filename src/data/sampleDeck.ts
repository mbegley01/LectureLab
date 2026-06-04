import type { Deck } from '../types/deck'
import { DECK_VERSION } from '../types/deck'

export const sampleDeck: Deck = {
  version: DECK_VERSION,
  title: 'Hello, ComputeSlides',
  slides: [
    {
      id: 'slide-welcome',
      title: 'Welcome',
      speakerNotes: 'Introduce the product wedge: code and math as first-class blocks.',
      blocks: [
        {
          id: 'b-title',
          type: 'text',
          content: 'ComputeSlides',
        },
        {
          id: 'b-sub',
          type: 'text',
          content: 'Presentations where code and LaTeX are core — not plugins.',
        },
      ],
    },
    {
      id: 'slide-math',
      title: 'LaTeX with KaTeX',
      blocks: [
        {
          id: 'b-math-h',
          type: 'text',
          content: 'Euler’s identity',
        },
        {
          id: 'b-math',
          type: 'math',
          latex: 'e^{i\\pi} + 1 = 0',
          displayMode: true,
        },
        {
          id: 'b-math-inline',
          type: 'math',
          latex: '\\int_0^1 x^2 \\, dx = \\frac{1}{3}',
          displayMode: false,
        },
      ],
    },
    {
      id: 'slide-code',
      title: 'Runnable code',
      speakerNotes: 'Run the slide, then press Run in the sandbox or edit live in the editor.',
      blocks: [
        {
          id: 'b-code-h',
          type: 'text',
          content: 'Fibonacci in the browser (Sandpack sandbox)',
        },
        {
          id: 'b-code',
          type: 'code',
          language: 'javascript',
          runnable: true,
          source: `function fib(n) {
  let a = 0, b = 1
  for (let i = 0; i < n; i++) [a, b] = [b, a + b]
  return a
}

console.log('fib(10) =', fib(10))
document.body.innerHTML = '<pre>fib(10) = ' + fib(10) + '</pre>'
`,
        },
      ],
    },
  ],
}
