import './about-project.css'
const AboutProject = () => {
  return (
    <section id='about-project' className='about-project'>
      <div className="about-project__wrapper">
        <h3 className="about-project__about">
          О проекте
        </h3>

        <div className="about-project__content content">
          <div className="content__column">
            <h4 className="content_heading">
              Дипломный проект включал 5 этапов
            </h4>
            <p className="content_text">
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </div>
          <div className="content__column">
            <h4 className="content_heading">
              На выполнение диплома ушло 5 недель
            </h4>
            <p className="content_text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>

        <div className="content_timeline timeline">
          <div className="timeline__first-week">
            <div className="first-week_box first-week_box_color_green">1 неделя</div>
            <p>Back-end</p>
          </div>

          <div className="timeline__second-week">
            <div className="first-week_box first-week_box_color_dark">4 недели</div>
            <p>Front-end</p>
          </div>
        </div>
      </div>
    </section>
  )
}
export default AboutProject
