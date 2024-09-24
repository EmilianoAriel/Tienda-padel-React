import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons' 
import logoImg from '../../assets/Fotos/Baner/Tienda-removebg-preview.png'
import './Footer.css'
import { useLocation } from 'react-router-dom'

export default function Footer() {
  const location = useLocation()
  const isAcercaDe = location.pathname === '/acercaDe'
  return (
    <>
      <footer className={ isAcercaDe ? 'footer-dark' : ''}>
        <div className="div-footer">
          <h2>¡Seguinos en nuestras Redes!</h2>
          <div className="footer-redes">
            <a href="" className="face redes">
              <FontAwesomeIcon icon={faFacebook} className='icon' />
            </a>
            <a href="" className="insta redes">
              <FontAwesomeIcon icon={faInstagram} className='icon' />
            </a>
            <a href="" className="twit redes">
              <FontAwesomeIcon icon={faXTwitter} className='icon' />
            </a>
          </div>
        </div>

        <div className="logo">
          <a href="">
            <picture>
              <img src={logoImg}
                   title="Pelota"
                   alt="Imagen Pelota"
                   loading="lazy"/>
            </picture>
          </a>
        </div>

        <div className="info div-footer">
          <ul className="lista-info">
            <li><FontAwesomeIcon icon={faPhone} className="phone" />1131022322</li>
            <li><FontAwesomeIcon icon={faLocationDot} className="ubi" />Calle Falsa 123</li>
            <li><FontAwesomeIcon icon={faClock} className="clock" />
              <span className="span-footer">Horarios lunes a viernes de 09hs a 18hs, fines de semanas y feriados hasta las 12hs</span>
            </li>
          </ul>
        </div>
      </footer>
    </>
  )
}
