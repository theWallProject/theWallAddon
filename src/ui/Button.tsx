import React, { type FC } from "react"

import style from "./style.module.css"

const Button: FC<{ title: string; onClick: () => void }> = ({
  title,
  onClick
}) => {
  return (
    <button onClick={onClick} className={style.button}>
      {title}
    </button>
  )
}

export { Button }
