import './input.css'
import {
  EMAIL_PATTERN,
  EMAIL_SPAN_ERROR,
  NAME_PATTERN,
  NAME_SPAN_ERROR, PASSWORD_PATTERN,
  PASSWORD_SPAN_ERROR
} from "../../utils/constants";

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
