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
        />
        {name === 'name' ? (
          <span className="span_error">{errors && `Пожалуйста, введите действительное имя для входа в систему.`}</span>
        ) : name === 'email' ? (
          <span className="span_error">{errors && `Пожалуйста, введите действительный адрес электронной почты.`}</span>
        ) : (
          <span className="span_error">{errors && `Пожалуйста, введите действительный пароль.`}</span>
        )
        }
      </label>
  )
}
export default Input
