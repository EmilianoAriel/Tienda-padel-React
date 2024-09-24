import React from 'react'
import './Registro.css'
export default function Registro() {
  return (
    <>
    
    <main className="main-formulario">
        <aside className="aside-tenis">
            <div className="pelota-tenis">
                <div className="linea-tenis"></div>
            </div>
        </aside>
        <div autocomplete="on" className="formulario">
            <h1 className="titulo-form">Registro</h1>
            <hr/>
            <form>
                <label htmlFor="name">Nombre:</label>
                <input type="text" className="input-form" minlength="4" autocomplete="on" id="name" name="name" required/>
                <label htmlFor="mail">Mail:</label>
                <input type="email" className="input-form" id="mail" name="mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required/>
                <label htmlFor="password">Contraseña:</label>
                <input type="password" className="input-form" minlength="8" maxlength="16" autocomplete="on" id="password" name="password" required/>
                <label htmlFor="second-password">Repita Contraseña:</label>
                <input type="password" className="input-form" minlength="8" maxlength="16" autocomplete="on" id="second-password" name="second-password" required/>
                <label htmlFor="date">Fecha de Nacimiento:</label>
                <input type="date" className="input-form" autocomplete="on" id="date" name="date" required/>
                <label htmlFor="pais">País/Región:</label>
                <select id="pais" name="pais" className="input-form">
                    <option value="">Selecciona un país</option>
                    <option value="AR">Argentina</option>
                    <option value="BR">Brasil</option>
                    <option value="ES">España</option>
                </select>
                <label htmlFor="text">Deje su comentario:</label>
                <textarea id="text" name="text" className="input-form" maxlength="150"></textarea>
                <input type="submit" className="btn-form"/>
            </form>
        </div>
    </main>
    
    </>
  )
}
