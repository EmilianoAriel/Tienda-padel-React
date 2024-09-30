import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { formatPrice } from "../Utilis/formatPrice";
import "./card.css";
import { useOrder } from "../context/OrderContext";

export default function Card({ product }) {
  const { addProduct, callPopUp } = useOrder();
  return (
    <article className="articulo-card">
      <div className="header-card">
        <div className="colores">
          <div className="color red"></div>
          <div className="color green"></div>
          <div className="color blue"></div>
        </div>
        <div className="contenedor-img">
          <div className="descuento"></div>
          <picture>
            <img
              className="img-producto"
              id="imagen-producto"
              src={product.image}
              title={product.name}
              alt={`Imagen ${product.name}`}
              loading="lazy"
            />
          </picture>
        </div>
      </div>

      <div className="body-card">
        <div className="info-producto">
          <div className="tipo-producto">
            <span className="span-producto" id="tipo-producto">
              {product.type}
            </span>
          </div>
          <div className="estrellas"></div>
        </div>
        <hr />
        <div className="titulo-producto">
          <NavLink
            className="link-producto"
            id="titulo-producto"
            to={`/detalles/${product.id}`}
          >
            {product.name}
          </NavLink>
        </div>
        <div className="precios">
          {product.promo.trim() !== "" ? (
            <div className="precio">
              <span className="span-precio" id="precio-promo">
                {formatPrice(product.promo)}
              </span>
              <span className="span-precio tachado" id="precio-base">
                {formatPrice(product.price)}
              </span>
            </div>
          ) : (
            <div className="precio">
              <span className="span-precio" id="precio-base">
                {formatPrice(product.price)}
              </span>
            </div>
          )}
          <div className="precio-cuotas">
            <span className="span-cuotas">{product.cuotas}</span>
          </div>
        </div>
      </div>

      <div className="footer-card">
        <button className="btn-footer comprar">Comprar</button>
        <button className="btn-footer guardar">
          <FontAwesomeIcon icon={faBookmark} />
        </button>
        <button
          className="btn-footer carrito"
          onClick={() => {
            addProduct(product);
            // callPopUp(product);
          }}
        >
          <FontAwesomeIcon icon={faCartPlus} />
        </button>
      </div>
    </article>
  );
}
