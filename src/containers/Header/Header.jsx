import React, { useState } from 'react'
import logo from '../../assets/images/header/logo.svg'
import Navigation from "../../components/Navigation/Navigation";
import './header.css'

const Header = ({ isLoggedIn }) => {
  return (
    <header className='header'>
      <div className="header__wrapper">
        <a href='/' className="header__logo">
          <img src={logo} alt="Logo"/>
        </a>
        <Navigation isLoggedIn={isLoggedIn} />
      </div>
    </header>
  )
}
export default Header
