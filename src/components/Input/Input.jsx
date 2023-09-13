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
  errorMessage
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
          pattern={pattern}
          required
        />
        <span className="span_error">{errors && errorMessage}</span>
      </label>
  )
}
export default Input
