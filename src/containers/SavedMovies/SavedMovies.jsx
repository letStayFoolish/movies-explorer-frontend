import React from 'react'
import SearchForm from "../../components/SearchForm/SearchForm";
import { movies } from "../../utils/constants";
import MoviesCards from "../../components/MoviesCards/MoviesCards";
import './saved-movies.css'

const SavedMovies = () => {
  return (
    <div className='saved-movies'>
      <SearchForm />
      <MoviesCards cards={movies} biggerScreen={3} midScreen={3} smallScreen={2} />
    </div>
  )
}
export default SavedMovies
