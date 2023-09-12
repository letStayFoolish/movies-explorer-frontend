// Local storage functions:
export const handleSaveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const handleGetFromLocalStorage = (key) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}


export const filteredMoviesFromSearch = (movies, search) => {
  return movies.filter((movie) => {
    return movie.nameRU.toLowerCase().includes(search.toLowerCase()) || movie.nameEN.toLowerCase().includes(search.toLowerCase())
  })
}

//
export const filterShortMovies = (movies, shortMoviesChecked) => {
  if (shortMoviesChecked) {
    return movies.filter((movie) => movie.duration <= 40);
  }
  return movies;
};
