import React from 'react'
import './styles.css'

const MoviesNotFound = ({error}) => {
  // const handleOnClick = () => {
  //   setSearchMessageError(false)
  //   // onGoBackClick()
  // }

  return (
    <div className='movies-not-found'>
      <div className='movies-not-found__container container'>
        <h2 className='container_heading'>{error ?
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз' :
          'Ничего не найдено'
        }</h2>
        {/*<button type='submit' onClick={handleOnClick} className='container_button'>← Вернуться Назад</button>*/}
      </div>
    </div>

  )
}
export default MoviesNotFound
