import React from "react";
import { useForm } from "react-hook-form";
import "./FormRegister.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import useApi from "../../../services/interceptor/interceptor";

const URL = import.meta.env.VITE_SERVER_URL;

export default function FormRegister({ change }) {
  const api = useApi();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: "onChange" });

  async function onUserSubmit(user) {
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("location", user.location);
      formData.append("bornDate", user.bornDate);
      if (user.image[0]) {
        formData.append("image", user.image[0]);
      }

      const response = await api.post(`/users`, formData);

      // if (response.status === 200) {
      // }
      Swal.fire({
        title: "Registrado!",
        text: "Registrado con éxito",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  }

  return (
    <>
      <div className="contenedor-registro">
        <h1 className="titulo-registro">Registro</h1>
        <hr />
        <form onSubmit={handleSubmit(onUserSubmit)}>
          <div className="input-register">
            <input
              type="text"
              id="name"
              placeholder=""
              {...register("name", {
                required: true,
                minLength: 3,
                maxLength: 30,
              })}
              className={errors.name ? "class-error" : ""}
            />
            <label className={errors.name ? "error" : ""} htmlFor="name">
              Nombre <FontAwesomeIcon icon={faUser} />
            </label>
          </div>
          {errors.name?.type === "required" && (
            <div className="input-error">El campo es requerido</div>
          )}
          {errors.name?.type === "minLength" && (
            <div className="input-error">Minimo de caracteres es 3</div>
          )}

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
            <label htmlFor="mail" className={errors.email ? "error" : ""}>
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
                minLength: {
                  value: 6,
                  message: "Mínimo 6 caracteres",
                },
                maxLength: {
                  value: 12,
                  message: "Máximo 12 caracteres",
                },
                validate: {
                  hasUpperCase: (value) =>
                    /[A-Z]/.test(value) ||
                    "Debe tener al menos una letra mayúscula",
                  hasNumber: (value) =>
                    /\d/.test(value) || "Debe tener al menos un número",
                },
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

          <div className="input-register">
            <input
              type="password"
              id="confirm"
              placeholder=""
              {...register("confirm", {
                required: true,
                validate: (value) => value === watch("password"),
              })}
              className={errors.confirm ? "class-error" : ""}
            />
            <label htmlFor="confirm" className={errors.confirm ? "error" : ""}>
              Repita Contraseña
            </label>
          </div>
          {errors.confirm?.type === "validate" && (
            <div className="input-error">Las contraseñas no coinciden</div>
          )}
          <div className="input-register">
            <select
              name=""
              id="location"
              placeholder=""
              {...register("location", {
                required: true,
              })}
            >
              <option value="AR">Argentina</option>
              <option value="BR">Brasil</option>
              <option value="CH">Chile</option>
              <option value="PE">Peru</option>
              <option value="CO">Colombia</option>
              <option value="ES">España</option>
              <option value="US">Estados Unidos</option>
              <option value="UK">Inglaterra</option>
            </select>
            <label htmlFor="location">Seleccione un Pais</label>
          </div>

          <div className="input-register">
            <input
              type="file"
              name="image"
              id="image"
              placeholder=""
              {...register("image", { required: false })}
              className={errors.image ? "class-error" : ""}
            />
            <label htmlFor="image" className={errors.image ? "error" : ""}>
              Coloque su imagen
            </label>
          </div>
          {errors.image?.type === "required" && (
            <div className="input-error">El campo es requerido</div>
          )}

          <div className="input-register">
            <input
              type="date"
              name="date"
              id="date"
              placeholder=""
              {...register("bornDate", { required: true })}
              className={errors.bornDate ? "class-error" : ""}
            />
            <label
              htmlFor="bornDate"
              className={errors.bornDate ? "error" : ""}
            >
              Coloque Fecha
            </label>
          </div>
          {errors.image?.type === "required" && (
            <div className="input-error">El campo es requerido</div>
          )}
          <button type="submit" className="btn-insc" disabled={!isValid}>
            Registrese
          </button>
        </form>
        <button className="btn-IS" onClick={() => change()}>
          Iniciar Sesion
        </button>
      </div>
    </>
  );
}
