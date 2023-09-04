import React, {useState} from 'react'
import './profile.css'
import {NavLink} from "react-router-dom";
import FormButton from "../FormButton/FormButton";


const Profile = () => {
  const [editProfile, setEditProfile] = useState(false)

  const handleEditProfile = () => {
    setEditProfile(true)
  }

  const handleSavingChanges = () => {
    // Submit changes
    // ...
    setEditProfile(false)
  }
  const user = {
    name: 'Nemanja',
    email: 'nemanja@gmail.com'
  }

  return (
    <div className='profile'>
      <h2 className="profile__heading">Привет, {user.name}!</h2>

      <form className="profile__form form">
        <label className='form_label'>Имя
          <input
            className='form_input'
            type="text"
            name='name'
            value={user.name}
            // onChange={onChange}
            minLength={2}
            maxLength={30}
            required={true}
            placeholder='Введите свое имя.'
          />
        </label>
        <label className='form_label'>E-mail
          <input
            className='form_input'
            type="email"
            name='email'
            value={user.email}
            // onChange={onChange}
            minLength={2}
            maxLength={30}
            required={true}
            placeholder='Введите свой E-mail.'
          />
        </label>

        {editProfile ? (
          // <button className="profile__submit-btn" onClick={handleSavingChanges}>Сохранить</button>
          <FormButton animation='scale-in-ver-top' text='Сохранить' onClick={handleSavingChanges} margin='12.25rem' smallScreenMargin={'22rem'} />
        ) : (
          <>
            <button type='button' className="profile__btn profile__btn_type_edit" onClick={handleEditProfile}>Редактировать</button>
            <button type='button' className="profile__btn profile__btn_type_exit">
              <NavLink to='/'>Выйти из аккаунта</NavLink>
            </button>
          </>

        )}
      </form>
    </div>
  )
}
export default Profile
