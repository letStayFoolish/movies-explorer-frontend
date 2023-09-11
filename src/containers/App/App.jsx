import {Route, Routes, useLocation, useMatch, useNavigate} from "react-router-dom";
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
// Styles
import './app.css'


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' })
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
              <ProtectedRoute isLoggedIn={isLoggedIn} element={Movies} />
            }
            />
            <Route path="/saved-movies" element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={SavedMovies} />
            }
            />
            <Route path="/profile" element={
              <ProtectedRoute isLoggedIn={isLoggedIn} handleOnLogout={handleOnLogout} currentUser={currentUser} element={Profile} />
            }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {(pathname === '/' || pathname === '/movies' || pathname === '/saved-movies') &&  <Footer />}
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
