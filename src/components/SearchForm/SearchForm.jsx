import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './search-form.css'
const SearchForm = () => {
  return (
    <div className='search-form'>
      <div className="search-form__wrapper">
        <div className="search-form__container">
          <div className="search-form__input">
            <input
              type="text"
              // name={''}
              // id={''}
              // onChange={''}
              minLength={1}
              placeholder='Фильм'
              required={true}
            />
            <button type='button'>Поиск</button>
          </div>
          <FilterCheckbox />
        </div>
      </div>
    </div>
  )
}
export default SearchForm
