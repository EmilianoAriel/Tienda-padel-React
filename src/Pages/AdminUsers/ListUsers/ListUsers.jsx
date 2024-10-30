import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ListUsers.css";
import Swal from "sweetalert2";
import { MagicMotion } from "react-magic-motion";
import Users from "./Users/Users";
import { useUser } from "../../../context/UserContext";
import useApi from "../../../services/interceptor/interceptor";
const URL = import.meta.env.VITE_SERVER_URL;
const URL2 = import.meta.env.VITE_LOCAL_SERVER;

export default function ListUser({ updateKey, onEditUs }) {
  const api = useApi();
  const { token } = useUser();
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  async function getProducts() {
    try {
      const get = await api.get(`/users`, {
        headers: {
          authorization: token,
        },
      });
      setUsers(get.data);
    } catch (error) {}
  }

  useEffect(() => {
    getProducts();
  }, [updateKey]);

  function deleteUser(id) {
    Swal.fire({
      title: "Eliminar Producto!",
      text: "Seguro que quiere eliminar este producto?",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: "Si,eliminar!",
      confirmButtonColor: "#d33",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          const response = await api.delete(`/users/${id}`);
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
          <label htmlFor="search">Busqueda del Usuario</label>
        </div>
        <table className="product-table">
          <thead class="encabezado-lista">
            <tr>
              <th>Imagen Usuario</th>
              <th>Nombre Usuario</th>
              <th>Email</th>
              <th>Region</th>
              <th>Edit</th>
            </tr>
          </thead>
          <MagicMotion>
            <tbody className="body-table">
              {searchInput.length <= 0
                ? users.map((user) => (
                    <Users
                      key={user._id}
                      user={user}
                      URL={URL2}
                      deleteUser={deleteUser}
                      onEditUs={onEditUs}
                    />
                  ))
                : (() => {
                    const filteredProducts = products.filter((product) =>
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

                    return filteredProducts.map((prod) => (
                      <Users
                        key={prod._id}
                        user={prod}
                        deleteUser={deleteUser}
                        onEditUs={onEditUs}
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
