import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './search-form.css'
const SearchForm = ({ searchInputRef, handleSearch, searchQuery }) => {
  return (
    <div className='search-form'>
      <div className="search-form__wrapper">
        <div className="search-form__container">
          <div className="search-form__input">
            <input
              type="text"
              ref={searchInputRef}
              minLength={1}
              placeholder='Фильм'
              required
            />
            <button type='submit' onClick={handleSearch} >Поиск</button>
          </div>
          <FilterCheckbox />
        </div>
      </div>
    </div>
  )
}
export default SearchForm
