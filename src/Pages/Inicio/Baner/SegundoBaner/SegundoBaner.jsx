import React from "react";
import Hombre from "../../../../assets/Fotos/Baner/70911e2c-839d-4ee9-a600-0d3e80576481.jpg";
import Mujer from "../../../../assets/Fotos/Baner/7cd05f0a-3d4a-46cd-b733-01e427517fc1.jpg";
import niños from "../../../../assets/Fotos/Baner/ddaea82f-fe2a-4145-889c-cf85039c3f24.jpg";
import "../SegundoBaner/SegundoBaner.css";
export default function SegundoBaner() {
  return (
    <>
      <section className="section-banner-hmn">
        <div className="msj-banner msj-dos">
          <h2 className="titulo-banner titulo-dos">
            Contamos con prendas para todos los estilos
          </h2>
          <span className="span-banner">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
            incidunt consequatur, similique in eos soluta eius numquam nemo ab
            harum, veritatis aliquam suscipit, id saepe perspiciatis ad vitae?
            Numquam, iure. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Repudiandae molestias reprehenderit eligendi officia. Error
            est qui hic voluptatem officiis quos temporibus quaerat, asperiores
            numquam laborum commodi! Id neque debitis quis?
          </span>
        </div>

        <picture className="contenedor-img-banner">
          <img
            src={Hombre}
            className="hombre"
            title="Pelota"
            alt="Baner hombre"
            loading="lazy"
          />
          <img
            src={Mujer}
            className="mujer"
            title="Pelota"
            alt="Imagen Pelota"
            loading="lazy"
          />
          <img
            src={niños}
            alt=""
            className="joven"
            title="Pelota"
            loading="lazy"
          />
        </picture>
      </section>
    </>
  );
}
