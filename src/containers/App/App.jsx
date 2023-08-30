import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";

import './app.css'
const App = () => {
  return (
    <div className='App'>
      <Header />
      {/*<Main />*/}
      <Movies />
      <Footer />
    </div>
  )
}

export default App
