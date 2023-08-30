import React from 'react'
import Switch from "../Switch/Switch";

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
              // minLength={''}
              // maxLength={''}
              // required={}
              placeholder='Фильм'
            />
            <button type='button'>Поиск</button>
          </div>
          <div className="search-form__switch">
            <Switch />
            <p>Короткометражки</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SearchForm
