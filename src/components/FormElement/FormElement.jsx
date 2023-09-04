import React, {useState} from 'react'
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import Input from "../Input/Input";

import logo from '../../assets/images/register/logo.svg'
import FormButton from "../FormButton/FormButton";
import './form-element.css'

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

  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/movies', {replace: true})
  }

  const handleSignup = () => {
    navigate('/signin', {replace: true})
  }

  return (
    <section className='form-element'>
      <div className="form-element__wrapper">
        <a href='/' className="form-element__logo">
          <img src={logo} alt="Logo"/>
        </a>
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
                label='Имя'
                placeholder='Введите свое Имя.'
                minLength={2}
                maxLength={30}
                required={true}
              />
            )}
            <Input
              value={formValue.email}
              error={false}
              onChange={handleOnChange}
              name='email'
              type='email'
              label='E-mail'
              placeholder='Введите свой E-mail.'
              minLength={2}
              maxLength={30}
              required={true}
            />
            <Input
              value={formValue.password}
              error={true}
              onChange={handleOnChange}
              name='password'
              type='password'
              label='Пароль'
              placeholder='Введите свой Пароль.'
              minLength={6}
              maxLength={36}
              required={true}
            />
          </fieldset>
        </form>

        {pathname === '/signup' ? (
          <>
            <FormButton text='Зарегистрироваться' onClick={handleSignup} />
            <div className="form-element__text">
              <p>Уже зарегистрированы?<span><NavLink to='/signin'>Войти</NavLink></span></p>
            </div>
          </>

        ) : (
          <>
            <FormButton text='Войти' onClick={handleLogin} />
            <div className="form-element__text">
              <p>Ещё не зарегистрированы?<span><NavLink to='/signup'>Регистрация</NavLink></span></p>
            </div>
          </>
          )
        }
      </div>
    </section>
  )
}
export default FormElement
