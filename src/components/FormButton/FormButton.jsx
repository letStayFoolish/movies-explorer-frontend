import React from 'react'
import './form-button.css'
const FormButton = ({ text, onClick }) => {
  return <button type='button' className="form-btn" onClick={onClick}>{text}</button>
}
export default FormButton
