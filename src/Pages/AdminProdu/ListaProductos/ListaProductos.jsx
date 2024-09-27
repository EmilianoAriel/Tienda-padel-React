import React, { useEffect, useState } from "react";
import Producto from "./Productos/Producto";
import axios from "axios";
import "./ListaProductos.css";
import Swal from "sweetalert2";
import { MagicMotion } from "react-magic-motion";
const URL = import.meta.env.VITE_SERVER_URL;
export default function ListaProductos({ updateKey, onEditProd }) {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  async function getProducts() {
    try {
      const get = await axios.get(`${URL}/products`);
      setProducts(get.data);
    } catch (error) {}
  }

  useEffect(() => {
    getProducts();
  }, [updateKey]);

  function deleteProduct(id) {
    Swal.fire({
      title: "Eliminar Producto!",
      text: "Seguro que quiere eliminar este producto?",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: "Si,eliminar!",
      confirmButtonColor: "#d33",
      cancelButtonText: "Cancelar",
    }).then(async result => {
      try {
        if (result.isConfirmed) {
          const response = await axios.delete(`${URL}/products/${id}`);
          getProducts();
          Swal.fire({
            title: "Eliminado!",
            text: "Tu articulo se a eliminado correctamente.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error al borrar!",
          text: "El producto no fue borrado",
          icon: "error",
        });
      }
    });
  }

  function search(event) {
    const Value = event.target.value;
    setSearchInput(Value);
    console.log(Value);
  }

  return (
    <>
      <div className="tabla-admin">
        <div className="contenedor-buscador">
          <input
            type="text"
            name=""
            id="search"
            onChange={search}
            className="search"
            placeholder=""
          />
          <label htmlFor="search">Busqueda del producto</label>
        </div>
        <table className="product-table">
          <thead class="encabezado-lista">
            <tr>
              <th>Imagen Producto</th>
              <th>Nombre Producto</th>
              <th>Descripcion Producto</th>
              <th>Seccion</th>
              <th>Tipo</th>
              <th>Fecha de ingreso</th>
              <th>Cantidad Cuotas</th>
              <th>Precio</th>
              <th>Precio Promo</th>
              <th>Edit</th>
            </tr>
          </thead>
          <MagicMotion>
            <tbody className="body-table">
              {searchInput.length <= 0
                ? products.map(prod => (
                    <Producto
                      key={prod.id}
                      producto={prod}
                      deleteProduct={deleteProduct}
                      onEditProd={onEditProd}
                    />
                  ))
                : (() => {
                    const filteredProducts = products.filter(product =>
                      product.name
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                    );

                    if (filteredProducts.length === 0) {
                      return (
                        <tr>
                          <td colSpan="10">No se encontraron productos</td>
                        </tr>
                      );
                    }

                    return filteredProducts.map(prod => (
                      <Producto
                        key={prod.id}
                        producto={prod}
                        deleteProduct={deleteProduct}
                        onEditProd={onEditProd}
                      />
                    ));
                  })()}
            </tbody>
          </MagicMotion>
        </table>
      </div>
    </>
  );
}
