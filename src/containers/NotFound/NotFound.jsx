import React from 'react'
// Styles
import './not-found.css'

const NotFound = ({ handleGoBack }) => {
  return (
    <section className='not-found'>
      <h1 className="not-found__heading">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <p type='button' className='not-found__navigate' onClick={handleGoBack}>
        Назад
      </p>
    </section>
  )
}
export default NotFound
