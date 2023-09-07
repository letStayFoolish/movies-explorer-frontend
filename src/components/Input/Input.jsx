import './input.css'
import {EMAIL_SPAN_ERROR, NAME_SPAN_ERROR, PASSWORD_SPAN_ERROR} from "../../utils/constants";

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
          <span className="span_error">{errors && NAME_SPAN_ERROR}</span>
        ) : name === 'email' ? (
          <span className="span_error">{errors && EMAIL_SPAN_ERROR}</span>
        ) : (
          <span className="span_error">{errors && PASSWORD_SPAN_ERROR}</span>
        )
        }
      </label>
  )
}
export default Input
