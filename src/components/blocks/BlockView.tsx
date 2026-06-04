import type { Block } from '../../types/deck'
import { CodeSandbox } from './CodeSandbox'
import { MathView } from './MathView'

interface BlockViewProps {
  block: Block
  mode: 'edit' | 'present'
}

export function BlockView({ block, mode }: BlockViewProps) {
  switch (block.type) {
    case 'text':
      return <p className="block-text">{block.content}</p>
    case 'math':
      return <MathView latex={block.latex} displayMode={block.displayMode} />
    case 'code':
      return <CodeSandbox block={block} mode={mode} />
    default:
      return null
  }
}
