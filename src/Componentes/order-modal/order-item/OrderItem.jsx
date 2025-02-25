import React from "react";
import "./OrderItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "../../../context/OrderContext";
import { formatPrice } from "../../../Utilis/formatPrice";

const URL = import.meta.env.VITE_LOCAL_SERVER;
export default function OrderItem({ item }) {
  const { delateProduct, removeProduct, sumProduct } = useOrder();
  return (
    <>
      <li className="order-item">
        <div className="item-image">
          <img src={`${URL}/images/products/${item.image}`} alt="imagen" />
        </div>
        <div className="item-info">
          <div className="item-name">{item.name}</div>
          <div className="item-buttons">
            <button
              className="btn-info-order"
              onClick={() => removeProduct(item._id)}
            >
              Eliminar
            </button>
            <button className="btn-info-order">Comprar ahora</button>
          </div>
        </div>
        <div className="item-count">
          {item.quantity > 1 ? (
            <button className="btn-count" onClick={() => delateProduct(item)}>
              -
            </button>
          ) : (
            <button
              className="btn-count desactive"
              onClick={() => delateProduct(item)}
            >
              -
            </button>
          )}

          {item.quantity}

          <button className="btn-count" onClick={() => sumProduct(item)}>
            +
          </button>
        </div>

        <div className="item-price">
          {item.promo ? formatPrice(item.promo) : formatPrice(item.price)}
        </div>
      </li>
    </>
  );
}
