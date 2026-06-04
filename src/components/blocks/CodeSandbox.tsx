import {
  SandpackCodeEditor,
  SandpackConsole,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react'
import type { CodeBlock } from '../../types/deck'

const sandpackTemplate = {
  javascript: 'vanilla' as const,
  typescript: 'vanilla-ts' as const,
  python: 'vanilla' as const,
  html: 'static' as const,
}

interface CodeSandboxProps {
  block: CodeBlock
  mode: 'edit' | 'present'
}

export function CodeSandbox({ block, mode }: CodeSandboxProps) {
  const template = sandpackTemplate[block.language]
  const readOnly = mode === 'present'

  const files: Record<string, string> =
    block.language === 'html'
      ? { '/index.html': block.source }
      : { '/index.js': block.source }

  if (!block.runnable) {
    return (
      <div className="code-static-wrap">
        <p className="code-pane-label">Code</p>
        <pre className="code-static">
          <code>{block.source}</code>
        </pre>
      </div>
    )
  }

  return (
    <div className={`code-sandbox ${readOnly ? 'code-sandbox--present' : ''}`}>
      <SandpackProvider
        template={template}
        files={files}
        theme="dark"
        options={{ autorun: true, recompileMode: 'immediate' }}
      >
        <SandpackLayout className="code-sandbox-layout">
          <div className="code-sandbox-pane code-sandbox-pane--source">
            <p className="code-pane-label">Code</p>
            <SandpackCodeEditor
              readOnly={readOnly}
              showTabs={false}
              showLineNumbers
              showReadOnly={readOnly}
              style={{ minHeight: 140, flex: 1 }}
            />
          </div>
          <div className="code-sandbox-pane code-sandbox-pane--output">
            <p className="code-pane-label">Output</p>
            <SandpackPreview
              showNavigator={false}
              showOpenInCodeSandbox={false}
            />
            <SandpackConsole showHeader={false} />
          </div>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}
