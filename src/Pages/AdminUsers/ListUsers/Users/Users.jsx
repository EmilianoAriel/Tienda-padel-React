import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Users({ URL, user, deleteUser, onEditUs }) {
  return (
    <>
      <tr className="lista-produ">
        <td className="img-lista">
          <img
            src={`${URL}/images/users/${user.image}`}
            alt=""
            className="product-image"
          />
        </td>
        <td className="nombre-tabla">{user.name}</td>
        <td className="seccion-tabla">{user.email}</td>
        <td className="tipo-tabla">{user.location}</td>
        <td>
          <button className="edit-btn boton" onClick={() => onEditUs(user)}>
            <FontAwesomeIcon icon={faPencil} />
          </button>
          <button
            className="delete-btn boton"
            onClick={() => deleteUser(user._id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr>
    </>
  );
}
