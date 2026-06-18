import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavbarPatient from '../../Componentes/NavBar/NavbarPatient';
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

      // If the account is personnel, redirect them to personnel area
      if (roleRaw.includes('PERSONNEL') || roleRaw.includes('PERSON') || roleRaw.includes('ADMIN')) {
        navigate('/personnel', { replace: true });
        return;
      }

      // Otherwise allow patient to access patient layout
      setChecking(false);
    };

    check();
  }, [navigate]);

  if (checking) return null;

  return (
    <div className="layout">
      <NavbarPatient />
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;