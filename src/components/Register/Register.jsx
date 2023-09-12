import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import * as auth from '../../utils/auth'
import FormElement from "../FormElement/FormElement";
import Input from "../Input/Input";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import EntryPopup from "../EntryPopup/EntryPopup";
import {
  EMAIL_PATTERN,
  handleMessageErrors, NAME_PATTERN, PASSWORD_PATTERN,
} from "../../utils/constants";
// Styles
import './register.css'

const Register = ({handleOnLogin, setCurrentUser}) => {
  const location = useLocation()
  const pathname = location.pathname
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
  const {values, resetForm, handleOnChange, errors, setErrors, isValid} = useFormWithValidation()
  const [isEntering, setIsEntering] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [textOnError, setTextOnError] = useState('')

  // Props for the FormElement global component:
  const greetingMessage = 'Добро пожаловать!'
  const textButton = 'Зарегистрироваться'
  const textOnSigningUp = 'Регистрация...'
  const textParagraph = 'Уже зарегистрированы?'
  const link = '/signin'
  const textSpan = 'Войти'

  // React hook - to set submit button disabled depending on the validity of fields in the form:
  useEffect(() => {
    setIsSubmitDisabled(!isValid)
  }, [values]);


  // Handler function on submit button - registration:
  const submitHandler = async (e) => {
    e.preventDefault()
    const {name, email, password} = values

    if (!name || !email || !password) {
      setIsSubmitDisabled(true)
      setIsSuccess(false)
      window.alert('Пожалуйста, заполните все поля.')
      return
    } else {
      setIsSubmitDisabled(false)
      setIsEntering(true)

      try {
        const data = await auth.register(name, email, password)
        setIsSuccess(true)
        setIsOpen(true)
        handleOnLogin()
        setCurrentUser({name: data.name, email: data.email})
      } catch (err) {
        setTextOnError(() => handleMessageErrors(err.message, pathname))
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
      textOnSigningUp={textOnSigningUp}
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
        pattern={NAME_PATTERN.test(values.name)}
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
        pattern={EMAIL_PATTERN.test(values.email)}
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
        pattern={PASSWORD_PATTERN.test(values.password)}
      />
      <EntryPopup isOpen={isOpen} onSuccess={isSuccess} setIsOpen={setIsOpen} message='Спасибо, что зарегистрировались.'
                  textOnError={textOnError}/>
    </FormElement>
  )
}
export default Register
