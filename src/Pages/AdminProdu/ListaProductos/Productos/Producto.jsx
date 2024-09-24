import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatPrice } from '../../../../Utilis/formatPrice';
import React from 'react'

export default function Producto({producto, deleteProduct, onEditProd}) {

 

  return (
    <>
    
    <tr className="lista-produ">
                        <td className="img-lista"><img src={producto.image} alt="" className="product-image" /></td>
                        <td className="nombre-tabla">{producto.name}</td>
                        <td className="desc-tabla">{producto.description}</td>
                        <td className='seccion-tabla'>{producto.section}</td>
                        <td className='tipo-tabla'>{producto.type}</td>
                        <td className='fecha-ingreso'>{producto.date}</td>
                        <td className='cantidad-cuotas'>{producto.cuotas}</td>
                        <td className="precio">{formatPrice(producto.price)}</td>
                        <td className="precio-promo">{formatPrice(producto.promo)}</td>
                        <td>
                            <button className="edit-btn boton" onClick={()=> onEditProd(producto)}><FontAwesomeIcon icon={faPencil} /></button>
                            <button className="delete-btn boton" onClick={ () => deleteProduct(producto.id)}><FontAwesomeIcon icon={faTrash} /></button>
                        </td>
                    </tr>

    </>
  )
}
