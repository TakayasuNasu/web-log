import React from "react"
import type { FC } from "react"

const CustomContainer: FC<{ children: React.ReactNode }> = ({
  children,
  ...props
}): JSX.Element => {
  return (
    <aside {...props}>
      <span className="msg-symbol">!</span>
      <div className="msg-content">
        <p>{children}</p>
      </div>
    </aside>
  )
}

export default CustomContainer
