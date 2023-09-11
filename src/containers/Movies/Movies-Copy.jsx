import {useEffect, useRef, useState} from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MoviesList/MovieList";
import {getMoviesData} from "../../utils/MoviesApi";
import Preloader from "../../components/Preloader/Preloader";
// Styles
import './movies.css'

const Movies = () => {
  const searchInputRef = useRef(null)

  const [searchQuery, setSearchQuery] = useState('')
  // Movies cards
  // ====================================================================================================
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  // ====================================================================================================
  const [searchedMoviesResult, setSearchedMoviesResult] = useState(JSON.parse(
    localStorage.getItem('search')) || { 'movies': '', 'shortMovies': ''}
  )

  // States to display or hide elements on screen:
  const [searchMessageError, setSearchMessageError] = useState(null)
  const [preloader, setPreloader] = useState(false)
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
  const [displayedMovies, setDisplayedMovies] = useState([])
  // Check box short movies on/off:
  const [shortMovies, setShortMovies] = useState(false)
  // ====================================================================================================

  const hasMoreMovies = endIndex < filteredMovies.length

  // Function to filter movies depending on what user searched for:
  const handleFilterMovies = (search, movies) => {
    // Search:
    setSearchedMoviesResult(search)
    localStorage.setItem('search', JSON.stringify(search))
    // After search...:
    setFilteredMovies(movies.filter(movie => {
      const movieFound = movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
      return search.shortMovies ? (movieFound && movie.duration <= 50) : movieFound
    }))
  }

  useEffect(() => {
    const localSearch = localStorage.getItem('search')
    const localMovies = localStorage.getItem('movies')

    if (localMovies && localSearch) {
      const parsedSearch = JSON.parse(localSearch)
      const parsedMovies = JSON.parse(localMovies)
      // setSourcedMovies(parsedMovies)
      handleFilterMovies(parsedSearch, parsedMovies)
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!searchInputRef.current.value) {
      setShowMessage(true)

    } else {
      setPreloader(true)
      setShowMessage(false)
      try {
        const initialMoviesData = await getMoviesData()
        const query = searchInputRef.current.value
        setSearchQuery(query)

        setMovies(initialMoviesData)
        handleFilterMovies(searchQuery, movies)

        localStorage.setItem('movies', JSON.stringify(movies))

      } catch (error) {
        setError(true)
        console.error(error)
      } finally {
        setPreloader(false)
        setSearchMessageError(true)
      }
    }
  }
  const handleSearch = async (e) => {
    e.preventDefault()


    if (!searchInputRef.current.value) {
      setShowMessage(true)
    } else {
      setPreloader(true)
      setShowMessage(false)

      try {
        await handleInitialMoviesList()
        const query = searchInputRef.current.value
        setSearchQuery(query)



      } catch (error) {
        setError(true)
        console.error(error)
      } finally {
        setPreloader(false)
        setSearchMessageError(true)
      }
    }
  }

  const handleInitialMoviesList = async () => {
    try {
      const movies = await getMoviesData()
      return await setMovies(movies)
    } catch (error) {
      console.error(error)
    }
  }

  // ============================================= Pagination ==========================================
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsToAdd
    const endIndex = startIndex + initialItems + (currentPage - 1) * itemsToAdd
    setDisplayedMovies(filteredMovies.slice(0, endIndex))
  }, [currentPage, itemsToAdd, movies]); // [filteredMovies, currentPage, itemsToAdd]

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
  }, [handleSearch, filteredMovies, displayedMovies, preloader]); //handleSearch, filteredMovies, displayedMovies, preloader


  // ============================================= Handlers ==========================================
  const handleGoBackClick = () => {
    searchInputRef.current.value = ''
  }

  const handleShowMoreClick = () => {
    setCurrentPage(currentPage + 1)
  }

  const handlerDisplayShortMovies = () => {
    setShortMovies(!shortMovies)
  }

  // ================================================================================
  // const filteredMovies = movies.filter((movie) => {
  //   if (shortMovies && movie.duration < 40) {
  //
  //   }
  //   return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
  // })
  // ================================================================================


  return (
    <section className='movies'>
      <SearchForm
        searchInputRef={searchInputRef}
        handleSearch={handleSearch}
        showMessage={showMessage}
        handlerDisplayShortMovies={handlerDisplayShortMovies}
        shortMovies={shortMovies}
      />
      {preloader ?
        <Preloader/> :
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
            hasMoreMovies={hasMoreMovies}
          />
      }
    </section>
  )
}
export default Movies
