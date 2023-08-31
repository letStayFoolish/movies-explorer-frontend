import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import Menu from '../Menu/Menu'
import Entry from "../Entry/Entry";

import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";
import './navigation.css'

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
            <Menu divStyle={divStyle} pathname={pathname} toggleMenu={toggleMenu} />
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
        <Entry />
      )}
    </nav>
  )
}
export default Navigation
