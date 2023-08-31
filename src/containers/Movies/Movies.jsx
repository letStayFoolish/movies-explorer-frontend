import { movies } from '../../utils/constants'
import SearchForm from "../../components/SearchForm/SearchForm";
import './movies.css'
import Pagination from "../../components/Pagination/Pagination";

const Movies = () => {
  return (
    <div className='movies'>
      <SearchForm />
      <Pagination cards={movies} biggerScreen={12} midScreen={8} smallScreen={5} />
    </div>
  )
}
export default Movies
