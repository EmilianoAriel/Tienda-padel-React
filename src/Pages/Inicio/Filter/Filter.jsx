import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faArrowDownAZ,
  faArrowDownUpAcrossLine,
  faArrowDownShortWide,
  faArrowDownZA,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import "./Filter.css";
import { useOrder } from "../../../context/OrderContext";
export default function Filtros({ filtrar }) {
  const { filters } = useOrder();
  console.log(filters);
  return (
    <>
      <main className="main-articulo">
        <h1 className="titulo">
          Productos <span>Destacados </span>
        </h1>

        <div className="filters">
          <div className="filter-categori">
            <input
              type="checkbox"
              name=""
              id="label-categori"
              className="lista-desplegable"
            />
            <label htmlFor="label-categori" className="label-filtro">
              <FontAwesomeIcon icon={faFilter} className="icono-filtro" />
              <span>Filtro</span>
            </label>
            <ul>
              {filters.map(filter => (
                <li key={filter}>
                  <input
                    type="checkbox"
                    name={filter}
                    id={filter}
                    className="categoria"
                    onChange={() => filtrar(filter)}
                  />
                  <label htmlFor={filter}>{filter}</label>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-order">
            <input
              type="checkbox"
              name=""
              id="label-order"
              className="lista-desplegable"
            />
            <label htmlFor="label-order" className="label-order">
              <FontAwesomeIcon
                icon={faArrowDownUpAcrossLine}
                className="icono-orden"
              />
              <span>Ordenar Por</span>
            </label>
            <ul className="list-price">
              <li>
                <input
                  type="radio"
                  name="name"
                  id="max-price"
                  data-sort="des"
                  data-property="precio"
                  className="input-orden"
                />
                <label htmlFor="max-price">
                  <FontAwesomeIcon icon={faArrowDownWideShort} />
                  Precios Mas Altos
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  name="name"
                  id="min-price"
                  data-sort="asc"
                  data-property="precio"
                  className="input-orden"
                />
                <label htmlFor="min-price">
                  <FontAwesomeIcon icon={faArrowDownShortWide} />
                  Precios Mas Bajos
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  name="name"
                  id="nombre-cres"
                  data-sort="asc"
                  data-property="nombre"
                  className="input-orden"
                />
                <label htmlFor="nombre-cres">
                  <FontAwesomeIcon icon={faArrowDownAZ} />
                  A-Z
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  name="name"
                  id="nombre-des"
                  data-sort="desc"
                  data-property="nombre"
                  className="input-orden"
                />
                <label htmlFor="nombre-des">
                  <FontAwesomeIcon icon={faArrowDownZA} />
                  Z-A
                </label>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
