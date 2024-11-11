import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detalles.css";
import { formatPrice } from "../../Utilis/formatPrice";
import { useOrder } from "../../context/OrderContext";
import useApi from "../../services/interceptor/interceptor";

const URL = import.meta.env.VITE_LOCAL_SERVER;

const imgPrueba =
  "https://glistening-cascaron-d3b657.netlify.app/Fotos/Paletas%20padel/Paleta%20training%20control%2020.jpg";

export default function Detalles() {
  const { addProduct } = useOrder();
  const [product, setProduct] = useState([]);
  const [contador, setContador] = useState(1);
  const [imagenPrincipal, setImagenPrincipal] = useState([]);
  const { id } = useParams();
  const api = useApi();

  async function getProductsCards() {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data.product);
      console.log(response.data.product);
    } catch (error) {}
  }
  function Suma() {
    setContador(contador + 1);
  }

  function Resta() {
    if (contador > 1) {
      setContador(contador - 1);
    } else {
      setContador(1);
    }
  }

  useEffect(() => {
    Suma();
    Resta();
  }, []);

  useEffect(() => {
    getProductsCards();
  }, []);

  useEffect(() => {
    setContador(1);
  }, [addProduct]);

  function changeImage(src) {
    setImagenPrincipal(src);
  }
  useEffect(() => {
    changeImage();
  }, []);

  return (
    <>
      <div className="card-info_produ">
        <div className="imagen-produ">
          <img
            src={
              imagenPrincipal
                ? imagenPrincipal
                : `${URL}/images/products/${product.image}`
            }
            alt={product.name}
            className="imagen-detalle_principal"
            id="imagen-principal"
          />
        </div>
        <div className="card-detalle">
          <div className="info-produ">
            <div className="titulo-info">
              <span id="categoria-objeto">{product.type}</span>
              <h1 id="nombre-principal">{product.name}</h1>
            </div>
            <div className="precio-info">
              <div className="precio-producto">
                {product.promo ? (
                  <>
                    <h2>{formatPrice(product.promo)}</h2>
                    <h4>{formatPrice(product.price)}</h4>
                  </>
                ) : (
                  <h2>{formatPrice(product.price)}</h2>
                )}
              </div>
              <span>{product.description}</span>
            </div>
          </div>
          <div className="footer-produ">
            <span>Cantidad</span>
            <div className="primer-fila_footer">
              <div className="botonera">
                <div className="boton-cantidad">
                  <button className="boton-resta" onClick={Resta}>
                    -
                  </button>
                  <span className="contador">{contador}</span>
                  <button className="boton-suma" onClick={Suma}>
                    +
                  </button>
                </div>
              </div>
              <div className="color-producto">
                <div className="color-producto">
                  <div className="color-uno img-color">
                    <img
                      src={`${URL}/images/products/${product.image}`}
                      id="imagen-principal"
                      alt=""
                      className="imagen-color activo"
                      onClick={() =>
                        changeImage(`${URL}/images/products/${product.image}`)
                      }
                    />
                  </div>
                  <div className="color-dos img-color">
                    <img
                      src={imgPrueba}
                      alt=""
                      className="imagen-color"
                      onClick={() => changeImage(imgPrueba)}
                    />
                  </div>
                  <div className="color-tres img-color">
                    <img
                      src={imgPrueba}
                      alt=""
                      className="imagen-color"
                      onClick={() => changeImage(imgPrueba)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-btn">
              <button
                className="btn-añadir"
                onClick={() => addProduct(product, contador)}
              >
                Añadir al carrito
              </button>
              <button className="btn-comprar">Comprar ahora</button>
            </div>
          </div>
        </div>
      </div>
      <div className="info-completa">
        <h3 id="nombre-principal">{product.name}</h3>
        <span>
          {product.description}
          {product.description}
          {product.description}
          {product.description}
          {product.description}
          {product.description}
          {product.description}
          {product.description}
        </span>
      </div>
    </>
  );
}
