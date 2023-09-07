import {useEffect, useRef, useState} from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesCards from "../../components/MoviesCards/MoviesCards";
import {getMoviesData} from "../../utils/MoviesApi";
import './movies.css'
import Preloader from "../../components/Preloader/Preloader";

const Movies = () => {
  const searchInputRef = useRef(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [searchMessageError, setSearchMessageError] = useState('')
  const [preloader, setPreloader] = useState(false)

  const handleInitialMoviesList = async () => {
    try {
      const movies = await getMoviesData()
      return await setMovies(movies)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    setPreloader(true)
    try {
      await handleInitialMoviesList()
      // setPreloader(true)

      const query = searchInputRef.current.value
      setSearchQuery(query)

    } catch (error) {
      setSearchMessageError('Nothing found 🤔 try again')
      console.error(error)
    }finally {
      setPreloader(false)
    }
  }

  const filteredMovies = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
    })

  return (
    <section className='movies'>
      <SearchForm searchInputRef={searchInputRef} handleSearch={handleSearch} searchQuery={searchQuery} />
      {preloader ? <Preloader/> : <MoviesCards biggerScreen={12} midScreen={8} smallScreen={5} filteredMovies={filteredMovies} />}
    </section>
  )
}
export default Movies
