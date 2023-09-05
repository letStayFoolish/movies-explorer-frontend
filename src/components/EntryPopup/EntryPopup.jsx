import React from 'react'
import {useLocation, useNavigate} from "react-router-dom";

import {GrClose} from "react-icons/gr";
import {AiOutlineCheck} from "react-icons/ai";

import './entry-popup.css'

const EntryPopup = ({ onSuccess, isOpen, message, handleOnClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  const handleClickOnSuccess = () => {
    if (pathname === '/signup') navigate('/signin')
    else navigate('/movies')
  }

  const handleClickOnWrong = () => {
    handleOnClose()

    if (pathname === '/signup') navigate('/signup')
    else navigate('/signin')
  }

  return (
    <div className={`entry-popup ${isOpen && `popup_opened`}`}>
      <div className='entry-popup__container'>
        <div className={onSuccess ?
          'entry-popup__sign entry-popup__sign_color_green' :
          'entry-popup__sign entry-popup__sign_color_red'}
        >
          {onSuccess ? <AiOutlineCheck style={{color: 'white'}} /> : <GrClose style={{color: 'white'}} />}
        </div>
        <h2 className={onSuccess ?
          'entry-popup__heading entry-popup__heading_color_green' :
          'entry-popup__heading entry-popup__heading_color_red'}
        >
          {onSuccess ? 'Успешно!' : 'Ошибка 😕'}
        </h2>
        <p className='entry-popup__message'>
          {onSuccess ? message : 'Что-то пошло не так!'}
        </p>
        <button
          onClick={onSuccess ? handleClickOnSuccess : handleClickOnWrong}
          type='button'
          className={onSuccess ?
          "entry-popup__button entry-popup__button_color_green" :
          "entry-popup__button entry-popup__button_color_red"}
        >
          {onSuccess ? 'Ок' : 'Попробуйте ещё раз.'}
        </button>
      </div>
    </div>
  )
}
export default EntryPopup
