//creame una tabla de categorias y botones para editar y borrar que tenga categorias y subcategorias

import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";
import useApi from "../../services/interceptor/interceptor";
import "./AdminCategories.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);

  const [tipos, setTipos] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [newCategory, setNewCategory] = useState("");

  const [newSubcategory, setNewSubcategory] = useState("");

  const [active, setActive] = useState(false);

  const { register, reset, handleSubmit, error } = useForm();

  const api = useApi();
  useEffect(() => {
    fetchCategories();
  }, [active, isEditing]);

  async function fetchCategories() {
    try {
      const response = await api.get("/categories");

      const categorias = response.data.section;

      setCategories(categorias);
    } catch (error) {
      console.error("Error al obtener las categorias:", error);
    }
  }

  async function createCategories(categoria) {
    try {
      const arrayTypes = Array.isArray(categoria.types)
        ? categoria.types
        : categoria.types.split(",").map((type) => type.trim());
      const newSection = {
        category: categoria.category,
        types: arrayTypes,
      };

      if (isEditing) {
        const { _id: id } = selectedCategory;
        console.log(id);

        const response = await api.put(`/categories/${id}`, newSection);

        Swal.fire({
          icon: "success",
          title: "Categoria actualizada con exito",
          showConfirmButton: false,
          timer: 1500,
        });

        console.log(response.data);
        setIsEditing(false);
        setActive(false);

        return;
      } else {
        const response = await api.post("/categories", newSection);
        Swal.fire({
          icon: "success",
          title: "Categoria creada con exito",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(response.data);
        setActive(false);
      }
      reset();
      fetchCategories();
    } catch (error) {
      console.error("Error al crear la categoria:", error);
    }
  }

  async function handleEdit(category) {
    setIsEditing(true);
    setSelectedCategory(category);
    console.log(category);
  }

  async function handleDelete(category) {
    Swal.fire({
      title: "Eliminar Categoria!",
      text: "Seguro que quiere eliminar esta categoria?",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: "Si,eliminar!",
      confirmButtonColor: "#d33",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/categories/${category._id}`);
          fetchCategories();

          Swal.fire({
            title: "Eliminado!",
            text: "Tu categoria se a eliminado correctamente.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        } catch (error) {
          console.error("Error al eliminar la categoria:", error);
        }
      }
    });
  }

  useEffect(() => {
    if (isEditing && selectedCategory) {
      reset({
        category: selectedCategory.category,
        types: selectedCategory.types,
      });
    } else {
      reset({
        category: "",
        types: "",
      });
    }
  }, [isEditing, selectedCategory, reset]);

  return (
    <div className="contenedor-categoria">
      <h1>Administrar Categorias</h1>
      <table>
        <thead>
          <tr>
            <th>Seccion</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.category}</td>
              <td>{category.types.map((type) => type).join(", ")}</td>

              <td>
                <button
                  className="edit-btn boton"
                  onClick={() => handleEdit(category)}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button
                  className="delete-btn boton"
                  onClick={() => handleDelete(category)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit(createCategories)}>
        <div className="contenedor-add-categorias">
          <div className="seccion">
            <input
              className="input-add"
              type="text"
              placeholder="Seccion"
              onChange={(e) => setNewCategory(e.target.value)}
              {...register("category", { required: true })}
            />
          </div>
          <div className="tipos">
            <input
              className="input-add"
              type="text"
              placeholder="Tipos"
              {...register("types", { required: true })}
              onChange={(e) => setNewSubcategory(e.target.value)}
            />
          </div>
          <div className="agregar">
            {isEditing ? (
              <div className="contenedor-botones">
                <button className="btn-guardar" type="submit">
                  Guardar
                </button>
                <button
                  className="btn-guardar cancelar"
                  onClick={() => {
                    setIsEditing(false);
                    reset();
                  }}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                className="btn-plus"
                type="submit"
                onClick={() => setActive(!active)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
