import './techs.css'
const Techs = () => {
  return (
    <div className='techs'>
      <div className="techs__wrapper">
        <div className="techs__top">
          <h3>
            Технологии
          </h3>
        </div>

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
    </div>
  )
}
export default Techs
