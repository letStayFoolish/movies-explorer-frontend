import React, { useState } from 'react'
import logo from '../../assets/images/header/logo.svg'

import {AiOutlineMenu, AiOutlineClose} from "react-icons/ai";
import {GrClose} from 'react-icons/gr'
import Navigation from "../Navigation/Navigation";
import './header.css'


const Header = () => {
  return (
    <header className='header'>
      <div className="header__wrapper">
        <div className="header__logo">
          <img src={logo} alt="Logo"/>
        </div>
        <Navigation />

        {/*  Smaller Devices */}
        {/*<div className="header__menu">*/}
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
    </header>
  )
}
export default Header
