import { useDeck } from '../../store/DeckContext'
import { RevealDeck } from '../runtime/RevealDeck'

interface PresentViewProps {
  onExit: () => void
}

export function PresentView({ onExit }: PresentViewProps) {
  const { deck } = useDeck()

  return (
    <div className="present-shell">
      <button type="button" className="present-exit" onClick={onExit}>
        Exit (Esc)
      </button>
      <RevealDeck deck={deck} mode="present" />
    </div>
  )
}
