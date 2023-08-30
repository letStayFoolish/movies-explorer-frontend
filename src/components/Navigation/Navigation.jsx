import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import accountIcon from '../../assets/icons/navbar/account-icon-1.svg'
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";

import './navigation.css'

const Sign = () => (
  <div className="navbar__menu_container scale-up-center">
    <div className="navbar__menu_container_links-sign">
      <p>Регистрация</p>
      <button type='button'>Войти</button>
    </div>
  </div>
)

const Menu = ({ divStyle }) => (
  <>
    <div className="navbar__links">
      <ul className='navbar__links_list'>
        <li className='navbar__links_item'><NavLink to='/movies' className='navbar__links_link' >Фильмы</NavLink></li>
        <li className='navbar__links_item'><NavLink to='/saved-movies' className='navbar__links_link' >Сохранённые фильмы</NavLink></li>
      </ul>
      <div className="navbar__links_account">
        <p>Аккаунт</p>
        <div style={divStyle} >
          <img src={accountIcon} alt="Account image"/>
        </div>
      </div>
    </div>
  </>
)

const Navigation = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const location = useLocation()

  const divStyle = {
    backgroundColor: location.pathname === '/' ? '#0F4157' : '#313131',
  };


  return (
    <nav className='navbar'>
      {isLoggedIn ? (
        <>
          <div className="navbar-big-screens">
            <Menu divStyle={divStyle} />
          </div>
          <div className="header__menu">
            {toggleMenu ?
              <div className='header__menu_btn header__menu_btn_closed'>
                <AiOutlineClose size={30} color='#fff' onClick={() => setToggleMenu(false)} />
              </div>
              :
              <div className='header__menu_btn header__menu_btn_opened'>
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
