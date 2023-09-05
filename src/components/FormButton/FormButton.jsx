import React from 'react'
import './form-button.css'
const FormButton = ({ text, onClick, margin, smallScreenMargin, animation, type, isSubmitDisabled }) => {

  const buttonStyle = {
    marginTop: margin
  }

  if (window.innerWidth <= 320 && smallScreenMargin)  {
    buttonStyle.marginTop = smallScreenMargin
  } else {
    buttonStyle.marginTop = margin
  }

  return (
    <button
      disabled={isSubmitDisabled}
      type={type}
      className={`form-btn ${animation}`}
      onClick={onClick}
      style={buttonStyle}
    >
      {text}
    </button>
  )
}
export default FormButton
