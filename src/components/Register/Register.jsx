import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

import * as auth from '../../utils/auth'
import FormElement from "../FormElement/FormElement";
import Input from "../Input/Input";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import EntryPopup from "../EntryPopup/EntryPopup";
import './register.css'

const Register = () => {
  const navigate = useNavigate()
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
  const { values, resetForm, handleOnChange, errors, isValid } = useFormWithValidation()
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const greetingMessage = 'Добро пожаловать!'
  const textButton = 'Зарегистрироваться'
  const textParagraph = 'Уже зарегистрированы?'
  const link = '/signin'
  const textSpan = 'Войти'

  const handleOnClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    setIsSubmitDisabled(!isValid)
  }, [values]);

  const submitHandler = async (e) => {
    e.preventDefault()

    if(!values.name || !values.email || !values.password) {
      setIsSubmitDisabled(true)
      setIsSuccess(false)
      window.alert('Пожалуйста, заполните все поля.')
      return
    } else {
      setIsSubmitDisabled(false)
      setIsSigningUp(true)

      try {
        await auth.register(values.name, values.email, values.password)

        await ('/signin', { replace: true })
        setIsOpen(true)
        await setIsSuccess(true)
      } catch (err) {
        console.error(`Error: ${err.message}`)
      }
      finally {
        setIsSubmitDisabled(true)
        setIsSigningUp(false)
        resetForm()
        setIsOpen(true)
      }
    }
  }


  return (
    <FormElement
      greetingMessage={greetingMessage}
      textBtn={textButton}
      paragraph={textParagraph}
      link={link}
      span={textSpan}
      submitHandler={submitHandler}
      isSubmitDisabled={isSubmitDisabled}
      isSigningUp={isSigningUp ? 'Регистрация...' : isSigningUp}
    >
      <Input
        value={values.name || ''}
        errors={errors.name}
        onChange={handleOnChange}
        name='name'
        type='text'
        label='Имя'
        placeholder='Введите свое Имя.'
        minLength={2}
        maxLength={30}
        required
      />
      <Input
        value={values.email || ''}
        errors={errors.email}
        onChange={handleOnChange}
        name='email'
        type='email'
        label='E-mail'
        placeholder='Введите свой E-mail.'
        minLength={2}
        maxLength={30}
        required
      />
      <Input
        value={values.password || ''}
        errors={errors.password}
        onChange={handleOnChange}
        name='password'
        type='password'
        label='Пароль'
        placeholder='Введите свой Пароль.'
        minLength={6}
        maxLength={36}
        required
      />
      <EntryPopup isOpen={isOpen} onSuccess={isSuccess} handleOnClose={handleOnClose} message='Спасибо, что зарегистрировались.' />
    </FormElement>
  )
}
export default Register
