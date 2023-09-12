import React, {useEffect, useRef, useState} from 'react'
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MoviesList/MovieList";
import Preloader from "../../components/Preloader/Preloader";
import {
  filteredMoviesFromSearch,
  filterShortMovies,
  handleGetFromLocalStorage,
  handleSaveToLocalStorage
} from "../../utils/utils";
import {getSavedMovies} from "../../utils/MainApi";

// Styles
import './saved-movies.css'

const SavedMovies = ({ savedMovies, setSavedMovies, removeMovie }) => {
  const searchInputRef = useRef(null)
  // Movies cards
  // ====================================================================================================
  // States to display or hide elements on screen:
  const [preloader, setPreloader] = useState(false)
  const [searchMessageError, setSearchMessageError] = useState(null)
  const [showMessage, setShowMessage] = useState(false)
  const [error, setError] = useState(false)
  const [shortMovies, setShortMovies] = useState(false)
  // ====================================================================================================

  useEffect(() => {
    async function fetchData() {
      setPreloader(true)
      try {
        const data = await getSavedMovies()
        await setSavedMovies(data.reverse())
        // Put saved movies to local storage:
        handleSaveToLocalStorage('movieListSaved', data)


      } catch (error) {
        console.error(error)
      } finally {
        setPreloader(false)
      }
    }

    fetchData()

  }, [setSavedMovies]);

  const moviesSavedInLocalStorage = handleGetFromLocalStorage('movieListSaved') || [];

  // Handle search:
  const handleSearch = async () => {
    setSearchMessageError(false)
    const searchTerm = searchInputRef.current.value

    if (!searchTerm.trim()) {
      // Show message: "Please type in something in the search box"
      setShowMessage(true)
      return
    } else {
      // Else... (if user typed something in the search field):
      // searchQuery !== "":
      setShowMessage(false)
      // Show preloader:
      setPreloader(true)

      try {
        const movieListFilteredByKeyword = await filteredMoviesFromSearch(moviesSavedInLocalStorage, searchTerm.trim())
        const resultFilteredMovieList = await filterShortMovies(movieListFilteredByKeyword, shortMovies)
        setSavedMovies(resultFilteredMovieList)
        if (resultFilteredMovieList.length === 0) {
          setSearchMessageError(true)
          return;
        }
      } catch (error) {
        setError(true)
        console.error(error)
      } finally {
        setPreloader(false)
      }
    }
  }

  // Handle checkbox:
  const handlerDisplayShortMovies = (shortMovies) => {
    setSearchMessageError(false)

    const searchTerm = searchInputRef.current.value

    const movieListFilteredByKeyword = filteredMoviesFromSearch(moviesSavedInLocalStorage, searchTerm.trim())
    const resultFilteredMovieList = filterShortMovies(movieListFilteredByKeyword, shortMovies)
    setSavedMovies(resultFilteredMovieList)

    if (resultFilteredMovieList.length === 0) {
      setSearchMessageError(true)
      return;
    }
  }

  return (
    <section className='saved-movies'>
      <SearchForm
        searchInputRef={searchInputRef}
        handleSearch={handleSearch}
        showMessage={showMessage}
        onCheckbox={handlerDisplayShortMovies}
        setShortMovies={setShortMovies}
        shortMovies={shortMovies}
      />
      {preloader ?
        <Preloader /> :
        !showMessage && (
          <MovieList
            movies={savedMovies}
            removeMovie={removeMovie}
            error={error}
            searchMessageError={searchMessageError}
          />
        )}
    </section>
  )
}
export default SavedMovies
