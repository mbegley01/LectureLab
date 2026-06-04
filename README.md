# ComputeSlides

Startup-oriented prototype: **your editor + JSON deck format + borrowed runtime**.

## Architecture split

| You own | Borrowed |
|--------|----------|
| Block model (`text`, `math`, `code`) | [reveal.js](https://revealjs.com/) — presenter, transitions, fullscreen |
| Editor UI (slides rail, block forms) | [KaTeX](https://katex.org/) — LaTeX rendering |
| Deck JSON v1 + localStorage | [Sandpack](https://sandpack.codesandbox.io/) — in-browser code sandbox |
| Present / edit modes | Vite + React |

### Why reveal.js (not Slidev as the base)?

- **Slidev** is excellent but is Markdown + Vue-first. Your product is a **visual editor** and a **JSON deck format** — fighting Slidev’s content model is slower than mapping blocks → reveal `<section>`s.
- **reveal.js** is a thin, battle-tested **runtime** you embed while you spend years on editor, collab, and cloud saves.
- Slidev’s ideas (KaTeX, live code, presenter mode) are mirrored here without locking you to their stack.

### Open source we did *not* fork (yet)

- [agentic-presentation-builder](https://github.com/neuromechanist/agentic-presentation-builder) — JSON + reveal; useful reference for schema design.
- [Open-Athena/slidev](https://github.com/Open-Athena/slidev) — visual fork of Slidev; consider studying drag/resize persistence later.

## Deck format (v1)

Stored in `localStorage` under `computeslides-deck-v1`. Example shape:

```json
{
  "version": 1,
  "title": "My deck",
  "slides": [
    {
      "id": "…",
      "title": "Slide title",
      "speakerNotes": "optional",
      "blocks": [
        { "id": "…", "type": "text", "content": "Hello" },
        { "id": "…", "type": "math", "latex": "x^2", "displayMode": true },
        {
          "id": "…",
          "type": "code",
          "language": "javascript",
          "runnable": true,
          "source": "console.log(1)"
        }
      ]
    }
  ]
}
```

## Run locally

```bash
cd slides
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

- **Editor**: edit blocks, see live reveal preview on the right.
- **Present**: fullscreen slide show; arrow keys navigate; Esc exits.

## Roadmap (suggested)

1. **Export/import** — download/upload `.deck.json`.
2. **Pyodide** — real Python execution (Sandpack is JS/HTML-first today).
3. **reveal.js Notes plugin** — speaker notes window.
4. **Canvas layout** — positions/sizes per block (YAML coords like Open-Athena/slidev, or Fabric/Konva).
5. **Collab** — Yjs + CRDT on deck JSON.
6. **Cloud** — auth, decks API, share links.

## Project layout

```
src/
  types/deck.ts       # format contract
  data/sampleDeck.ts  # demo content
  store/DeckContext.tsx
  components/
    blocks/           # KaTeX + Sandpack
    runtime/RevealDeck.tsx
    editor/           # editor + present shell
```
