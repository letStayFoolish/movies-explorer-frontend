import Promo from "../../components/Promo/Promo";
import Techs from "../../components/Techs/Techs";
import AboutMe from "../../components/AboutMe/AboutMe";
import Portfolio from "../../components/Portfolio/Portfolio";
import AboutProject from "../../components/AboutProject/AboutProject";

// import './main.css'

const Main = () => {
  return (
    <main>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  )
}
export default Main
