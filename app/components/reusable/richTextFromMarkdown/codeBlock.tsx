import React from "react"
import type { FC } from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { atelierDuneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs"

const CodeBlock: FC<{ children: React.ReactElement }> = ({
  children,
}): JSX.Element => {
  const { className, children: code } = children.props

  const language = className?.replace("lang-", "")

  return (
    <SyntaxHighlighter language={language} style={atelierDuneDark}>
      {code}
    </SyntaxHighlighter>
  )
}

export default CodeBlock
