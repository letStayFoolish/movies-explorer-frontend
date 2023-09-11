import React from 'react'
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MoviesList/MovieList";
import './saved-movies.css'

const SavedMovies = () => {
  return (
    <section className='saved-movies'>
      <SearchForm />
      <MovieList biggerScreen={3} midScreen={3} smallScreen={2} />
    </section>
  )
}
export default SavedMovies
