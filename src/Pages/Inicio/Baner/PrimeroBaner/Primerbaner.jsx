import React from 'react'
import './Primerbaner.css'
import primerBaner from '../../../../assets/Fotos/Baner/eng_LPpumafaster-1.jpg'
export default function PrimerBaner () {
  return (
    <>
    <section className="section-banner">
        <picture>
            <img src={primerBaner} className="img-banner"
            title="Banner"
            alt="Imagen Banner"
            loading="lazy"
            />

        </picture>
        <div className="msj-banner">
            <h2 className="titulo-banner">En tienda padel</h2>
            <span className="span-banner">"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi culpa ipsam in odit soluta facere minima? Maxime expedita laboriosam vero dolor eveniet, hic, non maiores aliquam voluptas porro provident delectus!
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda, itaque. Consectetur magnam architecto obcaecati debitis quia ipsam commodi voluptates quaerat amet ipsum quasi reprehenderit pariatur, provident, error saepe rerum. Quibusdam.
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit molestias nobis non dicta minus dolor animi! Sunt, iste eaque? Hic veniam unde consequuntur ipsa magni earum iste aliquid, dolores repudiandae."
            </span>
        </div>
    </section>
    </>
  )
}
