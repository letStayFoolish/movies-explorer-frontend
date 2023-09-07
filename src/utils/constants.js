export const BASE_URL="http://localhost:3000"

export const BASE_URL_MOVIES="https://api.nomoreparties.co/beatfilm-movies"
export const EMAIL_PATTERN=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
export const NAME_PATTERN="[A-я-\\s]{2,30}";
export const PASSWORD_PATTERN="(?=.*[A-z])(?=.*\\d)(?=.*[!@#$%^&*])(?=.{6,}).*";

// Messages on errors:
// Login:
const EMAIL_OR_PASSWORD_ERROR="Вы ввели неправильный логин или пароль."
const TOKEN_ERROR="При авторизации произошла ошибка. Токен не передан или передан не в том формате."
// Register
const CONFLICT_ERROR="Пользователь с таким email уже существует."
const REGISTER_ERROR="При регистрации пользователя произошла ошибка."
// Edit Profile:
const EDIT_PROFILE_ERROR="При обновлении профиля произошла ошибка."
// Else:
const SERVER_ERROR="На сервере произошла ошибка."

// Handler to show correct error message
export function handleMessageErrors(error, pathname) {
  // Login:
  if (error === "Error: 400" && pathname === '/signin') return TOKEN_ERROR
  if (error === "Error: 401" && pathname === '/signin') return EMAIL_OR_PASSWORD_ERROR
  if (error === "Error: 409" && pathname === '/signin') return CONFLICT_ERROR

  // Register:
  if (error === "Error: 409" && pathname === '/signup') return CONFLICT_ERROR
  if (error === "Error: 400" && pathname === '/signup') return REGISTER_ERROR

  // Profile:
  if (error === "Error: 400" && pathname === '/profile') return EDIT_PROFILE_ERROR
  if (error === "Error: 409" && pathname === '/profile') return CONFLICT_ERROR

  else return SERVER_ERROR
}

// Error messages to show on span below inputs:
export const NAME_SPAN_ERROR="Имя должно содержать только буквы, дефисы или пробелы (от 2 до 30 симв.)"
export const EMAIL_SPAN_ERROR="Пожалуйста, введите действительный адрес электронной почты."
export const PASSWORD_SPAN_ERROR="Пароль должен состоять минимум из 6 символов, включая латинские буквы, цифры и специальные символы"

export const projects = [
  {
    name: 'Статичный сайт',
    url: 'https://github.com/letStayFoolish/how-to-learn'
  },
  {
    name: 'Адаптивный сайт',
    url: 'https://github.com/letStayFoolish/russian-travel'
  },
  {
    name: 'Одностраничное приложение',
    url: 'https://github.com/letStayFoolish/react-mesto-api-full-gha'
  }
]
