import FormElement from "../FormElement/FormElement";
import Input from "../Input/Input";
import FormButton from "../FormButton/FormButton";
import {NavLink} from "react-router-dom";
import './login.css'

const Login = () => {
  const greetingMessage = 'Рады видеть!'
  const textButton = 'Войти'
  const textParagraph = 'Ещё не зарегистрированы?'
  const link = '/signup'
  const textSpan = 'Регистрация'

  return (
    <FormElement
      greetingMessage={greetingMessage}
      textBtn={textButton}
      paragraph={textParagraph}
      link={link}
      span={textSpan}
    >
      <Input
        // value={formValue.email}
        // error={false}
        // onChange={handleOnChange}
        name='email'
        type='email'
        label='E-mail'
        placeholder='Введите свой E-mail.'
        minLength={2}
        maxLength={30}
        required={true}
      />
      <Input
        // value={formValue.password}
        // error={true}
        // onChange={handleOnChange}
        name='password'
        type='password'
        label='Пароль'
        placeholder='Введите свой Пароль.'
        minLength={6}
        maxLength={36}
        required={true}
      />
    </FormElement>
  )
}
export default Login
