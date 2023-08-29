import './about-me.css'
import image from '../../assets/images/about-me/image.png'
const AboutMe = () => {
  return (
    <section className='about-me'>
      <div className="about-me__wrapper">
        <div className="about-me__heading">
          <h3>
            Студент
          </h3>
        </div>

      <div className="about-me__content content">
        <div className="content__text">
          <h4 className='content_name'>Неманя</h4>
          <h5 className='content_about'>Фронтенд-разработчик, 30 лет</h5>
          <p className="content_text">
            Мне нравится веб-разработка и дизайн. Ранее работал в сфере гражданского строительства, руководил отделом планирования проекта Арктик СПГ 2 - строительства трех линий по производству сжиженного природного газа. Программирование интересовало с детства. Недавно прошел курс по веб-разработке и нахожусь в поиске работы. В свободное время занимаюсь бегом, в прошлом профессиональный триатлонист.
          </p>
          <a href='https://github.com/letStayFoolish' className="content_link">GitHub</a>
        </div>

        <div className="content__image">
          <img src={image} alt="Profile Image"/>
        </div>
      </div>
      </div>
    </section>
  )
}
export default AboutMe
