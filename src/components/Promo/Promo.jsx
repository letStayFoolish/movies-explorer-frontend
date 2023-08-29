import './promo.css'
import image from "../../assets/images/header/image.png";

const Text = 'Учебный проект студента факультета \n Веб-разработки.'

const Promo = () => {
  return (
    <section className='promo'>
      <div className="promo__wrapper wrapper">
        <div className="promo__content content puff-in-center">
          <h1 className="content_heading new-line">
            {Text}
          </h1>
          <p>
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <button type='button' className='jello-horizontal'>
            <a href="#about-project">Узнать больше</a>
          </button>
        </div>
        <div className="promo__image image puff-in-center">
          <img src={image} alt="Planet Earth Image"/>
        </div>
      </div>
    </section>
  )
}
export default Promo
