import './input.css'

const Input = ({
  value,
  error,
  onChange,
  name,
  type,
  label,
  placeholder,
  minLength,
  maxLength
}) => {
  return (
      <label htmlFor="" className='label'>{label}
        <input
          style={{color: error && '#EE3465'}}
          value={value}
          onChange={onChange}
          name={name}
          type={type}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          required
        />
        <span className="span_error">
        {error && `Что-то пошло не так...`}
      </span>
      </label>
  )
}
export default Input
