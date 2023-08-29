import React, { useState } from 'react'
import icon from "../../assets/icons/navbar/account-icon.svg";

import './navigation.css'

const Sign = () => (
  <div className="navbar__menu_container scale-up-center">
    <div className="navbar__menu_container_links-sign">
      <p>Регистрация</p>
      <button type='button'>Войти</button>
    </div>
  </div>
)

const Navigation = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="navbar__links">
      <div className="navbar__links_container">
        <ul className='navbar__links_list'>
          <li className='navbar__links_item'><a className='navbar__links_link' >Фильмы</a></li>
          <li className='navbar__links_item'><a className='navbar__links_link' >Сохранённые фильмы</a></li>
        </ul>
      </div>
      <div className="navbar__links_account">
        <p>Аккаунт</p>
        <div>
          <img src={icon} alt="Account image"/>
        </div>
      </div>
    </div>
  )
}
export default Navigation
