import React, {useEffect, useState} from 'react'
import {useLocation} from "react-router-dom";
import * as auth from '../../utils/auth'
import FormElement from "../FormElement/FormElement";
import Input from "../Input/Input";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import EntryPopup from "../EntryPopup/EntryPopup";
import {
  EMAIL_SPAN_ERROR,
  handleMessageErrors,
  PASSWORD_SPAN_ERROR
} from "../../utils/constants";
import './login.css'
const Login = ({ handleOnLogin, setCurrentUser }) => {
  const location = useLocation()
  const pathname = location.pathname
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
  const { values, resetForm, handleOnChange, errors, isValid } = useFormWithValidation()
  const [isEntering, setIsEntering] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [textOnError, setTextOnError] = useState('')

  // Props for the FormElement global component:
  const greetingMessage = 'Рады видеть!'
  const textButton = 'Войти'
  const textOnSigninIn = 'Входим в систему...'
  const textParagraph = 'Ещё не зарегистрированы?'
  const link = '/signup'
  const textSpan = 'Регистрация'

  // React hook - to set submit button disabled depending on the validity of fields in the form:
  useEffect(() => {
    setIsSubmitDisabled(!isValid)
  }, [values]);

  // Handler function on submit button - log in:
  const submitHandler = async (e) => {
    e.preventDefault()

    const { email, password } = values

    if (!email || !password) {
      setIsSubmitDisabled(true)
      setIsSuccess(false)
      window.alert('Пожалуйста, заполните все поля.')
    } else {
      setIsSubmitDisabled(false)
      setIsEntering(true)
      try {
        const data = await auth.authorize(email, password)
        setIsSuccess(true)
        // setIsOpen(true)
        handleOnLogin()
        setCurrentUser({ name: data.name, email: data.email})

      } catch (err) {
        setTextOnError(() => handleMessageErrors(err.message, pathname))
        console.error(`Error: ${err.message}`)
        setIsSuccess(false)
        // setIsOpen(true)
      } finally {
        setIsOpen(true)
        setIsSubmitDisabled(true)
        setIsEntering(false)
        resetForm()
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
      isEntering={isEntering}
      textOnSigninIn={textOnSigninIn}
    >
      <Input
        value={values.email || ""}
        errors={errors.email}
        onChange={handleOnChange}
        name='email'
        type='email'
        label='E-mail'
        placeholder='Введите свой E-mail.'
        minLength={2}
        maxLength={30}
        pattern='^[a-zA-Z0-9_.\-]+@[a-zA-Z0-9_]+\.[a-z]{2,6}$'
        errorMessage={EMAIL_SPAN_ERROR}
      />
      <Input
        value={values.password || ""}
        errors={errors.password}
        onChange={handleOnChange}
        name='password'
        type='password'
        label='Пароль'
        placeholder='Введите свой Пароль.'
        minLength={6}
        maxLength={36}
        pattern='^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&+=!]).{6,}$'
        errorMessage={PASSWORD_SPAN_ERROR}
      />
      <EntryPopup isOpen={isOpen} onSuccess={isSuccess} setIsOpen={setIsOpen} message='Вход в систему успешен.' textOnError={textOnError} />
    </FormElement>
  )
}
export default Login
