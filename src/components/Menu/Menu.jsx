import {NavLink} from "react-router-dom";
import accountIcon from "../../assets/icons/navbar/account-icon-1.svg";
import React from "react";

import './menu.css'

const Menu = ({ divStyle, pathname, toggleMenu }) => {
  return (
    <>
      <div className="menu">
        <ul className='menu_list'>
          {toggleMenu && (
            <li className='menu_item'>
              <NavLink to='/'
                       className={pathname === '/' ? 'menu_link_active menu_link' : 'menu_link'}
                       style={{fontWeight: pathname === '/' && '500'}}
              >
                Главная
              </NavLink>
            </li>
          )}
          <li className='menu_item'>
            <NavLink to='/movies'
                     className={pathname === '/movies' ? 'menu_link_active menu_link' : 'menu_link'}
                     style={{fontWeight: pathname === '/movies' && '500'}}
            >
              Фильмы
            </NavLink>
          </li>
          <li className='menu_item'>
            <NavLink to='/saved-movies'
                     className={pathname === '/saved-movies' ? 'menu_link_active menu_link' : 'menu_link'}
                     style={{fontWeight: pathname === '/saved-movies' && '500'}}
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <div className="menu_account">
          <p
            className={pathname === '/profile' && 'menu_link_active'}
            style={{fontWeight: pathname === '/profile' && '500'}}
          >
            <NavLink to='/profile'>Аккаунт</NavLink>
          </p>
          <div style={divStyle} >
            <img src={accountIcon} alt="Account image"/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Menu
