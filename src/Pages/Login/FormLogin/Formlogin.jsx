import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../../context/UserContext";
import { NavLink } from "react-router-dom";

export default function Formlogin({ change }) {
  const { login } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  function handleLogin(data) {
    login(data);
  }

  return (
    <>
      <div className="contenedor-registro">
        <h1 className="titulo-registro">Login</h1>
        <hr />
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="input-register">
            <input
              type="email"
              id="email"
              placeholder=""
              {...register("email", {
                required: true,
              })}
              className={errors.email ? "class-error" : ""}
            />
            <label htmlFor="email" className={errors.mail ? "error" : ""}>
              Correo Electronico
              <FontAwesomeIcon icon={faEnvelope} />
            </label>
          </div>
          {errors.mail?.type === "required" && (
            <div className="input-error">El campo es requerido</div>
          )}

          <div className="input-register">
            <input
              type="password"
              id="password"
              placeholder=""
              {...register("password", {
                required: "La contraseña es requerida",
              })}
              className={errors.password ? "class-error" : ""}
            />
            <label
              htmlFor="password"
              className={errors.password ? "error" : ""}
            >
              Contraseña <FontAwesomeIcon icon={faLock} />
            </label>
          </div>
          {errors.password?.type && (
            <div className="input-error">{errors.password.message}</div>
          )}
          <button type="submit" className="btn-insc" disabled={!isValid}>
            Iniciar Sesion
          </button>
        </form>

        <NavLink className="btn-IS" to="/registro">
          Registrarse
        </NavLink>
      </div>
    </>
  );
}
