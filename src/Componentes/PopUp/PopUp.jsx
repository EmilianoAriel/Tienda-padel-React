import React, { useEffect, useState } from "react";
import { useOrder } from "../../context/OrderContext";
import "./PopUp.css";
import Pop from "./Pop/Pop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function PopUp() {
  const { popUp, popVisible, cantidadPop, setToggleModal } = useOrder();

  useEffect(() => {}, [popUp]);

  return (
    <>
      <div className={`contenedor-total-pop `}>
        <div
          className={
            popVisible ? "contenedor-popup activo" : "contenedor-popup"
          }
        >
          <h3>Agregado al carrito</h3>
          {popUp ? (
            <Pop key={popUp.id} product={popUp} cantidad={cantidadPop} />
          ) : (
            ""
          )}

          <button
            className="btn-pop"
            onClick={() => setToggleModal(estado => !estado)}
          >
            Ir al carrito <FontAwesomeIcon icon={faCartShopping} />
          </button>
        </div>
      </div>
    </>
  );
}
