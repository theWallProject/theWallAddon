import React, { type FC, type MouseEventHandler } from "react"

import style from "./style.module.css"

const Button: FC<{
  title: string
  onClick: () => void
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>
}> = ({ title, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <button
      onClick={onClick}
      className={style.button}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {title}
    </button>
  )
}

export { Button }
