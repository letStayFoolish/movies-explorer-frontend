import React from 'react'
import { NavLink } from "react-router-dom";
import './entry.css'
const Entry = () => {
  return (
    <div className="entry__container scale-up-center">
      <div className="entry__container_links-sign">
        <p>
          <NavLink to='/signup'>Регистрация</NavLink>
        </p>
        <NavLink to='/signin'>
          <button type='button'>Войти</button>
        </NavLink>
      </div>
    </div>
  )
}
export default Entry
