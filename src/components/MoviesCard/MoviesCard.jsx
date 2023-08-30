import React from 'react'
import './movies-card.css'

function DurationConverter({ minutes }) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return <p className='card__time'>{hours}ч {remainingMinutes}м</p>
}

const MoviesCard = ({ title, duration, poster, id }) => {

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

        {/*<button className='button button_type_add' type='button'>&#10003;</button>*/}
        {/*<button className='button button_type_text' type='button'>Сохранить</button>*/}
        <button className='button button_type_remove' type='button'>&#10006;</button>
      </div>
    </div>
  )
}
export default MoviesCard
