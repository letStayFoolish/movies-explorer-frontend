import {useLocation} from "react-router-dom";
import {useState} from "react";

// Styles
import './movies-card.css'

function DurationConverter({ minutes }) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return <p className='card__time'>{hours}ч {remainingMinutes}м</p>
}

const MoviesCard = ({ movie, likeMovie, removeMovie }) => {
  const pathname = useLocation().pathname
  const [isLikedMovie, setIsLikedMovie] = useState(movie.saved)

  const handleSaveMovie = () => {
    likeMovie(movie)
    setIsLikedMovie(!isLikedMovie)
  }

  const handleDeleteMovies = () => {
    removeMovie(movie)
    setIsLikedMovie(!isLikedMovie)
  }

  return (
    <div className='movies-card card '>
      <div className="card__container">
        <div className="card__heading">
          <h3 className="card__title">{movie.nameRU}</h3>
          <DurationConverter minutes={movie.duration} />
        </div>

        <a href={movie.trailerLink} target='_blank' rel="noreferrer">
          <img src={movie.image.url ? `https://api.nomoreparties.co${movie.image.url}` : movie.image} alt="Movie img" className="card__img flip-in-diag-1-tr"/>
        </a>
        {/* Saved movie button */} {/* Add movie to list button */}
        {pathname === '/movies' && isLikedMovie ?
          <button className='button button_type_add' type='button' onClick={handleDeleteMovies}>&#10003;</button> :
          pathname !== '/saved-movies' &&
          <button className='button button_type_text' type='button' onClick={handleSaveMovie}>Сохранить</button>
        }
        {/* Remove movie from list button */}
        {pathname === '/saved-movies' && <button className='button button_type_remove' type='button' onClick={handleDeleteMovies}>&#10006;</button>}
      </div>
    </div>
  )
}
export default MoviesCard
