import React from "react";
import "./OrderModal.css";
import { useOrder } from "../../context/OrderContext";
import OrderItem from "./order-item/OrderItem";
import { formatPrice } from "../../Utilis/formatPrice";
import { MagicMotion } from "react-magic-motion";

export default function OrderModal() {
  const { order, toggleModal, setToggleModal, total } = useOrder();

  if (!toggleModal) return;
  return (
    <div className="modal-overlay" onClick={() => setToggleModal(!toggleModal)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">Carrito de compras</div>
        <MagicMotion>
          <div className="modal-body">
            <ul className="order-list">
              {order.map(item => (
                <OrderItem key={item.id} item={item} />
              ))}

              <li className="list-total">
                <span className="span-total">Total:</span>
                {order.length > 0 ? (
                  <span className="span-order-price">{formatPrice(total)}</span>
                ) : (
                  <span className="span-order-price">{formatPrice(0)}</span>
                )}
              </li>
            </ul>
          </div>
        </MagicMotion>
        <div className="modal-footer">
          <button
            className="btn-modal cerrar"
            onClick={() => setToggleModal(!toggleModal)}
          >
            Cerrar
          </button>
          <button className="btn-modal finalizar">Finalizar compra</button>
        </div>
      </div>
    </div>
  );
}
