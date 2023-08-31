import React from 'react'
import './form-button.css'
const FormButton = ({ text, onClick, margin, smallScreenMargin }) => {
  const buttonStyle = {
    marginTop: margin
  }

  if (window.innerWidth <= 320 && smallScreenMargin)  {
    buttonStyle.marginTop = smallScreenMargin
  }

  return <button type='button' className="form-btn" onClick={onClick} style={buttonStyle} >{text}</button>
}
export default FormButton
