import "./App.css";
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
import Login from "./Pages/Login/Login";
import Layout from "./Componentes/Layout";
import AdminGuard from "./services/guard/AdminGuard";
import AdminCategories from "./Pages/AdminCategories/AdminCategories";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />

          <Route path="/detalles/:id" element={<Detalles />} />

          <Route path="/contacto" element={<Contacto />} />

          <Route path="/acercaDe" element={<AcercaDe />} />

          <Route path="/registro" element={<Registro />} />

          <Route path="/categories" element={<AdminCategories />} />

          <Route
            path="/adminProdu"
            element={
              <AdminGuard>
                <AdminProdu />
              </AdminGuard>
            }
          />

          <Route
            path="/adminUser"
            element={
              <AdminGuard>
                <AdminUser />
              </AdminGuard>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
