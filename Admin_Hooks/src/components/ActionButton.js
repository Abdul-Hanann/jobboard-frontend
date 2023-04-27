import React from "react"
import { Button } from "reactstrap"
const ActionButton = props => {
  const { color, className, icon, text, onClick, style } = props
  return (
    <Button
      type="button"
      color={color}
      className={className}
      style={style}
      onClick={onClick}
    >
      {icon}
      {text}
    </Button>
  )
}

export default ActionButton
