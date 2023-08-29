import React, { useState } from 'react'
import logo from '../../assets/images/header/logo.svg'
import icon from '../../assets/icons/navbar/icon.svg'

import {AiOutlineMenu, AiOutlineClose} from "react-icons/ai";
import {GrClose} from 'react-icons/gr'
import './navbar.css'

const Menu = () => (
  <ul className='navbar__links_list'>
    <li className='navbar__links_item'><a className='navbar__links_link' href='#movies'>Фильмы</a></li>
    <li className='navbar__links_item'><a className='navbar__links_link' href='#saved-movies'>Сохранённые фильмы</a></li>
  </ul>
)

const Sign = () => (
  <div className="navbar__menu_container scale-up-center">
    <div className="navbar__menu_container_links-sign">
      <p>Регистрация</p>
      <button type='button'>Войти</button>
    </div>
  </div>
)
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className='navbar'>
      <div className="navbar__wrapper">
        <div className="navbar__logo">
          <img src={logo} alt="Logo"/>
        </div>
          {isLoggedIn ? (
            <div className="navbar__links">
              <div className="navbar__links_container">
                <Menu />
              </div>
              <div className="navbar__links_account">
                <p>Аккаунт</p>
                <img src={icon} alt="Account image"/>
              </div>
            </div>
          ) : (
            <Sign />
            // <></>
          )}

        {/*  Smaller Devices */}
        {/*<div className="navbar__menu">*/}
        {/*  {toggleMenu ?*/}
        {/*    <AiOutlineClose size={22} color='#fff' onClick={() => setToggleMenu(false)} />*/}
        {/*    :*/}
        {/*    <AiOutlineMenu color='#fff' size={28} onClick={() => setToggleMenu(true)} />*/}
        {/*  }*/}
        {/*  {toggleMenu && (*/}
        {/*    <Menu />*/}
        {/*  )}*/}
        {/*</div>*/}
      </div>

    </div>
  )
}
export default Navbar
