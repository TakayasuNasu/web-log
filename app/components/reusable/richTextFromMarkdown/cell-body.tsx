import React from "react"
import type { FC } from "react"
import { Link } from "@remix-run/react"
import Markdown from "markdown-to-jsx"
import cx from "classnames"

// type
import type { Post } from "~/models/post.server"

// assets
import face from "~/images/face.webp"

import * as styles from "./styles.css"
import contentStyle from "~/components/status/content.css"

export const links = () => [{ rel: "stylesheet", href: contentStyle }]

const CellBody: FC<Post> = ({ bodyCopy }): JSX.Element => {
  return (
    <div className={cx(styles.status)}>
      <article className={cx(styles.statusArticle, "flex items-start")}>
        <Link to="/taka7beckham">
          <figure
            className={cx(
              styles.face,
              "flex-shrink-0 overflow-hidden rounded-full",
            )}
          >
            <img src={face} alt="face photo" width={46} height={46} />
          </figure>
        </Link>

        <div className="body">
          <Markdown
            data-status-body
            options={{
              wrapper: "main",
              overrides: {
                p: {
                  component: CustomParagraph,
                },
              },
            }}
          >
            {bodyCopy}
          </Markdown>
        </div>
      </article>
    </div>
  )
}

export default CellBody

const CustomParagraph: FC<{ children: React.ReactNode }> = ({
  children,
  ...props
}): JSX.Element => {
  let isContainer = false

  React.Children.map(children, (child) => {
    if (typeof child === "string" && /^:::/.test(child)) {
      isContainer = true
    }
  })

  if (isContainer) {
    return (
      <aside className="msg message">
        <span className="msg-symbol">!</span>
        <div>
          {React.Children.map(children, (child) => {
            if (typeof child === "string") {
              return <p>{child.replace(":::", "")}</p>
            }
          })}
        </div>
      </aside>
    )
  }

  return <p {...props}>{children}</p>
}
