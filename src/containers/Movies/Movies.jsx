import {useEffect, useRef, useState} from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MoviesList/MovieList";
import {getMoviesData} from "../../utils/MoviesApi";
import Preloader from "../../components/Preloader/Preloader";
import {
  filteredMoviesFromSearch,
  filterShortMovies,
  handleGetFromLocalStorage,
  handleSaveToLocalStorage
} from "../../utils/constants";
import {getSavedMovies} from "../../utils/MainApi";

// Styles
import './movies.css'

const Movies = ({likeMovie, shortMovies, setShortMovies}) => {
  const searchInputRef = useRef(null)
  // Movies cards
  // ====================================================================================================
  const [movies, setMovies] = useState([])
  const [movieListSaved, setMovieListSaved] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  // ====================================================================================================
  // States to display or hide elements on screen:
  const [preloader, setPreloader] = useState(false)
  const [searchMessageError, setSearchMessageError] = useState(null)
  const [showMessage, setShowMessage] = useState(false)
  const [error, setError] = useState(false)
  // ====================================================================================================
  // Pagination:
  const [currentPage, setCurrentPage] = useState(1)
  const [initialItems, setInitialItems] = useState(12)
  const [itemsToAdd, setItemsToAdd] = useState(3)
  // Calculate start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsToAdd
  const endIndex = startIndex + initialItems
  const [moreMovies, setMoreMovies] = useState(false)
  const [displayedMovies, setDisplayedMovies] = useState([])

  // ====================================================================================================
  //
  useEffect(() => {
    const searchFilteredFromLocalStorage = handleGetFromLocalStorage('searchFiltered')
    const moviesSavedFromLocalStorage = handleGetFromLocalStorage('movieListSaved');
    setMovieListSaved(moviesSavedFromLocalStorage || [])

    if (searchFilteredFromLocalStorage) {
      setFilteredMovies(searchFilteredFromLocalStorage.resultFilteredMovieList)
      searchInputRef.current.value = searchFilteredFromLocalStorage.searchTerm.trim()
      setShortMovies(searchFilteredFromLocalStorage.shortMovies)
    }
  }, [setMovieListSaved]);

  // check if the movie is already liked (saved movies):
  const checkIfMovieIsSaved = (movie, movieListSaved) => {
    return movieListSaved.find(prevState => prevState.movieId === movie.id)
  }

  const movieListWithLikedSign = filteredMovies.map(movie => ({
    ...movie, saved: checkIfMovieIsSaved(movie, movieListSaved)
  }))

  // Get a movie list (all movies) from the server:
  const searchFromLocalStorage = handleGetFromLocalStorage('moviesListFromServer')

  //
  const handleSearch = async () => {
    setSearchMessageError(false)

    const searchTerm = searchInputRef.current.value
    // setSearchQuery(searchTerm)
    if (!searchTerm.trim()) {
      // Show message: "Please type in something in the search box"
      setShowMessage(true)

    } else {
      // Else... (if user typed something in the search field):
      // searchQuery !== "":
      setShowMessage(false)
      // Show preloader:
      setPreloader(true)

      try {
        // If a search result is already saved in the Local storage, use from there ... :
        if (searchFromLocalStorage) {
          // Search query from the local storage:
          const movieListFilteredByKeyword = await filteredMoviesFromSearch(searchFromLocalStorage, searchTerm.trim())
          // Movies from the last search session (saved in localStorage):
          const resultFilteredMovieList = await filterShortMovies(movieListFilteredByKeyword, shortMovies)
          // Save result (filtered and founded movies) from last search to the local storage:
          handleSaveToLocalStorage('searchFiltered', {resultFilteredMovieList, searchTerm, shortMovies})
          // Set filtered movies array from localStorage, movies to be rendered until the next search session:
          setFilteredMovies(resultFilteredMovieList)

          if (resultFilteredMovieList.length === 0) {
            setSearchMessageError(true)

          }
        } else {
          // Movies are not in localStorage => get movies from the server beatfilm-movies.
          const data = await getMoviesData()
          const movieListFromSavedMovieList = await getSavedMovies()

          setMovies(data)
          setMovieListSaved(movieListFromSavedMovieList)

          handleSaveToLocalStorage('moviesListFromServer', data)
          handleSaveToLocalStorage('movieListSaved', movieListFromSavedMovieList)

          // Search movies by keyword in the server database (beatfilm-movies):
          const movieListFilteredByKeyword = await filteredMoviesFromSearch(data, searchTerm.trim())
          // Show only short movies if short movies check box is "on" or show all movies depending on keyword:
          const resultFilteredMovieList = await filterShortMovies(movieListFilteredByKeyword, shortMovies)
          // Save movie list, that we searched for (by: keywords and short movies checkbox), to local storage:
          handleSaveToLocalStorage('searchFiltered', {resultFilteredMovieList, searchTerm, shortMovies})
          setFilteredMovies(resultFilteredMovieList)

          if (resultFilteredMovieList.length === 0) {
            setSearchMessageError(true)

          }
        }

      } catch (error) {
        setError(true)
        console.error(error)
      } finally {
        setPreloader(false)
      }
    }
  }
  // ============================================= Handlers ==========================================

  const handleGoBackClick = () => {
    searchInputRef.current.value = ''
  }

  const handleShowMoreClick = () => {
    setCurrentPage(currentPage + 1)
  }

  const handlerDisplayShortMovies = (shortMovies) => {
    setSearchMessageError(false)

    const searchTerm = searchInputRef.current.value

    if (searchFromLocalStorage) {
      const movieListFilteredByKeyword = filteredMoviesFromSearch(searchFromLocalStorage, searchTerm.trim())
      const resultFilteredMovieList = filterShortMovies(movieListFilteredByKeyword, shortMovies)
      setFilteredMovies(resultFilteredMovieList)
      handleSaveToLocalStorage('searchFiltered', {resultFilteredMovieList, searchTerm, shortMovies})

      if (resultFilteredMovieList.length === 0) {
        setSearchMessageError(true)

      }
    } else {

    }
  }

  // ============================================= Pagination ==========================================
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsToAdd
    const endIndex = startIndex + initialItems + (currentPage - 1) * itemsToAdd
    if (endIndex < filteredMovies.length) {
      setMoreMovies(true)
    } else {
      setMoreMovies(false)
    }
    setDisplayedMovies(filteredMovies.slice(0, endIndex))
  }, [currentPage, itemsToAdd, filteredMovies]);

  // ==================================== Loading various number of cards depending on current screen width ==========================================
  useEffect(() => {
    // Add a resize event listener to adjust values based on screen width
    const handleResize = () => {
      const screenWidth = window.innerWidth

      if (screenWidth >= 1280) {
        setInitialItems(12)
        setItemsToAdd(3)
        // 1276px and less
      } else if (screenWidth > 766 && screenWidth < 1280) {
        setInitialItems(8)
        setItemsToAdd(2)
        // 766px and less
      } else if (screenWidth <= 766) {
        setInitialItems(5)
        setItemsToAdd(1)
      }
    }

    window.addEventListener('resize', handleResize)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [filteredMovies, window.innerWidth]);

  return (
    <section className='movies'>
      <SearchForm
        searchInputRef={searchInputRef}
        handleSearch={handleSearch}
        showMessage={showMessage}
        onCheckbox={handlerDisplayShortMovies}
        setShortMovies={setShortMovies}
        shortMovies={shortMovies}
      />
      {preloader ?
        <Preloader/> :
        !showMessage && (
          <MovieList
            showMessage={showMessage}
            setSearchMessageError={setSearchMessageError}
            searchMessageError={searchMessageError}
            onGoBackClick={handleGoBackClick}
            error={error}
            onShowMoreClick={handleShowMoreClick}
            movies={movieListWithLikedSign}
            endIndex={endIndex}
            hasMoreMovies={moreMovies}
            likeMovie={likeMovie}
          />
        )}
    </section>
  )
}
export default Movies
