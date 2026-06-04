import {
  newCodeBlock,
  newMathBlock,
  newTextBlock,
  useDeck,
} from '../../store/DeckContext'
import { RevealDeck } from '../runtime/RevealDeck'
import { BlockEditor } from './BlockEditor'

interface EditorViewProps {
  onPresent: () => void
}

export function EditorView({ onPresent }: EditorViewProps) {
  const {
    deck,
    selectedSlide,
    selectSlide,
    updateDeckMeta,
    updateSlide,
    addSlide,
    removeSlide,
    addBlock,
    resetToSample,
  } = useDeck()

  return (
    <div className="app-shell editor-shell">
      <header className="top-bar">
        <input
          className="deck-title-input"
          value={deck.title}
          onChange={(e) => updateDeckMeta({ title: e.target.value })}
          aria-label="Deck title"
        />
        <div className="top-bar-actions">
          <button type="button" className="btn-ghost" onClick={resetToSample}>
            Reset demo
          </button>
          <button type="button" className="btn-primary" onClick={onPresent}>
            Present
          </button>
        </div>
      </header>

      <div className="editor-grid">
        <aside className="slide-rail">
          <div className="rail-header">
            <span>Slides</span>
            <button type="button" className="btn-ghost" onClick={addSlide}>
              + Add
            </button>
          </div>
          <ul className="slide-list">
            {deck.slides.map((slide, index) => (
              <li key={slide.id}>
                <button
                  type="button"
                  className={
                    slide.id === selectedSlide.id
                      ? 'slide-thumb active'
                      : 'slide-thumb'
                  }
                  onClick={() => selectSlide(slide.id)}
                >
                  <span className="slide-index">{index + 1}</span>
                  <span className="slide-thumb-title">{slide.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="block-panel">
          <div className="block-panel-header">
            <input
              value={selectedSlide.title}
              onChange={(e) =>
                updateSlide(selectedSlide.id, { title: e.target.value })
              }
              className="slide-title-input"
              aria-label="Slide title"
            />
            <button
              type="button"
              className="btn-ghost btn-danger"
              onClick={() => removeSlide(selectedSlide.id)}
              disabled={deck.slides.length <= 1}
            >
              Delete slide
            </button>
          </div>

          <label className="field-label">
            Speaker notes
            <textarea
              value={selectedSlide.speakerNotes ?? ''}
              onChange={(e) =>
                updateSlide(selectedSlide.id, {
                  speakerNotes: e.target.value || undefined,
                })
              }
              rows={2}
              placeholder="Private notes for presenter mode (reveal.js Notes plugin later)"
            />
          </label>

          <div className="add-block-row">
            <span>Add block</span>
            <button
              type="button"
              onClick={() => addBlock(selectedSlide.id, newTextBlock())}
            >
              Text
            </button>
            <button
              type="button"
              onClick={() => addBlock(selectedSlide.id, newMathBlock())}
            >
              Math
            </button>
            <button
              type="button"
              onClick={() => addBlock(selectedSlide.id, newCodeBlock())}
            >
              Code
            </button>
          </div>

          {selectedSlide.blocks.map((block) => (
            <BlockEditor
              key={block.id}
              slideId={selectedSlide.id}
              block={block}
            />
          ))}
        </main>

        <aside className="preview-panel">
          <p className="preview-label">Live preview (reveal.js)</p>
          <div className="preview-frame">
            <RevealDeck deck={deck} mode="edit" />
          </div>
        </aside>
      </div>
    </div>
  )
}
