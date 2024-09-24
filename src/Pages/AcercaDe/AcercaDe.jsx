import React from 'react'
import './AcercaDe.css'
import FotoUno from '../../assets/Fotos/Acerca de mi/CSS_Examples-removebg-preview.png'
import FotoDos from '../../assets/Fotos/Acerca de mi/2024-05-19 (1).png'
import FotoTres from '../../assets/Fotos/Acerca de mi/2024-05-19 (7).png'
import FotoCuatro from '../../assets/Fotos/Acerca de mi/2024-05-19 (3).png'
import FotoCinco from '../../assets/Fotos/Acerca de mi/2024-05-19 (6).png'
import FotoSeis from '../../assets/Fotos/Acerca de mi/2024-05-19 (8).png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLinkedin, faGoogle, faInstagram} from '@fortawesome/free-brands-svg-icons'
import { NavLink } from 'react-router-dom'
export default function AcercaDe() {
  return (
    <>
      <main className="main-infoMi">
         <h1 className="titulo-principal">Conoce un poco de Tienda Padel!</h1>
         <span className="span-principal">La tienda padel es un e-commerce que se relaciona con la moda actual que presenta en la actualidad este deporte. Esto se usó a favor para la inversión de nuevos productos innovadores, desde la paleta de última generación hasta la vestimenta que mejor se adapta. 
          Son invitados a conocer un poco de este proyecto y, también, un poco de mi.</span>
         
         <picture className="card-proyecto">
            <div className="contenedor-derecha">
                <h2 className="titulo-proyecto">Proyecto Hecho con HTML5 y CSS</h2>
                <img className="img-lenguajes" src={FotoUno} 
                title="Banner"
                alt="Imagen Banner"
                loading="lazy"/>  
            </div>
           
            <div className="contenedor-izquierda">
                <h3 className="subtitulo-proyecto">Tienda Padel</h3>
              <div className="contenedor-img">
                  <ul>
                    <li>
                      <img className="img-pag" src={FotoDos}
                      title="Banner"
                      alt="Imagen Banner"
                      loading="lazy"/>
                    </li>
                    <li>
                      
                      
                      <img src={FotoTres}  className="img-pag"
                      title="Banner"
                      alt="Imagen Banner"
                      loading="lazy"/>
                    </li>
                    <li>
                      
                      <img src={FotoCuatro}  className="img-pag"
                      title="Banner"
                      alt="Imagen Banner"
                      loading="lazy"/>
                    </li>
                    <li>
                      
                      <img src={FotoCinco} className="img-pag"
                        title="Banner"
                        alt="Imagen Banner"
                        loading="lazy"/>
                    </li>
                  </ul>
               </div>
                <span className="span-proyecto">La tienda padel es una tienda  dedicada exclusivamente a vender productos que se adaptan perfectamente al deporte, como paletas, grips, bolsos, pantalones entre otros. 
                  La idea radica en hacer algo dinámico pero minimalista, sumado a lo funcional.</span>
            </div>
        
         </picture>
        

        
         <picture className="card-mi">
                <div className="mi-izquierda">
                  <h3 className="subtitulo-mi">Conoce un poco sobre mi</h3>
                    <img src={FotoSeis}
                    title="Banner"
                    alt="Imagen Banner"
                    loading="lazy"/>
                </div>
                  
                  
                        <div className="mi-derecha">
                          <span className="span-mi">Mi nombre es Emiliano Figueroa, recibido de técnico eléctrico y actualmente estudiando full stack enginner en educación IT. 
                            Les proporciono los medios en los cuáles se me puede contactar.</span>
                          <div className="redes-mi">
                            <NavLink to="https://www.linkedin.com/in/emiliano-figueroa-a15b69304/" className="redes lkdn">
                            <FontAwesomeIcon icon={faLinkedin} ></FontAwesomeIcon>
                            </NavLink>
                            <NavLink to="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox" className="redes gmail"><FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon></NavLink>
                            <NavLink to="https://www.instagram.com/emi.ariel/" className="redes insta"><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></NavLink>
                          </div>
                      </div>
            </picture>
    </main>

    </>
  )
}
