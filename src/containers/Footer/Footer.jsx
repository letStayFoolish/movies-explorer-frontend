import './footer.css'
const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className='footer'>
      <div className="footer__wrapper">
        <div className="footer__text">
          <h4 className="footer__text_main">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </h4>
        </div>

        <nav className="footer__navigation">
          <p className="footer_year">
            © {year}
          </p>

          <ul>
            <li><a href="https://practicum.yandex.ru/" target='_blank' rel="noreferrer">Яндекс.Практикум</a></li>
            <li><a href="https://github.com/letStayFoolish" target='_blank' rel="noreferrer">GitHub</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
export default Footer
