import { Outlet } from 'react-router-dom';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import './app.css'

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
