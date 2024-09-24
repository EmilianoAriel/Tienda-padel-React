import React from 'react'
import './Contacto.css'
import imagenBanner from '../../assets/Fotos/Baner/normal_WhatsApp_Image_2022-10-06_at_6.10.09_PM.jpg'
export default function Contacto() {
  return (
    <>
        <section >
            <picture className="banner-contact">
                <img src={imagenBanner} className="img-banner-contact"
                title="Banner"
                alt="Imagen Banner"
                loading="lazy"
                />

            </picture>
        </section>
        

      <main className="main-contact">
        <div className="div-contact">
        <h1 className="titulo-contacto">Contactanos!</h1>
         <form action="">  
            <label htmlFor="name">Nombre:</label> 
                <input type="text" className="input-contact" minlength="4" maxlength="100" autocomplete="on" id="name" name="name" required/>
            
            <label htmlFor="mail">Mail</label>
                <input type="email" className="input-contact" id="mail" name="mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required/>
            
            <label htmlFor="text"className="input-contact">Deje su comentario</label> 
                <textarea className='textareaContact' minlength="4" maxlength="150" id="text" name="text" required/>
                
    
                <button className="pelota" name="boton" id="boton">
                  <div className="linea izq"></div>
                       Contactar
                  <div className="linea der"></div>
                </button>
            
            </form> 
        </div>
        <div className="maps">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d976.3053596654415!2d-58.528156331459165!3d-34.60702619074277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb7c30a2622bf%3A0x1dcfc808526151c4!2sStock%20Center!5e0!3m2!1ses-419!2sar!4v1715912827321!5m2!1ses-419!2sar" 
            width="600" 
            height="450" 
            style={{ border:0 }} 
            allowfullscreen 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
            className="mapa">
            
            </iframe>
        </div>
      
      
      </main>
    </>
  )
}
