import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesNotFound from "../../containers/Movies/MoviesNotFound/MoviesNotFound";
// Styles
import './movie-list.css'
import {useLocation} from "react-router-dom";

const MovieList = ({
  searchMessageError,
  onGoBackClick,
  error,
  onShowMoreClick,
  movies,
  endIndex,
  hasMoreMovies,
  likeMovie,
  removeMovie
}) => {
  const pathname = useLocation().pathname
  return (
    <div className="movies-cards__wrapper">
    {searchMessageError ? (
      <MoviesNotFound onGoBackClick={onGoBackClick} error={error} />
      ) : (
      <div className="movies-cards__container">
        {movies.slice(0, endIndex).map((movie, _index) => (
          <MoviesCard
            key={movie.id || _index}
            movie={movie}
            likeMovie={likeMovie}
            removeMovie={removeMovie}
          />
        ))}
      </div>
        )}
      {pathname === '/movies' &&
        <button
        className="movies-cards__btn-more"
        type='button'
        onClick={onShowMoreClick}
        style={{visibility: hasMoreMovies ? 'visible' : 'hidden'}}
      >Ещё
      </button>
      }
    </div>
  )
}

export default MovieList
