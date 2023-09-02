import React, { useState } from 'react'
import Menu from '../Menu/Menu'
import Entry from "../Entry/Entry";
import iconClose from '../../assets/icons/close/close-icon.svg'
import iconMenu from '../../assets/icons/navbar/burger.svg'
import {useLocation} from "react-router-dom";
import './navigation.css'

const Navigation = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const location = useLocation()
  const pathname = location.pathname


  return (
    <nav className='navbar'>
      {isLoggedIn ? (
        <>
          <div className="navbar-big-screens">
            <Menu pathname={pathname} />
          </div>
          <div className="header__menu">
            {toggleMenu ?
              <button onClick={() => setToggleMenu(false)} className='header__menu_btn header__menu_btn_type_closed' >
                <img src={iconClose} alt="Close Button"/>
              </button>
              :
              <button onClick={() => setToggleMenu(true)} className='header__menu_btn header__menu_btn_type_opened' >
                <img src={iconMenu} alt="Burger Menu Button"/>
              </button>
            }
            {toggleMenu && (
              <>
                <div className='overlay'></div>
                {/* Menu Background changes, depending on page route: */}
                {/*<div className="navbar-small-screens swing-in-top-fwd" style={{background: pathname === '/' ? '#073042' : '#202020'}}>*/}
                {/*  <Menu divStyle={divStyle} pathname={pathname} toggleMenu={toggleMenu} />*/}
                {/*</div>*/}
                {/* ========================================================================= */}

                <div className="navbar-small-screens swing-in-top-fwd">
                  <Menu pathname={pathname} toggleMenu={toggleMenu} />
                </div>
              </>
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
