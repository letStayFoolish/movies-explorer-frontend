import React from 'react'
// Styles
import './filter-checkbox.css'

const FilterCheckbox = ({ onCheckbox, shortMovies, setShortMovies }) => {
  const handleOnChange = () => {
    const stateShortMovies = !shortMovies
    setShortMovies(stateShortMovies)
    onCheckbox(stateShortMovies)
  }

  return (
  <div className="filter-checkbox search-form__switch">
    <label className='switch'>
      <input type='checkbox' checked={shortMovies} onChange={handleOnChange} className={shortMovies ? 'active' : null} />
      <span className={shortMovies ? 'slider slider_active' : 'slider'} ></span>
    </label>
    <p>Короткометражки</p>
  </div>
  )
}
export default FilterCheckbox
