import React from 'react'
import './not-found.css'
import {Link} from "react-router-dom";
const NotFound = () => {
  return (
    <section className='not-found'>
      <h1 className="not-found__heading">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <p type='button' className='not-found__navigate'>
        <Link to='/' >Назад</Link>
      </p>
    </section>
  )
}
export default NotFound
