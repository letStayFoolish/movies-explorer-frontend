import React, {useEffect, useRef, useState} from 'react'
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MoviesList/MovieList";
import Preloader from "../../components/Preloader/Preloader";
// Styles
import './saved-movies.css'
import {getSavedMovies, saveMoviesToSavedMovies} from "../../utils/MainApi";
import {handleGetFromLocalStorage, handleSaveToLocalStorage} from "../../utils/constants";

const SavedMovies = ({ savedMovies, setSavedMovies, removeMovie }) => {
  const searchInputRef = useRef(null)
  // Movies cards
  // ====================================================================================================
  const [filteredMovies, setFilteredMovies] = useState([])
  // ====================================================================================================
  // States to display or hide elements on screen:
  const [preloader, setPreloader] = useState(false)
  const [searchMessageError, setSearchMessageError] = useState(null)
  const [showMessage, setShowMessage] = useState(false)
  const [error, setError] = useState(false)
  // ====================================================================================================

  useEffect(() => {
    async function fetchData() {
      setPreloader(true)
      try {
        const data = await getSavedMovies()
        await setSavedMovies(data.reverse())
        // Put liked (saved) movies to local storage:
        handleSaveToLocalStorage('likedMovies', data)

      } catch (error) {
        console.error(error)
      } finally {
        setPreloader(false)
      }
    }

    fetchData()

  }, [setSavedMovies]);

  const moviesSavedInLocalStorage = handleGetFromLocalStorage('likedMovies') || [];

  // Handle search:

  // Handle checkbox:

  return (
    <section className='saved-movies'>
      <SearchForm />
      {preloader ?
        <Preloader /> :
        !showMessage && (
          <MovieList
            movies={savedMovies}
            removeMovie={removeMovie}
            error={error}
          />
        )}
    </section>
  )
}
export default SavedMovies
