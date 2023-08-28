import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

import './main.css'

const Main = () => {
  return (
    <main className='main' >

      <Promo />
      {/*<NavTab />*/}
      {/*<AboutProject />*/}
      <Techs />
      <AboutMe />
      <Portfolio />

    </main>
  )
}
export default Main
