import React from "react"
import type { FC } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism"

const CodeBlock: FC<{ children: React.ReactElement }> = ({
  children,
}): JSX.Element => {
  const { className, children: code } = children.props

  const language = className?.replace("lang-", "")?.split(":")

  return (
    <div className="code-block-container">
      {language?.at(1) && (
        <div className="code-block-filename-containe">
          <span className="code-block-filename">{language.at(1)}</span>
        </div>
      )}
      <SyntaxHighlighter language={language?.at(0)} style={oneDark}>
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
