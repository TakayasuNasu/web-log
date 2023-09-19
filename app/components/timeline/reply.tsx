import type { FC } from "react"

// type
import type { Post } from "~/models/post.server"

// components
import Timeline from "./index"

const Reply: FC<Post> = ({ reply }): JSX.Element => {
  const replies: Array<Post> = []
  recursion(reply, replies)
  return (
    <>
      {replies.map((post, i) => {
        return <Timeline key={i} {...post} />
      })}
    </>
  )
}

export default Reply

function recursion(reply: Post | undefined, replies: Array<Post>) {
  if (!reply) {
    return
  }

  replies.push(reply)

  recursion(reply.reply, replies)
}
