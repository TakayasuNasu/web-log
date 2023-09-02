import React from "react"
import type { FC } from "react"

// type
import type { Post } from "~/models/post.server"

// components
import Body from "./body"

const Timeline: FC<Post> = ({
  slug,
  publishedDate,
  bodyCopy,
  reply,
}): JSX.Element => {
  const date = new Date(publishedDate)

  return (
    <article data-has-reply={reply ? true : false}>
      <Body {...{ bodyCopy }} />
    </article>
  )
}

export default Timeline
