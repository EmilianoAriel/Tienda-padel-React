import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import "./FormUser.css";

const URL = import.meta.env.VITE_SERVER_URL;

export default function FormUser({ onFormSubmit, userEdit, setUserEdit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  async function onProductsSubmits(producto) {
    try {
      if (userEdit) {
        const { id } = userEdit;
        const response = await axios.put(`${URL}/Users/${id}`, producto);

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
        const response = await axios.post(`${URL}/Users`, producto);
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
        mail: userEdit.mail,
        password: userEdit.password,
        section: userEdit.country,
        type: userEdit.type,
        image: userEdit.image,
      });
    } else {
      reset({
        name: "",
        mail: "",
        password: "",
        section: "",
        type: "",
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
              {...register("name", { required: true, minLength: 3 })}
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
              {...register("mail", { required: true, min: "1" })}
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
                min: "1",
              })}
            />

            {errors.promo?.type === "min" && (
              <div className="input-error">Precio negativo</div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="section">Region</label>
            <select
              id="section"
              {...register("country", {
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
              id="image"
              type="url"
              {...register("image", { required: true })}
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
                onClick={e => {
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
