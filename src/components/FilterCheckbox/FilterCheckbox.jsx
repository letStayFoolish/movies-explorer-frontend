import React, { useState } from 'react'

import './filter-checkbox.css'

const FilterCheckbox = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn)
  }

  return (

  <div className="filter-checkbox search-form__switch">
    <label className='switch'>
      <input type="checkbox" checked={isOn} onChange={handleToggle} />
      <span className="slider"></span>
    </label>
    <p>Короткометражки</p>
  </div>
  )
}
export default FilterCheckbox
