import React from "react";
import "./FooterInicio.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadset,
  faRankingStar,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";

export default function FooterInicio() {
  return (
    <>
      <div className="pie-main">
        <div className="info-pie primario">
          <FontAwesomeIcon icon={faRankingStar} />
          <span className="span-pie">Las mejores paletas del mercado</span>
        </div>
        <div className="info-pie secundario">
          <FontAwesomeIcon icon={faHeadset} />
          <span className="span-pie">Atencion las 24hs por la pagina</span>
        </div>
        <div className="info-pie primario">
          <FontAwesomeIcon icon={faTruckFast} />
          <span className="span-pie">Entrega a domicilio</span>
        </div>
      </div>
    </>
  );
}
