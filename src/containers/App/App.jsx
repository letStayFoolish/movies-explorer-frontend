import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Register from "../../components/Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Login from "../../components/Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../../components/Profile/Profile";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import * as auth from '../../utils/auth'
import useFormWithValidation from "../../hooks/useFormWithValidation";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import * as MainAPI from '../../utils/MainApi'
import {handleGetFromLocalStorage, handleSaveToLocalStorage, SERVER_URL} from "../../utils/constants";

// Styles
import './app.css'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' })
  const [savedMovies, setSavedMovies] = useState([])

  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  const { resetForm } = useFormWithValidation()


  // State to authenticate user's token:
  useEffect(() => {
    checkToken()
    // eslint-disable-next-line
  }, []);


  // Function to keep a user logged-in if his token is already stored:
  const checkToken = async () => {
    try {
      const data = await auth.getContent()
      if (!data) return;

      if (data.status !== 401) {
        setIsLoggedIn(true)
        navigate(pathname, {replace: true})

        setCurrentUser((prevState) => ({
          ...prevState,
            name: data.name,
            email: data.email
        }))
      }

    } catch (error) {
      setIsLoggedIn(false)
      console.error(`Error: ${error.message}`)
    }
  }

  const handleOnLogin = () => {
    setIsLoggedIn(true)
  }

  const handleOnLogout = async () => {
    try {
      await auth.logout()
      setIsLoggedIn(false)
      navigate('/', { replace: true })
      resetForm()
      setCurrentUser({ name: "", email: ""})
      localStorage.clear()
    } catch (error) {
      console.error(`Error: ${error.message}`)
    }
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handlerSaveMovies = async (movie) => {
    try {
      const data = await MainAPI.saveMoviesToSavedMovies({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${SERVER_URL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${SERVER_URL}${movie.image.formats.thumbnail.url}`,
        // owner: movie.owner,
        movieID: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
      setSavedMovies([data, ...savedMovies])
      handleSaveToLocalStorage('likedMovies', [data, ...savedMovies])

    } catch (error) {
      console.error(error)
    }
  }

  const handleRemoveSavedMovies = async (movie) => {
    let movieID = movie._id

    try {
      if (!movieID && savedMovies.length > 0) {
        const movieFounded = savedMovies.find(movie => movie.movieID === movieID)
        if (movieFounded) movieID = movieFounded._id
      }

      const moviesFromLocalStorage = handleGetFromLocalStorage('likedMovies', [])

      await MainAPI.removeMoviesFromSavedList(movie._id)
      setSavedMovies(savedMovies.filter(movie => movie._id !== movieID))
      handleSaveToLocalStorage('likedMovies', moviesFromLocalStorage.filter(movie => movie._id !== movieID))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        {(pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile') && <Header isLoggedIn={isLoggedIn} />}
        <main className='main'>
          <Routes>
            <Route path="/" index={true} element={<Main />} />
            <Route path="/signup" element={ <Register handleOnLogin={handleOnLogin} setCurrentUser={setCurrentUser} />} />
            <Route path="/signin" element={ <Login handleOnLogin={handleOnLogin} setCurrentUser={setCurrentUser} />} />
            <Route path="/movies" element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={Movies} likeMovie={handlerSaveMovies}  />
            }
            />
            <Route path="/saved-movies" element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={SavedMovies}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                removeMovie={handleRemoveSavedMovies}
              />
            }
            />
            <Route path="/profile" element={
              <ProtectedRoute isLoggedIn={isLoggedIn} handleOnLogout={handleOnLogout} currentUser={currentUser} element={Profile} />
            }
            />
            <Route path="*" element={<NotFound handleGoBack={handleGoBack} />} />
          </Routes>
        </main>

        {(pathname === '/' || pathname === '/movies' || pathname === '/saved-movies') &&  <Footer />}
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
