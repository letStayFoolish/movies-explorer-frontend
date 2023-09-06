import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import * as auth from '../../utils/auth'
import FormElement from "../FormElement/FormElement";
import Input from "../Input/Input";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import EntryPopup from "../EntryPopup/EntryPopup";
import {EMAIL_PATTERN, NAME_PATTERN, PASSWORD_PATTERN} from "../../utils/constants";
import './login.css'

const Login = ({ handleOnLogin }) => {
  const navigate = useNavigate()
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
  const { values, resetForm, handleOnChange, errors, isValid } = useFormWithValidation()
  const [isEntering, setIsEntering] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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
        await auth.authorize(email, password)
        setIsSuccess(true)
        setIsOpen(true)
        handleOnLogin()
      } catch (err) {
        console.error(`Error: ${err.message}`)
        setIsSuccess(false)
        setIsOpen(true)
      } finally {
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
        pattern={EMAIL_PATTERN}
        required={true}
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
        pattern={PASSWORD_PATTERN}
        required={true}
      />
      <EntryPopup isOpen={isOpen} onSuccess={isSuccess} setIsOpen={setIsOpen} message='Вход в систему успешен.' />
    </FormElement>
  )
}
export default Login
