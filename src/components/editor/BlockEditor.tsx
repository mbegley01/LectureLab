import type { Block, CodeBlock, MathBlock, TextBlock } from '../../types/deck'
import { useDeck } from '../../store/DeckContext'

interface BlockEditorProps {
  slideId: string
  block: Block
}

export function BlockEditor({ slideId, block }: BlockEditorProps) {
  const { updateBlock, removeBlock } = useDeck()

  const header = (
    <div className="block-editor-header">
      <span className="block-type-label">{block.type}</span>
      <button
        type="button"
        className="btn-ghost btn-danger"
        onClick={() => removeBlock(slideId, block.id)}
        title="Remove block"
      >
        Remove
      </button>
    </div>
  )

  switch (block.type) {
    case 'text': {
      const b = block as TextBlock
      return (
        <div className="block-editor">
          {header}
          <textarea
            value={b.content}
            onChange={(e) =>
              updateBlock(slideId, block.id, { content: e.target.value })
            }
            rows={3}
            placeholder="Slide text…"
          />
        </div>
      )
    }
    case 'math': {
      const b = block as MathBlock
      return (
        <div className="block-editor">
          {header}
          <textarea
            value={b.latex}
            onChange={(e) =>
              updateBlock(slideId, block.id, { latex: e.target.value })
            }
            rows={2}
            placeholder="LaTeX, e.g. \\frac{a}{b}"
            className="font-mono"
          />
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={b.displayMode}
              onChange={(e) =>
                updateBlock(slideId, block.id, {
                  displayMode: e.target.checked,
                })
              }
            />
            Display mode (block equation)
          </label>
        </div>
      )
    }
    case 'code': {
      const b = block as CodeBlock
      return (
        <div className="block-editor">
          {header}
          <div className="block-editor-row">
            <label>
              Language
              <select
                value={b.language}
                onChange={(e) =>
                  updateBlock(slideId, block.id, {
                    language: e.target.value as CodeBlock['language'],
                  })
                }
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="html">HTML</option>
                <option value="python">Python (static for now)</option>
              </select>
            </label>
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={b.runnable}
                onChange={(e) =>
                  updateBlock(slideId, block.id, { runnable: e.target.checked })
                }
              />
              Runnable in sandbox
            </label>
          </div>
          <textarea
            value={b.source}
            onChange={(e) =>
              updateBlock(slideId, block.id, { source: e.target.value })
            }
            rows={10}
            className="font-mono"
            spellCheck={false}
          />
        </div>
      )
    }
    default:
      return null
  }
}
