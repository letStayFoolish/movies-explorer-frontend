import {useEffect, useRef, useState} from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MoviesList/MovieList";
import {getMoviesData} from "../../utils/MoviesApi";
import Preloader from "../../components/Preloader/Preloader";
// Styles
import './movies.css'

const Movies = () => {
  const searchInputRef = useRef(null)
  // const [searchQuery, setSearchQuery] = useState('')
  // Movies cards
  // ====================================================================================================
  const [movies, setMovies] = useState([])
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
  // Check box short movies on/off:
  const [shortMovies, setShortMovies] = useState(false)
  // ====================================================================================================

  const handleSaveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const handleGetFromLocalStorage = (key) => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }


  //
  useEffect(() => {
    const searchFilteredFromLocalStorage = handleGetFromLocalStorage('searchFiltered')

    if (searchFilteredFromLocalStorage) {
      setFilteredMovies(searchFilteredFromLocalStorage.filteredResult)
      searchInputRef.current.value = searchFilteredFromLocalStorage.searchTerm.trim()
      setShortMovies(searchFilteredFromLocalStorage.shortMovies)
    }
  }, []);

  //
  const filteredMoviesFromSearch = (movies, search) => {
    return movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(search.toLowerCase()) || movie.nameEN.toLowerCase().includes(search.toLowerCase())
    })
  }

  //
  const filterShortMovies = (movies, shortMoviesChecked) => {
    if (shortMoviesChecked) {
      return movies.filter((movie) => movie.duration <= 40);
    }
    return movies;
  };

  //
  const handleSearch = async () => {
    setSearchMessageError(false)

    const searchTerm = searchInputRef.current.value
    // setSearchQuery(searchTerm)
    if (!searchTerm.trim()) {
      // Show message: "Please type in something in the search box"
      setShowMessage(true)
      return
    } else {
      // Else... (if user typed something in the search field):
      // searchQuery !== "":
      setShowMessage(false)
      // Show preloader:
      // ...
      setPreloader(true)

      try {
        const searchFromLocalStorage = handleGetFromLocalStorage('moviesListFromServer')
        // If a search result is already saved in the Local storage, use from there ... :
        if (searchFromLocalStorage) {
          // Search query from the local storage:
          // const filteredByKeyword = await filteredMoviesFromSearch(searchFromLocalStorage, searchQuery.trim())
          const filteredByKeyword = await filteredMoviesFromSearch(searchFromLocalStorage, searchTerm.trim())
          // Movies from the last search session (saved in localStorage):
          const filteredResult = await filterShortMovies(filteredByKeyword, shortMovies)
          // Save result (filtered and founded movies) from last search to the local storage:
          // handleSaveToLocalStorage('searchFiltered', { filteredResult, searchQuery, shortMovies })
          handleSaveToLocalStorage('searchFiltered', { filteredResult, searchTerm, shortMovies })
          // Set filtered movies array from localStorage, movies to be rendered until the next search session:
          setFilteredMovies(filteredResult)

          if (filteredResult.length === 0) {
            setSearchMessageError(true)
            return;
          }
        } else {
          // Movies are not in localStorage => get movies from the server beatfilm-movies.
          const data = await getMoviesData()
          await setMovies(data)
          handleSaveToLocalStorage('moviesListFromServer', data)
          // Search movies by keyword in the server database (beatfilm-movies):
          // const filteredByKeyword = await filteredMoviesFromSearch(data, searchQuery.trim())
          const filteredByKeyword = await filteredMoviesFromSearch(data, searchTerm.trim())
          // Show only short movies if short movies check box is "on" or show all movies depending on keyword:
          const filteredResult = await filterShortMovies(filteredByKeyword, shortMovies)
          // Save movie list, that we searched for (by: keywords and short movies checkbox), to local storage:
          // handleSaveToLocalStorage('searchFiltered', { filteredResult, searchQuery, shortMovies })
          handleSaveToLocalStorage('searchFiltered', { filteredResult, searchTerm, shortMovies })
          setFilteredMovies(filteredResult)

          if (filteredResult.length === 0) {
            setSearchMessageError(true)
            return;
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
    const moviesFromLocalStorage = handleGetFromLocalStorage('moviesListFromServer')

    if (moviesFromLocalStorage) {
      const filteredByKeyword = filteredMoviesFromSearch(moviesFromLocalStorage, searchTerm.trim())
      const filteredResult = filterShortMovies(filteredByKeyword, shortMovies)
      setFilteredMovies(filteredResult)
      handleSaveToLocalStorage('searchFiltered', {filteredResult, searchTerm, shortMovies})
      if (filteredResult.length === 0) {
        setSearchMessageError(true)
        return;
      }
    } else {
      return
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
  }, [currentPage, itemsToAdd, filteredMovies]); // [filteredMovies, currentPage, itemsToAdd]

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
  }, [handleSearch, filteredMovies, displayedMovies, window.innerWidth]);



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
        <Preloader /> :
        !showMessage &&
          <MovieList
            showMessage={showMessage}
            setSearchMessageError={setSearchMessageError}
            searchMessageError={searchMessageError}
            onGoBackClick={handleGoBackClick}
            error={error}
            onShowMoreClick={handleShowMoreClick}
            movies={displayedMovies}
            endIndex={endIndex}
            hasMoreMovies={moreMovies}
          />
      }
    </section>
  )
}
export default Movies
