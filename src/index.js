import * as React from 'react';
import * as ReactDom from 'react-dom/client';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

import App from "./containers/App/App";


import Main from "./containers/Main/Main";
import Movies from "./containers/Movies/Movies";
import SavedMovies from "./containers/SavedMovies/SavedMovies";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import NotFound from "./containers/NotFound/NotFound";
import Preloader from "./components/Preloader/Preloader";

import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
        <Route path='/' index={true} element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile />} />
      </Route>
      <Route path='/signup' element={<Register />} />
      <Route path='/signin' element={<Login />} />
      <Route path='/spinner' element={<Preloader />} />
      <Route path='/*' element={<NotFound />} />
    </>
  )
)

// ReactDom.render(<App />, document.getElementById('root'))

const root = ReactDom.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
