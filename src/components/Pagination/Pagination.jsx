import {useState} from "react";
import MoviesCard from "../MoviesCard/MoviesCard";


const Pagination = ({ cards, biggerScreen, midScreen, smallScreen }) => {
  const baseURL = 'https://api.nomoreparties.co'

  const [currentPage, setCurrentPage] = useState(1)
  let cardsPerPage
  if (window.innerWidth <= 1280 && window.innerWidth > 768) {
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
    <div className="movies__wrapper">
      <div className="movies__container">
        { currentCards.map((card, _index) => (
          <MoviesCard
            key={_index}
            title={card.nameRU}
            duration={card.duration}
            poster={`${baseURL}/${card.image.url}`}
            id={card.id}
          />
        ))}
      </div>
      <button type='button' className='movies__btn-more' onClick={() => handlePageChange([...currentCards])}>Ещё</button>
    </div>
  )
}

export default Pagination
