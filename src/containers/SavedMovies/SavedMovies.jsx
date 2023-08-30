import React from 'react'
import SearchForm from "../../components/SearchForm/SearchForm";
import { movies } from "../../utils/constants";
import MoviesCard from "../../components/MoviesCard/MoviesCard";

import './saved-movies.css'
const SavedMovies = () => {
  const baseURL = 'https://api.nomoreparties.co'


  return (
    <div className='saved-movies'>
      <SearchForm />
      <div className="saved-movies__wrapper">
        <div className="saved-movies__container">
          { movies.map((movie, _index) => (
            <MoviesCard
              title={movie.nameRU}
              duration={movie.duration}
              poster={`${baseURL}/${movie.image.url}`}
              id={movie.id}
            />
          ))}
        </div>

        <button type='button' className='saved-movies__btn-more'>Ещё</button>
      </div>
    </div>
  )
}
export default SavedMovies
