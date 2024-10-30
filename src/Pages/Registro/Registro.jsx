import './Registro.css';
import FormRegister from './FormRegister/FormRegister';

export default function Registro() {
  return (
    <>
      <main className={`main-formulario `}>
        <aside className="aside-tenis">
          <div className="pelota-tenis">
            <div className="linea-tenis"></div>
          </div>
        </aside>

        <FormRegister />
      </main>
    </>
  );
}
