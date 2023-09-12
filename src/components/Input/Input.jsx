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
        <span className="span_error">{errors}</span>
        {/*{*/}
        {/*  name === 'name' && !NAME_PATTERN.test(value) ? (*/}
        {/*  <span className="span_error">{errors && NAME_SPAN_ERROR}</span>*/}
        {/*  ) : name === 'email' && !EMAIL_PATTERN.test(value) ? (*/}
        {/*    <span className="span_error">{errors && EMAIL_SPAN_ERROR}</span>*/}
        {/*  ) : name === 'password' && !PASSWORD_PATTERN.test(value) ? (*/}
        {/*    <span className="span_error">{errors && PASSWORD_SPAN_ERROR}</span>*/}
        {/*  ) : null*/}
        {/*}*/}
      </label>
  )
}
export default Input
