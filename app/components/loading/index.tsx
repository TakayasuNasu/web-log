import React from 'react'
import type { FC } from 'react'
import cx from "classnames";

import * as styles from "./styles.css";
import { cs } from 'date-fns/locale';

const Loading: FC = (): JSX.Element => {
  return (
    <div className={cx("grid place-items-center h-48")}>
      <article className={cx(styles.loader, "flex")}>
        {[...Array(3)].map((_, i) => i).map((_, i) => {
          return (
            <span key={i} className={cx(styles.bar, "rounded-lg")}></span>
          )
        })}
      </article>
    </div>
  )
}

export default Loading

