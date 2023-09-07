import React, {useEffect, useState} from 'react'
import {NavLink, useLocation} from "react-router-dom";
import FormButton from "../FormButton/FormButton";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import {EMAIL_PATTERN, handleMessageErrors, NAME_PATTERN} from "../../utils/constants";
import {updateCurrentUser} from "../../utils/MainApi";
import EntryPopup from "../EntryPopup/EntryPopup";
import './profile.css'

const Profile = ({ handleOnLogout, currentUser }) => {
  const { values, handleOnChange, setValues } = useFormWithValidation()

  const location = useLocation()
  const pathname = location.pathname
  const { name, email } = currentUser
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [editProfile, setEditProfile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [textOnError, setTextOnError] = useState('')
  const [isEntering, setIsEntering] = useState(false)


  useEffect(() => {
    setValues({ ...values,
      'name': name,
      'email': email
    })

    // if (Object.keys(currentUser).length !== 0) {
    //   setValues({ ...values,
    //     'name': name,
    //     'email': email
    //   })
    // }
  }, [currentUser]);

  useEffect(() => {
    if (name !== values.name || email !== values.email) {
      setBtnDisabled(false)
    }
    else setBtnDisabled(true)
  }, [values]);

  const handleEditProfile = () => {
    setEditProfile(true)
  }

  const handleSavingChanges = async () => {
    // Submit changes
    setIsEntering(true)
    try {
      await updateCurrentUser(values.name, values.email)
      setEditProfile(false)
      setIsOpen(true)
      setIsSuccess(true)
    } catch (err) {
      setTextOnError(() => handleMessageErrors(err.message, pathname))
      console.error(`Error: ${err.message}`)
      setIsSuccess(false)
      setIsOpen(true)

    }
    finally {
      setBtnDisabled(true)
      setIsEntering(false)
    }
  }

  return (
    <div className='profile'>
      <h2 className="profile__heading">Привет, {name}!</h2>

      <form className="profile__form form">
        <label className='form_label'>Имя
          <input
            className='form_input'
            type="text"
            name='name'
            value={values.name || ""}
            onChange={handleOnChange}
            minLength={2}
            maxLength={30}
            required
            pattern={NAME_PATTERN}
            placeholder='Введите свое имя.'
          />
        </label>
        <label className='form_label'>E-mail
          <input
            className='form_input'
            type="email"
            name='email'
            value={values.email || ""}
            onChange={handleOnChange}
            minLength={2}
            maxLength={30}
            required
            pattern={EMAIL_PATTERN}
            placeholder='Введите свой E-mail.'
          />
        </label>

        {editProfile ? (
          // <button className="profile__submit-btn" onClick={handleSavingChanges}>Сохранить</button>
          <FormButton type='button' animation='scale-in-ver-top' text={isEntering ? 'Сохраняю...' : 'Сохранить'} onClick={handleSavingChanges} margin='12.25rem' smallScreenMargin={'22rem'} />
        ) : (
          <>
            <button
              type='button'
              className="profile__btn profile__btn_type_edit"
              onClick={handleEditProfile}
              disabled={btnDisabled}
            >Редактировать</button>
            <button
              type='button'
              className="profile__btn profile__btn_type_exit"
              onClick={handleOnLogout}
            >
              <NavLink to='/'>Выйти из аккаунта</NavLink>
            </button>
          </>

        )}
        <EntryPopup isOpen={isOpen} onSuccess={isSuccess} setIsOpen={setIsOpen} message='Данные успешно обновлены 👍🏻' textOnError={textOnError} />
      </form>
    </div>
  )
}
export default Profile
