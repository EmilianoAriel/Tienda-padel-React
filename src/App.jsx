import "./App.css";
import Footer from "./Componentes/Footer/Footer";
import NavBar from "./Componentes/NavBar/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";
import Inicio from "./Pages/Inicio/Inicio";
import Contacto from "./Pages/Contacto/Contacto";
import AcercaDe from "./Pages/AcercaDe/AcercaDe";
import Registro from "./Pages/Registro/Registro";
import AdminProdu from "./Pages/AdminProdu/AdminProdu";
import Detalles from "./Pages/Detalles/Detalles";
import OrderModal from "./Componentes/order-modal/OrderModal";
import { useEffect, useState } from "react";
import AdminUser from "./Pages/AdminUsers/AdminUser";

function App() {
  const location = useLocation();

  const isAcercaDe = location.pathname === "/acercaDe";

  return (
    <>
      <OrderModal />

      <NavBar className={isAcercaDe ? "style-black" : ""} />

      <Routes>
        <Route path="/" element={<Inicio />} />

        <Route path="/detalles/:id" element={<Detalles />} />

        <Route path="/contacto" element={<Contacto />} />

        <Route path="/acercaDe" element={<AcercaDe />} />

        <Route path="/registro" element={<Registro />} />

        <Route path="/adminProdu" element={<AdminProdu />} />

        <Route path="/adminUser" element={<AdminUser />} />
      </Routes>

      <Footer className={isAcercaDe ? "style-black" : ""} />
    </>
  );
}

export default App;
