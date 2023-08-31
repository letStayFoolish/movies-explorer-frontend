import {Outlet, useLocation} from 'react-router-dom';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import './app.css'

const App = () => {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <div className='App'>
      <Header />
      <Outlet />
      {pathname !== '/profile' && <Footer />}
    </div>
  )
}

export default App
