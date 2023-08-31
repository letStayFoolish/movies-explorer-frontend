import React from 'react'
import {NavLink} from "react-router-dom";

const Entry = () => {
  return (
    <div className="entry__container scale-up-center">
      <div className="entry__container_links-sign">
        <p>
          <NavLink to='/signin'>Регистрация</NavLink>
        </p>
        <button type='button'>
          <NavLink to='/signup'>Войти</NavLink>
        </button>
      </div>
    </div>
  )
}
export default Entry
