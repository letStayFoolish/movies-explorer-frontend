import './input.css'

const Input = ({
  value,
  errors,
  onChange,
  name,
  type,
  label,
  placeholder,
  minLength,
  maxLength,
  pattern,
  required
}) => {
  return (
      <label htmlFor="" className='label'>{label}
        <input
          style={{color: errors && '#EE3465'}}
          value={value}
          onChange={onChange}
          name={name}
          type={type}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
        />
        {name === 'name' ? (
          <span className="span_error">{errors && `Имя должно содержать только буквы, дефисы или пробелы (от 2 до 30 симв.)`}</span>
        ) : name === 'email' ? (
          <span className="span_error">{errors && `Пожалуйста, введите действительный адрес электронной почты.`}</span>
        ) : (
          <span className="span_error">{errors && `Пароль должен состоять минимум из 6 символов, включая латинские буквы, цифры и специальные символы`}</span>
        )
        }
      </label>
  )
}
export default Input
