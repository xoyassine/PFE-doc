import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavbarPersonnel from '../../Componentes/NavBar/NavbarPersonnel';
import authService from '../../Services/AuthService';
import '../../Style/Personnel/Layout.css';

const Layout = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const check = () => {
      const isAuth = authService.isAuthenticated();
      const user = authService.getCurrentUser();

      if (!isAuth || !user) {
        navigate('/login', { replace: true });
        return;
      }

      const roleRaw = (
        user.role || user.user?.role || user.roles || ''
      ).toString().toUpperCase();

      // If the account is a patient, redirect them to patient area
      if (roleRaw.includes('PATIENT')) {
        navigate('/patient', { replace: true });
        return;
      }

      // Otherwise allow personnel to access personnel layout
      setChecking(false);
    };

    check();
  }, [navigate]);

  if (checking) return null;

  return (
    <div className="layout">
      <NavbarPersonnel />
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;