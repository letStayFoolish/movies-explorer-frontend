import Projects from '../Projects/Projects'

import './portfolio.css'
const Portfolio = () => {
  return (
    <section className='portfolio'>
      <div className="portfolio__wrapper">
        <h4 className="portfolio__heading">
          Портфолио
        </h4>

        <div className="portfolio__projects">
          <Projects />
        </div>
      </div>
    </section>
  )
}
export default Portfolio
