import React from "react";
import { useOrder } from "../../../context/OrderContext";

export default function Pop({ product, cantidad }) {
  const { contador } = useOrder();

  return (
    <>
      <div className="contenedor-mensaje-pop">
        <div className="header-pop">
          <img src={product.image} alt="" />
        </div>
        <div className="body-pop">
          <div className="title-pop">{product.name}</div>
          <div className="sub-title-pop">{product.type}</div>
        </div>
        <div className="footer-pop">{cantidad}</div>
      </div>
    </>
  );
}
