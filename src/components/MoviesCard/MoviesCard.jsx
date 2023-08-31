import React from 'react'
import './movies-card.css'
import {useLocation} from "react-router-dom";

function DurationConverter({ minutes }) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return <p className='card__time'>{hours}ч {remainingMinutes}м</p>
}

const MoviesCard = ({ title, duration, poster, id }) => {

  const location = useLocation()
  const pathname = location.pathname

  return (
    <div className='movies-card card '>
      <div className="card__container">
        <div className="card__heading">
          <h3 className="card__title">{title}</h3>
          <DurationConverter minutes={duration} />
        </div>

        <div className="card__img flip-in-diag-1-tr">
          <img src={poster} alt="Movie Image"/>
        </div>
        {/* Saved movie button */}
        {/*<button className='button button_type_add' type='button'>&#10003;</button>*/}
        {/* Add movie to list button */}
        {pathname === '/movies' && <button className='button button_type_text' type='button'>Сохранить</button>}
        {/* Remove movie from list button */}
        {pathname === '/saved-movies' && <button className='button button_type_remove' type='button'>&#10006;</button>}
      </div>
    </div>
  )
}
export default MoviesCard
