import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import accountIcon from '../../assets/icons/navbar/account-icon-1.svg'
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";

import './navigation.css'

const Sign = () => (
  <div className="navbar__menu_container scale-up-center">
    <div className="navbar__menu_container_links-sign">
      <p>
        <NavLink to='/signin'>Регистрация</NavLink>
      </p>
      <button type='button'>
        <NavLink to='/signup'>Войти</NavLink>
      </button>
    </div>
  </div>
)

const Menu = ({ divStyle, pathname }) => (
  <>
    <div className="navbar__links">
      <ul className='navbar__links_list'>
        {/*{pathname !== '/' && <li className='navbar__links_item'><NavLink to='/' className='navbar__links_link' >Главная</NavLink></li> }*/}
        <li className='navbar__links_item' style={{textDecoration: pathname === '/' && 'underline'}}><NavLink to='/' className='navbar__links_link' >Главная</NavLink></li>
        <li className='navbar__links_item' style={{textDecoration: pathname === '/movies' && 'underline'}}><NavLink to='/movies' className='navbar__links_link' >Фильмы</NavLink></li>
        <li className='navbar__links_item' style={{textDecoration: pathname === '/saved-movies' && 'underline'}}><NavLink to='/saved-movies' className='navbar__links_link' >Сохранённые фильмы</NavLink></li>
      </ul>
      <div className="navbar__links_account">
        <p style={{textDecoration: pathname === '/profile' && 'underline'}}>
          <NavLink to='/profile'>Аккаунт</NavLink>
        </p>
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
  const pathname = location.pathname

  const divStyle = {
    backgroundColor: pathname === '/' ? '#0F4157' : '#313131',
  };


  return (
    <nav className='navbar'>
      {isLoggedIn ? (
        <>
          <div className="navbar-big-screens">
            <Menu divStyle={divStyle} pathname={pathname} />
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
              <div className="navbar-small-screens swing-in-top-fwd" style={{background: pathname === '/' ? '#073042' : '#202020'}}>
                <Menu divStyle={divStyle} pathname={pathname} />
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
