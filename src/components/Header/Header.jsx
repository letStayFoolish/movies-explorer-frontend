import React from 'react'
import image from '../../assets/images/header/image.png'
import './header.css'
const Header = () => {
  return (
    <header className='header'>
      <div className="header__wrapper wrapper">
        <div className="header__content content">
          <h1 className="content_heading">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p>
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <button type='button'>
            Узнать больше
          </button>
        </div>
        <div className="header__image image">
          <img src={image} alt="Planet Earth Image"/>
        </div>
      </div>
    </header>
  )
}
export default Header