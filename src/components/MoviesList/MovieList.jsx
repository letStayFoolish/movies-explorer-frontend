import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesNotFound from "../../containers/Movies/MoviesNotFound/MoviesNotFound";
// Styles
import './movie-list.css'

const MovieList = ({
  searchMessageError,
  setSearchMessageError,
  onGoBackClick,
  error,
  onShowMoreClick,
  movies,
  endIndex,
  hasMoreMovies,
  showMessage
}) => {
  return (
    <div className="movies-cards__wrapper">
    {searchMessageError ? (
      <MoviesNotFound onGoBackClick={onGoBackClick} error={error} />
      ) : (
      <div className="movies-cards__container">
        {/*{movies.slice(startIndex, endIndex).map((movie) => (*/}
        {movies.slice(0, endIndex).map((movie) => (
          <MoviesCard
            // savedMovies={movie.savedMovies}
            key={movie.id}
            title={movie.nameRU}
            duration={movie.duration}
            poster={`https://api.nomoreparties.co${movie.image.url}`}
            id={movie.id}
            movieTrailer={movie.trailerLink}
          />
        ))}
      </div>
        )}
      <button
        className="movies-cards__btn-more"
        type='button'
        onClick={onShowMoreClick}
        style={{visibility: hasMoreMovies ? 'visible' : 'hidden'}}
      >Ещё
      </button>
    </div>
  )
}

export default MovieList
