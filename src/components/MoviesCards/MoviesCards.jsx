import {useEffect, useState} from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import {getMoviesData} from "../../utils/MoviesApi";
import './movies-cards.css'

const MoviesCards = ({biggerScreen, midScreen, smallScreen, filteredMovies}) => {
  // const [moviesData, setMoviesData] = useState([])

  // useEffect(() => {
  //   getMoviesData()
  //     .then((data) => setMovies(data))
  // }, []);

  const [currentPage, setCurrentPage] = useState(1)
  let cardsPerPage

  if (window.innerWidth > 768) {
    cardsPerPage = biggerScreen
  } else if (window.innerWidth === 768 && window.innerWidth > 320) {
    cardsPerPage = midScreen
  } else {
    cardsPerPage = smallScreen
  }

  // Calculate start and end indices for current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  // const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  // Handle page navigation
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="movies-cards__wrapper">
      <div className="movies-cards__container">
        {filteredMovies.map((movie) => (
          <MoviesCard
            // savedMovies={movie.savedMovies}
            key={movie.id}
            title={movie.nameRU}
            duration={movie.duration}
            poster={`https://api.nomoreparties.co${movie.image.url}`}
            id={movie.id}
          />
        ))}
      </div>
      <button
        className="movies-cards__btn-more"
        type='button'
        // onClick={() => handlePageChange([...currentCards])}
        style={{
          visibility: cardsPerPage >= 12 && biggerScreen ? "visible" :
            cardsPerPage >= 8 && midScreen ? "visible" :
              cardsPerPage >= 5 && smallScreen ? "visible" : "hidden"
        }}
      >Ещё
      </button>
    </div>
  )
}

export default MoviesCards
