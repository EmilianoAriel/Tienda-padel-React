import React from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import logoImg from "../../assets/Fotos/Baner/Tienda-removebg-preview.png";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useOrder } from "../../context/OrderContext";
import Modal from "../PopUp/PopUp";
import PopUp from "../PopUp/PopUp";
import { useUser } from "../../context/UserContext";

const URL = import.meta.env.VITE_LOCAL_SERVER;

export default function NavBar({ setModal, showModal }) {
  const { user, logout } = useUser();
  const location = useLocation();
  const isDetalle = location.pathname.startsWith("/detalles");
  const { setToggleModal, count } = useOrder();

  return (
    <>
      <header className={isDetalle ? "main-header nav-block" : "main-header"}>
        <input type="checkbox" id="responsive-menu" className="input-burger" />
        <label className="burger-menu" htmlFor="responsive-menu">
          <div className="burger-line"></div>
        </label>
        <nav className="main-nav">
          <img
            className="logo-nav"
            src={logoImg}
            title="Banner"
            alt="Imagen Banner"
            loading="lazy"
          />
          <div className="div-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  PRINCIPAL
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/contacto">
                  CONTACTO{" "}
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/acercaDe">
                  ACERCA DE
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/registro">
                  REGISTRO
                </NavLink>
              </li>

              {user?.role === "admin" && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/adminProdu">
                    ADMIN PRODUCTO
                  </NavLink>
                </li>
              )}

              {user?.role === "admin" && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/adminUser">
                    ADMIN USERS
                  </NavLink>
                </li>
              )}

              {user?.role === "admin" && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/categories">
                    ADMIN CATEGORIAS
                  </NavLink>
                </li>
              )}

              {user ? (
                <li className="nav-item">
                  <NavLink className="nav-link" onClick={logout}>
                    LOGOUT
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    LOGIN
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <div className="user-info">
          <div className="order">
            {count > 0 && <div className="order-count">{count}</div>}
            <FontAwesomeIcon
              icon={faCartShopping}
              className="cart"
              onClick={() => setToggleModal((estado) => !estado)}
            />
          </div>
          <div className="contenedor-user">
            {user ? (
              <>
                {user.name}
                <img
                  src={`${URL}/images/users/${user.image}`}
                  alt="imagen de usuario"
                  className="nav-image"
                />
              </>
            ) : (
              <NavLink className="nav-link" to="/login">
                Iniciar sesion
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <PopUp />
    </>
  );
}
