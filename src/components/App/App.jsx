import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import './app.css'
const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <Header />

      <Main />
      <Footer />
    </div>
  )
}

export default App