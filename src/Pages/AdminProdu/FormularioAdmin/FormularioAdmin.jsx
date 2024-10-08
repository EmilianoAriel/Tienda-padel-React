import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import "./FormularioAdmin.css";

const URL = import.meta.env.VITE_SERVER_URL;

export default function FormularioAdmin({
  onFormSubmit,
  prodEdit,
  setProdEdit,
}) {
  const tiposPorSeccion = {
    Bolsos: ["Mochila", "Bolso"],
    Grip: ["Antideslizante", "Absorbente"],
    Paletas: ["Attack", "Control"],
    Pantalones: ["Cortos", "Largos"],
    Pelotas: ["Softh", "Air Softh", "Tenis"],
    Remeras: ["Manga corta", "Manga larga", "Sin mangas"],
    Zapatillas: ["Running", "Casual", "Deporte"],
    Prueba: [],
  };

  const [selectedSection, setSelectedSection] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const handleSectionChange = event => {
    setSelectedSection(event.target.value);
  };

  async function onProductsSubmits(producto) {
    try {
      if (prodEdit) {
        const { id } = prodEdit;
        const response = await axios.put(`${URL}/products/${id}`, producto);

        Swal.fire({
          title: "Actualizado!",
          text: "Su producto se actualizo con exito",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        setProdEdit(null);
        reset();
        console.log(prodEdit);
      } else {
        const response = await axios.post(`${URL}/products`, producto);
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
    if (prodEdit) {
      setSelectedSection(prodEdit.section);

      reset({
        name: prodEdit.name,
        price: prodEdit.price,
        promo: prodEdit.promo,
        section: prodEdit.section,
        type: prodEdit.type,
        image: prodEdit.image,
        fechaIngreso: prodEdit.fechaIngreso,
        cuotas: prodEdit.cuotas,
        description: prodEdit.description,
      });
    } else {
      reset({
        name: "",
        price: "",
        promo: "",
        section: "",
        type: "",
        image: "",
        fechaIngreso: "",
        cuotas: "",
        description: "",
      });
      setSelectedSection("");
    }
  }, [prodEdit, reset]);

  return (
    <>
      <div className="contenedor-form">
        <div className="pelota-formulario">
          <div className="linea-pelota_formulario"></div>
        </div>
        <h1>Admin Form</h1>
        <form onSubmit={handleSubmit(onProductsSubmits)}>
          <div className="input-group">
            <label htmlFor="name">Nombre del producto</label>
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
            <label htmlFor="precio">Precio del producto</label>
            <input
              id="precio"
              type="number"
              {...register("price", { required: true, min: "1" })}
            />

            {errors.price?.type === "required" && (
              <div className="input-error">El campo es requerido</div>
            )}
            {errors.price?.type === "min" && (
              <div className="input-error">Precio negativo</div>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="promo">Precio promo</label>
            <input
              id="promo"
              type="number"
              {...register("promo", {
                min: "1",
              })}
            />

            {errors.promo?.type === "min" && (
              <div className="input-error">Precio negativo</div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="section">Seccion del producto</label>
            <select
              id="section"
              {...register("section", {
                required: true,
              })}
              onChange={handleSectionChange}
            >
              <option value="">Seleccione una sección</option>
              {Object.keys(tiposPorSeccion).map(section => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
            {errors.section && (
              <div className="input-error">La sección es requerida</div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="type">Tipo de producto</label>
            <select id="type" {...register("type", { required: true })}>
              <option value="">Seleccione un tipo</option>
              {selectedSection &&
                tiposPorSeccion[selectedSection].map(tipo => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
            </select>
            {errors.type && (
              <div className="input-error">El tipo es requerida</div>
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

          <div className="input-group">
            <label htmlFor="fecha">Fecha de ingreso</label>
            <input
              id="fecha"
              type="date"
              {...register("fechaIngreso", { required: true })}
            />
            {errors.fechaIngreso && (
              <div className="input-error">La fecha es requerida</div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="cuotas">Cantidad de cuotas</label>
            <select name="" id="cuotas" {...register("cuotas")}>
              <option value="">Sin cuotas</option>
              <option value="3 y 6 cuotas sin interes">
                3 y 6 cuotas sin interes
              </option>
              <option value="3,6 y 12 cuotas sin interes">
                3,6 y 12 cuotas sin interes
              </option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="description">Descripcion del producto</label>
            <textarea
              id="description"
              {...register("description", {
                required: true,
                minLength: 20,
                maxLength: 300,
              })}
            ></textarea>
            {errors.description?.type === "required" && (
              <div className="input-error">La descripción es requerida</div>
            )}
            {errors.description?.type === "minLength" && (
              <div className="input-error">Minimo de 20 caracteres</div>
            )}
            {errors.description?.type === "maxLength" && (
              <div className="input-error">
                Sobrepasaste el maximo de caracteres(300)
              </div>
            )}
          </div>
          {prodEdit ? (
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
                  setProdEdit(null);
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
