import React from 'react'
import './main.css'
import {AboutMe, AboutProject, NavTab, Portfolio, Promo, Techs} from "../index";
const Main = () => {
  return (
    <main className='main' >

      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />

    </main>
  )
}
export default Main
