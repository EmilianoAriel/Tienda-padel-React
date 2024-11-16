import React, { useEffect, useState } from "react";
import "../AdminProdu/AdminProdu.css";
import ListaProductos from "./ListaProductos/ListaProductos";
import FormularioAdmin from "./FormularioAdmin/FormularioAdmin";

export default function AdminProdu() {
  const [updateKey, setUpdateKey] = useState(0);
  const [prodEdit, setProdEdit] = useState(null);

  function editProduct(prod) {
    setProdEdit(prod);
  }

  const handleUpdate = () => {
    setUpdateKey((prevKey) => prevKey + 1);
  };

  return (
    <main className="main-admin">
      <h1 className="titulo-admin">Administrador Productos</h1>
      <section className="section-admin">
        <FormularioAdmin
          onFormSubmit={handleUpdate}
          prodEdit={prodEdit}
          setProdEdit={setProdEdit}
        />

        <ListaProductos updateKey={updateKey} onEditProd={editProduct} />
      </section>
    </main>
  );
}
