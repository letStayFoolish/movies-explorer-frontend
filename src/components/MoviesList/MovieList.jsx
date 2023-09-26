import {useLocation} from "react-router-dom";
import {useCallback} from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesNotFound from "../../containers/Movies/MoviesNotFound/MoviesNotFound";
import {
  CARDS_TO_ADD_1280,
  CARDS_TO_ADD_320,
  CARDS_TO_ADD_768,
  SCREEN_WIDTH_L,
  SCREEN_WIDTH_M
} from "../../utils/constants";

// Styles
import './movie-list.css'
const MovieList = ({
  screenWidth,
  searchMessageError,
  onGoBackClick,
  error,
  setMoviesToShow,
  movies,
  endIndex,
  likeMovie,
  removeMovie,
}) => {
  const pathname = useLocation().pathname

  const handleOnShowMoreClick = useCallback(() => {
    if (screenWidth >= SCREEN_WIDTH_L) {
      setMoviesToShow((prevState) => prevState + CARDS_TO_ADD_1280)
      // 1276px and less
    } else if (screenWidth > SCREEN_WIDTH_M && screenWidth < SCREEN_WIDTH_L) {
      setMoviesToShow((prevState) => prevState + CARDS_TO_ADD_768)
      // 766px and less
    } else if (screenWidth <= SCREEN_WIDTH_M) {
      setMoviesToShow((prevState) => prevState + CARDS_TO_ADD_320)
    }

  }, [screenWidth, setMoviesToShow])

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
        onClick={handleOnShowMoreClick}
        style={{visibility: movies.length !== 0 && endIndex < movies.length ? 'visible' : 'hidden'}}
      >Ещё
      </button>
      }
    </div>
  )
}

export default MovieList
