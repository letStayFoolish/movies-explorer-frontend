import React from 'react'
import './form-button.css'
import {NavLink, useLocation} from "react-router-dom";
const FormButton = ({ text, onClick, margin, smallScreenMargin, animation }) => {
  const location = useLocation()
  const pathname = location.pathname
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
      type='button'
      className={`form-btn ${animation}`}
      onClick={onClick}
      style={buttonStyle}
    >
      {text}
    </button>
  )
}
export default FormButton
