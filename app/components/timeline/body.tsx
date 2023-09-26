import type { FC } from "react"
import { useNavigate } from "@remix-run/react"
import Markdown from "markdown-to-jsx"

// components
import CustomContainer from "./customContainer"
import CustomCard from "./customCard"
import CodeBlock from "./codeBlock"

const Body: FC<{ slug: string; bodyCopy: string }> = ({
  slug,
  bodyCopy,
}): JSX.Element => {
  const navigate = useNavigate()

  const handleClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    to: string,
  ) => {
    if ("localName" in e.target && e.target.localName != "img") {
      navigate(`/ui-test/${to}`)
    }
  }

  return (
    <Markdown
      className="body w-full"
      data-status-body
      onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
        handleClick(e, slug)
      }
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
