import React, { useState } from 'react'
import icon from "../../assets/icons/navbar/account-icon.svg";

import './navigation.css'
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";

const Sign = () => (
  <div className="navbar__menu_container scale-up-center">
    <div className="navbar__menu_container_links-sign">
      <p>Регистрация</p>
      <button type='button'>Войти</button>
    </div>
  </div>
)

const Menu = () => (
  <>
    <div className="navbar__links">
      <ul className='navbar__links_list'>
        <li className='navbar__links_item'><a className='navbar__links_link' >Фильмы</a></li>
        <li className='navbar__links_item'><a className='navbar__links_link' >Сохранённые фильмы</a></li>
      </ul>
      <div className="navbar__links_account">
        <p>Аккаунт</p>
        <div>
          <img src={icon} alt="Account image"/>
        </div>
      </div>
    </div>
  </>
)

const Navigation = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <nav className='navbar'>
      {isLoggedIn ? (
        <>
          <div className="navbar-big-screens">
            <Menu />
          </div>
          <div className="header__menu">
            {toggleMenu ?
              <div className='header__menu_btn'>
                <AiOutlineClose size={22} color='#fff' onClick={() => setToggleMenu(false)} />
              </div>
              :
              <div className='header__menu_btn'>
                <AiOutlineMenu color='#fff' size={28} onClick={() => setToggleMenu(true)} />
              </div>
            }
            {toggleMenu && (
              <div className="navbar-small-screens swing-in-top-fwd">
                <Menu />
              </div>
            )}
          </div>
        </>
      ) : (
        <Sign />
      )}
    </nav>
  )
}
export default Navigation
