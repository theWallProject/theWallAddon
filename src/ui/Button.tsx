import React, {
  type CSSProperties,
  type FC,
  type MouseEventHandler
} from "react"

import style from "./style.module.css"

const Button: FC<{
  title: string
  onClick: () => void
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>
  btnStyle?: CSSProperties
}> = ({ title, onClick, onMouseEnter, onMouseLeave, btnStyle }) => {
  return (
    <button
      onClick={onClick}
      className={style.button}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={btnStyle}>
      {title}
    </button>
  )
}

export { Button }
