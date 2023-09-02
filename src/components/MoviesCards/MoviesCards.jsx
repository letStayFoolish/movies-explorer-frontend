import {useState} from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './movies-cards.css'

const MoviesCards = ({cards, biggerScreen, midScreen, smallScreen}) => {
  const baseURL = 'https://api.nomoreparties.co'

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
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  // Handle page navigation
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="movies-cards__wrapper">
      <div className="movies-cards__container">
        {currentCards.map((card, _index) => (
          <MoviesCard
            savedMovies={card.savedMovies}
            key={_index}
            title={card.nameRU}
            duration={card.duration}
            poster={`${baseURL}/${card.image.url}`}
            id={card.id}
          />
        ))}
      </div>
      <button
        className="movies-cards__btn-more"
        type='button'
        onClick={() => handlePageChange([...currentCards])}
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
