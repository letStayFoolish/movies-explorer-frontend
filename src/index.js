import * as React from 'react';
import * as ReactDom from 'react-dom/client';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

import App from "./containers/App/App";

import './index.css'
import Main from "./containers/Main/Main";
import Movies from "./containers/Movies/Movies";
import SavedMovies from "./containers/SavedMovies/SavedMovies";
import NotFound from "./containers/NotFound/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<App />}>
      <Route path='/' index={true} element={<Main />} />
      <Route path='/movies' index={true} element={<Movies />} />
      <Route path='/saved-movies' index={true} element={<SavedMovies />} />
      <Route path='/' index={true} element={<Main />} />
      <Route path='/' index={true} element={<Main />} />
    </Route>
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
