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
} from "../../utils/utils";
import {getSavedMovies} from "../../utils/MainApi";
import {
  INITIAL_NUMBER_OF_CARDS_1280,
  INITIAL_NUMBER_OF_CARDS_320,
  INITIAL_NUMBER_OF_CARDS_768,
  SCREEN_WIDTH_L,
  SCREEN_WIDTH_M
} from "../../utils/constants";
import useResponsiveCardsShowing from "../../hooks/useResponsiveCardsShowing";

// Styles
import './movies.css'
const Movies = ({ likeMovie, removeMovie }) => {
  const searchInputRef = useRef(null)
  // Movies cards
  // ====================================================================================================
  const [movies, setMovies] = useState([])
  const [movieListSaved, setMovieListSaved] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [shortMovies, setShortMovies] = useState(false)
  // ====================================================================================================
  // States to display or hide elements on screen:
  const [preloader, setPreloader] = useState(false)
  const [searchMessageError, setSearchMessageError] = useState(null)
  const [showMessage, setShowMessage] = useState(false)
  const [error, setError] = useState(false)
  // ====================================================================================================
  // Pagination:
  const [moviesToShow, setMoviesToShow] = useState(INITIAL_NUMBER_OF_CARDS_1280)
  const [screenWidth] = useResponsiveCardsShowing()
  // ====================================================================================================

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
    }
  }
  // ============================================= Pagination ========================================================================================
  // ==================================== Loading various number of cards depending on current screen width ==========================================
  useEffect(() => {
    let cardsInitialToShow = INITIAL_NUMBER_OF_CARDS_1280

    if (screenWidth >= SCREEN_WIDTH_L) {
      cardsInitialToShow = INITIAL_NUMBER_OF_CARDS_1280
      // 1276px and less
    } else if (screenWidth > SCREEN_WIDTH_M && screenWidth < SCREEN_WIDTH_L) {
      cardsInitialToShow = INITIAL_NUMBER_OF_CARDS_768
      // 766px and less
    } else if (screenWidth <= SCREEN_WIDTH_M) {
      cardsInitialToShow = INITIAL_NUMBER_OF_CARDS_320
    }
    // setMoviesToShow(cardsInitialToShow)

    console.log(searchInputRef.current.value)

    setTimeout(() => {
      setMoviesToShow(cardsInitialToShow)
    }, 0)
  }, [screenWidth, searchInputRef?.current?.value]);


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
          <>
            <MovieList
              screenWidth={screenWidth}
              showMessage={showMessage}
              setSearchMessageError={setSearchMessageError}
              searchMessageError={searchMessageError}
              onGoBackClick={handleGoBackClick}
              error={error}
              setMoviesToShow={setMoviesToShow}
              movies={movieListWithLikedSign}
              endIndex={moviesToShow}
              likeMovie={likeMovie}
              removeMovie={removeMovie}
            />
          </>
        )}
    </section>
  )
}
export default Movies
