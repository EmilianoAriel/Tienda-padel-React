import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import "./FormularioAdmin.css";
import useApi from "../../../services/interceptor/interceptor";

const URL = import.meta.env.VITE_SERVER_URL;

export default function FormularioAdmin({
  onFormSubmit,
  prodEdit,
  setProdEdit,
}) {
  const [categories, setCategories] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [tipos, setTipos] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const api = useApi();

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  async function onProductsSubmits(producto) {
    try {
      const formData = new FormData();
      formData.append("name", producto.name);
      formData.append("price", producto.price);
      formData.append("promo", producto.promo);
      formData.append("section", producto.section);
      formData.append("type", producto.type);
      formData.append("fechaIngreso", producto.fechaIngreso);
      formData.append("cuotas", producto.cuotas);
      formData.append("description", producto.description);
      if (producto.image[0]) {
        formData.append("image", producto.image[0]);
      }

      if (prodEdit) {
        const { _id: id } = prodEdit;
        const image = producto.image[0];
        if (image) {
          formData.delete("image");
          formData.append("image", image);
        }
        const response = await api.put(`/products/${id}`, formData);

        Swal.fire({
          title: "Actualizado!",
          text: "Su producto se actualizo con exito",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        setProdEdit(null);
        reset();
      } else {
        const response = await api.post(`/products`, formData);

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
      console.log("Ocurrio un error", error);
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

  async function getCategorias() {
    try {
      const sections = await api.get("/categories");

      const categorias = sections.data.section.map((item) => item.category);

      setCategories(categorias);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTypes() {
    try {
      const types = await api.get(`/categories/${selectedSection}`);

      setTipos(types.data.types);

      console.log(tipos);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTypes();
  }, [selectedSection]);

  useEffect(() => {
    getCategorias();
  }, []);

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
              {categories.map((section) => (
                <option key={section._id} value={section}>
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
              {tipos?.map((tipo) => (
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
              type="file"
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
                onClick={(e) => {
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
