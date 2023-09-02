import image from '../../assets/images/about-me/image.png'
import './about-me.css'

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
          {/*@todo: Text for test positions with pixel perfect. After you done - delete next section 18-20*/}
          {/*<p className="content_text">*/}
          {/*  Мне нравится веб-разработка и дизайн. Ранее работал в сфере гражданского строительства, руководил отделом планирования проекта Арктик СПГ 2 - строительства трех линий по производству сжиженного природного газа. Программирование интересовало с детства. Недавно прошел курс по веб-разработке и нахожусь в поиске работы. В свободное время занимаюсь бегом, в прошлом профессиональный триатлонист.*/}
          {/*</p>*/}
          <p className="content_text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a href='https://github.com/letStayFoolish' target='_blank' className="content_link" rel="noreferrer">GitHub</a>
        </div>

        <img src={image} alt="Profile Image" className="content__image roll-in-right"/>
      </div>
      </div>
    </section>
  )
}
export default AboutMe
