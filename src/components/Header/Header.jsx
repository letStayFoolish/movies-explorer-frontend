import React, { useState } from 'react'
import logo from '../../assets/images/header/logo.svg'
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
      </div>
    </header>
  )
}
export default Header
