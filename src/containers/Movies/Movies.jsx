import { movies } from '../../utils/constants'

import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesCard from "../../components/MoviesCard/MoviesCard";

import './movies.css'
const Movies = () => {
  const baseURL = 'https://api.nomoreparties.co'

  return (
    <div className='movies'>
      <SearchForm />
      <div className="movies__wrapper">
        <div className="movies__container">
          { movies.map((movie, _index) => (
            <MoviesCard
              key={_index}
              title={movie.nameRU}
              duration={movie.duration}
              poster={`${baseURL}/${movie.image.url}`}
              id={movie.id}
            />
          ))}
        </div>
        <button type='button' className='movies__btn-more'>Ещё</button>
      </div>
    </div>
  )
}
export default Movies
