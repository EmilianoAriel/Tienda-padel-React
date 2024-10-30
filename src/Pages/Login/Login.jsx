import React from 'react';
import Formlogin from '../Login/FormLogin/Formlogin';
// import '.Registro/Registro.css';
export default function Login() {
  return (
    <>
      <main className={`main-formulario`}>
        <aside className="aside-tenis">
          <div className="pelota-tenis">
            <div className="linea-tenis"></div>
          </div>
        </aside>

        <Formlogin />
      </main>
    </>
  );
}
