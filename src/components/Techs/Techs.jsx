import './techs.css'
const Techs = () => {
  return (
    <section className='techs'>
      <div className="techs__wrapper">
        <h3 className="techs__top">
          Технологии
        </h3>

        <div className="techs__content content">
          <h4 className="content_heading">7 технологий</h4>
          <p className="content_text">
            На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
          </p>

          <div className="content__stack">
            <div>HTML</div>
            <div>CSS</div>
            <div>JS</div>
            <div>React</div>
            <div>Git</div>
            <div>Express.js</div>
            <div>MongoDB</div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Techs
