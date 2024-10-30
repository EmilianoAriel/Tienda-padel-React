import React from 'react';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import OrderModal from './order-modal/OrderModal';



export default function Layout() {



  const location = useLocation();

  const isAcercaDe = location.pathname === '/acercaDe';
  return (
    <>
      <OrderModal />
      <NavBar className={isAcercaDe ? 'style-black' : ''} />
      <main>
        <Outlet />
      </main>

      <Footer className={isAcercaDe ? 'style-black' : ''} />
    </>
  );
}
