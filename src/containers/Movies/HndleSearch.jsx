// import {getMoviesData} from "../../utils/MoviesApi";
//
// const handleSearch = async (e) => {
//   e.preventDefault()
//   try {
//
//
//
//
//
//
//
//     const searchFromLocalStorage = handleGetFromLocalStorage('search')
//
//     // If a search result is already saved in the LocalStorage, use from there ... :
//     if (searchFromLocalStorage) {
//       // Search query from the localStorage:
//       const filteredByKeyword = await filteredMoviesFromSearch(searchFromLocalStorage, searchQuery.trim())
//       // Movies from the last search session (saved in localStorage):
//       const filteredResult = await filterShortMovies(filteredByKeyword, shortMovies)
//       // Save result (filtered and founded movies) from last search to the localStorage:
//       handleSaveToLocalStorage('searchFiltered', { filteredResult, searchQuery, shortMovies })
//       // Set filtered movies array from localStorage, movies to be rendered until the next search session:
//       setFilteredMovies(filteredResult)
//       if (setFilteredMovies.length === 0) {
//         setSearchMessageError(true)
//         // return;
//       }
//     } else {
//       setPreloader(true)
//       // setShowMessage(false)
//       // Movies are not in localStorage => get movies from the server beatfilm-movies.
//       const data = await getMoviesData()
//       await setMovies(data)
//       handleSaveToLocalStorage('search', data)
//       const filteredByKeyword = await filteredMoviesFromSearch(data, searchQuery.trim())
//       const filteredResult = await filterShortMovies(filteredByKeyword, shortMovies)
//       handleSaveToLocalStorage('searchFiltered', { filteredResult, searchQuery, shortMovies })
//       setFilteredMovies(filteredResult)
//       if (filteredResult.length === 0) {
//         setSearchMessageError(true)
//         // return;
//       }
//     }
//   } catch (error) {
//     setError(true)
//     console.error(error)
//   } finally {
//     setPreloader(false)
//     // setSearchMessageError(true)
//   }
// }
