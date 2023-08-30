import React, { useState } from 'react'
import './switch.css'

const Switch = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn)
  }

  return (
    <label className='switch'>
      <input type="checkbox" checked={isOn} onChange={handleToggle} />
      <span className="slider"></span>
    </label>
  )
}
export default Switch
