import React from "react"
import type { FC } from "react"
import { Link } from "@remix-run/react"
import Markdown from "markdown-to-jsx"

// components
import CustomContainer from "./customContainer"
import CustomCard from "./customCard"
import CodeBlock from "./codeBlock"

const Body: FC<{ bodyCopy: string }> = ({ bodyCopy }): JSX.Element => {
  return (
    <Markdown
      className="body w-full"
      data-status-body
      options={{
        wrapper: "main",
        overrides: {
          CustomContainer: {
            component: CustomContainer,
          },
          CustomCard: {
            component: CustomCard,
          },
          pre: {
            component: CodeBlock,
          },
        },
      }}
    >
      {bodyCopy}
    </Markdown>
  )
}

export default Body
