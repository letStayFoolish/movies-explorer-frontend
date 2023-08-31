import React, {useState} from 'react'
import {NavLink, useLocation} from "react-router-dom";
import Input from "../Input/Input";

import logo from '../../assets/images/register/logo.svg'
import './form-element.css'
import FormButton from "../FormButton/FormButton";

const FormElement = () => {
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
  })
  const location = useLocation()
  const pathname = location.pathname

  const handleOnChange = (e) => {
    setFormValue((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }))
  }

  return (
    <div className='form-element'>
      <div className="form-element__wrapper">
        <div className="form-element__logo">
          <img src={logo} alt="Logo"/>
        </div>
        <h2 className="form-element__greeting">
          {pathname === '/signup' ? 'Добро пожаловать!' : 'Рады видеть!'}
        </h2>
        <form className="form-element__form form-form-element">
          <fieldset className="form-form-element__fieldset">
            {pathname === '/signup' && (
              <Input
                value={formValue.name}
                error={false}
                onChange={handleOnChange}
                name='name'
                type='text'
                placeholder='Имя'
                minLength={2}
                maxLength={36}
              />
            )}
            <Input
              value={formValue.email}
              error={false}
              onChange={handleOnChange}
              name='email'
              type='email'
              placeholder='E-mail'
              minLength={2}
              maxLength={36}
            />
            <Input
              value={formValue.password}
              error={true}
              onChange={handleOnChange}
              name='password'
              type='password'
              placeholder='Пароль'
              minLength={2}
              maxLength={36}
            />
          </fieldset>
        </form>

        {pathname === '/signup' ? (
          <>
            <FormButton text='Зарегистрироваться' />
            <div className="form-element__text">
              <p>Уже зарегистрированы?<span><NavLink to='/signin'>Войти</NavLink></span></p>
            </div>
          </>

        ) : (
          <>
            <FormButton text='Войти' />
            <div className="form-element__text">
              <p>Ещё не зарегистрированы?<span><NavLink to='/signup'>Регистрация</NavLink></span></p>
            </div>
          </>
          )
        }
      </div>
    </div>
  )
}
export default FormElement
