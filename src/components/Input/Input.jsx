import React from 'react'

import './input.css'

const Input = ({
  value,
  error,
  onChange,
  name,
  type,
  placeholder,
  minLength,
  maxLength
}) => {
  return (
    <div className='input'>
      <label htmlFor="" className='label'>{placeholder}
        <input
          style={{color: error && '#EE3465'}}
          value={value}
          onChange={onChange}
          name={name}
          type={type}
          minLength={minLength}
          maxLength={maxLength}
          required
        />
        <span className="span_error">
        {error && `Что-то пошло не так...`}
      </span>
      </label>
    </div>

  )
}
export default Input
