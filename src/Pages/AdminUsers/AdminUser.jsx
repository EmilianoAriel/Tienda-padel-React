import React, { useState } from "react";
import FormUser from "./FormUsers/FormUser";
import ListUser from "./ListUsers/ListUsers";

export default function AdminUser() {
  const [updateKey, setUpdateKey] = useState(0);
  const [userEdit, setUserEdit] = useState(null);
  function editUser(user) {
    setUserEdit(user);
    console.log(user);
  }

  const handleUpdate = () => {
    setUpdateKey(prevKey => prevKey + 1);
  };

  return (
    <main className="main-admin">
      <h1 className="titulo-admin">Administrador Productos</h1>
      <section className="section-admin">
        <FormUser
          onFormSubmit={handleUpdate}
          userEdit={userEdit}
          setUserEdit={setUserEdit}
        />
        <ListUser updateKey={updateKey} onEditUs={editUser} />
      </section>
    </main>
  );
}
