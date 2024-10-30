import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import "./FormUser.css";
import useApi from "../../../services/interceptor/interceptor";

const URL = import.meta.env.VITE_SERVER_URL;
const URL2 = import.meta.env.VITE_LOCAL_SERVER;

export default function FormUser({ onFormSubmit, userEdit, setUserEdit }) {
  const api = useApi();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  async function onProductsSubmits(producto) {
    try {
      const formData = new FormData();
      formData.append("name", producto.name);
      formData.append("email", producto.email);
      formData.append("password", producto.password);
      formData.append("location", producto.location);
      if (producto.image[0]) {
        formData.append("image", producto.image[0]);
      }

      console.log(formData);

      if (userEdit) {
        const { _id: id } = userEdit;
        formData.delete("image");
        if (producto.image[0]) {
          formData.delete("image"); // Limpiar cualquier imagen anterior
          formData.append("image", producto.image[0]); // Añadir la nueva imagen
        }

        const response = await api.put(`/users/${id}`, formData);

        console.log(producto.image);

        Swal.fire({
          title: "Actualizado!",
          text: "Su producto se actualizo con exito",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        setUserEdit(null);
        reset();
        console.log(userEdit);
      } else {
        const response = await api.post(`/users`, formData);
        console.log(response.data);

        Swal.fire({
          title: "Subido!",
          text: "Su producto se subio con exito",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      reset();
      onFormSubmit();
    } catch (error) {
      console.log(errors);
    }
  }

  useEffect(() => {
    if (userEdit) {
      reset({
        name: userEdit.name,
        email: userEdit.email,
        password: userEdit.password,
        location: userEdit.location,
        image: userEdit.image,
      });
    } else {
      reset({
        name: "",
        email: "",
        password: "",
        location: "",
        image: "",
      });
    }
  }, [userEdit, reset]);

  return (
    <>
      <div className="contenedor-form">
        <div className="pelota-formulario">
          <div className="linea-pelota_formulario"></div>
        </div>
        <h1>Admin Form</h1>
        <form onSubmit={handleSubmit(onProductsSubmits)}>
          <div className="input-group">
            <label htmlFor="name">Nombre de Usuario</label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: true,
                minLength: 3,
                maxLength: 30,
              })}
            />

            {errors.name?.type === "required" && (
              <div className="input-error">El campo es requerido</div>
            )}
            {errors.name?.type === "minLength" && (
              <div className="input-error">Minimo de caracteres es 3</div>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="precio">Email de Usuario</label>
            <input
              id="precio"
              type="email"
              {...register("email", { required: true, min: "1" })}
            />

            {errors.price?.type === "required" && (
              <div className="input-error">El campo es requerido</div>
            )}
            {errors.price?.type === "min" && (
              <div className="input-error">Precio negativo</div>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="promo">Contraseña</label>
            <input
              id="promo"
              type="password"
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
            />

            {errors.password?.type && (
              <div className="input-error">{errors.password.message}</div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="section">Region</label>
            <select
              id="section"
              {...register("location", {
                required: true,
              })}
            >
              <option value="">Seleccione una Region</option>
              <option value="AR">Argentina</option>
              <option value="BR">Brasil</option>
              <option value="CH">Chile</option>
              <option value="PE">Peru</option>
              <option value="CO">Colombia</option>
              <option value="ES">España</option>
              <option value="US">Estados Unidos</option>
              <option value="UK">Inglaterra</option>
            </select>
            {errors.section && (
              <div className="input-error">La sección es requerida</div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="image">Imagen</label>
            <input
              accept="image/*"
              id="image"
              type="file"
              {...register("image", { required: false })}
            />
            {errors.image && (
              <div className="input-error">La imagen es requerida</div>
            )}
          </div>

          {userEdit ? (
            <>
              <button
                className="btn-form-admin"
                type="submit"
                disabled={!isValid}
              >
                Editar Producto
              </button>
              <button
                className=" btn-cancelar"
                onClick={(e) => {
                  e.preventDefault();
                  reset();
                  setUserEdit(null);
                }}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              className="btn-form-admin"
              type="submit"
              disabled={!isValid}
            >
              Cargar Producto
            </button>
          )}
        </form>
        <div className="pelota-formulario-dos">
          <div className="linea-pelota_formulario-dos"></div>
        </div>
      </div>
    </>
  );
}
