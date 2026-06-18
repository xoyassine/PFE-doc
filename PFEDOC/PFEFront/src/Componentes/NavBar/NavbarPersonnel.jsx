import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import authService from '../../Services/AuthService';

const NavbarPersonnel = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [spacerHeight, setSpacerHeight] = useState(0);

  useEffect(() => {
    const update = () => {
      if (headerRef.current) {
        const headerH = headerRef.current.offsetHeight;
        // try to subtract the top margin of the page main element to avoid double spacing
        let nextMargin = 0;
        const mainEl = document.querySelector('main');
        if (mainEl) {
          const styles = window.getComputedStyle(mainEl);
          nextMargin = parseFloat(styles.marginTop) || 0;
        }
        const final = Math.max(0, headerH - nextMargin);
        setSpacerHeight(final);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [open]);
  return (
    <>
      <header ref={headerRef} className="bg-surface border-b border-outline-variant shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center px-6 py-3 w-full max-w-container-max mx-auto relative">
        <div className="flex items-center gap-6">
          <Link to="/personnel" className="text-2xl font-semibold text-primary no-underline">MonCabinet</Link>
          <nav className="hidden lg:flex items-center gap-3">
            <NavLink to="/personnel" end className={({ isActive }) => isActive ? 'text-primary font-medium px-3 py-1 rounded no-underline transition-colors' : 'text-on-surface-variant font-medium hover:text-primary px-3 py-1 rounded no-underline transition-colors'}>Dashboard</NavLink>
            <NavLink to="/personnel/patients" className={({ isActive }) => isActive ? 'text-primary font-medium px-3 py-1 rounded no-underline transition-colors' : 'text-on-surface-variant font-medium hover:text-primary px-3 py-1 rounded no-underline transition-colors'}>Patients</NavLink>
            <NavLink to="/personnel/rendez-vous" className={({ isActive }) => isActive ? 'text-primary font-medium px-3 py-1 rounded no-underline transition-colors' : 'text-on-surface-variant font-medium hover:text-primary px-3 py-1 rounded no-underline transition-colors'}>Rendez-vous</NavLink>
            <NavLink to="/personnel/consultations" className={({ isActive }) => isActive ? 'text-primary font-medium px-3 py-1 rounded no-underline transition-colors' : 'text-on-surface-variant font-medium hover:text-primary px-3 py-1 rounded no-underline transition-colors'}>Consultations</NavLink>
            <NavLink to="/personnel/ordonnances" className={({ isActive }) => isActive ? 'text-primary font-medium px-3 py-1 rounded no-underline transition-colors' : 'text-on-surface-variant font-medium hover:text-primary px-3 py-1 rounded no-underline transition-colors'}>Ordonnances</NavLink>
          </nav>
          {/* Mobile menu button moved to right side for small screens */}
        </div>

        <div className="flex items-center gap-3">
          <button aria-label="Toggle menu" onClick={() => setOpen(prev => !prev)} className="lg:hidden p-2 rounded-md hover:bg-surface-container transition">
            <span className="material-symbols-outlined">menu</span>
          </button>

          <button onClick={() => { authService.logout(); navigate('/login'); }} className="flex items-center gap-2 px-3 py-2 bg-primary-container text-white rounded-lg text-sm hover:opacity-90 transition-all">
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span className='hidden md:block'>Déconnexion</span>
          </button>

        </div>
      </div>
        {/* Mobile nav (collapsible) */}
        <MobileNav open={open} setOpen={setOpen} />
      </header>
      {/* spacer to prevent content being hidden under fixed navbar; height follows header */}
      <div aria-hidden="true" style={{ height: `${spacerHeight}px` }} />
    </>
  );
};

function MobileNav({ open, setOpen }) {
  return (
    <div className={`lg:hidden absolute left-0 top-full w-full bg-surface border-t border-outline-variant shadow-md ${open ? 'block' : 'hidden'}`}>
      <nav className="flex flex-col p-4 gap-2">
        <NavLink to="/personnel" end onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'text-primary font-medium px-3 py-2 rounded no-underline' : 'text-on-surface-variant font-medium hover:text-primary px-3 py-2 rounded no-underline'}>Dashboard</NavLink>
        <NavLink to="/personnel/patients" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'text-primary font-medium px-3 py-2 rounded no-underline' : 'text-on-surface-variant font-medium hover:text-primary px-3 py-2 rounded no-underline'}>Patients</NavLink>
        <NavLink to="/personnel/rendez-vous" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'text-primary font-medium px-3 py-2 rounded no-underline' : 'text-on-surface-variant font-medium hover:text-primary px-3 py-2 rounded no-underline'}>Rendez-vous</NavLink>
        <NavLink to="/personnel/consultations" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'text-primary font-medium px-3 py-2 rounded no-underline' : 'text-on-surface-variant font-medium hover:text-primary px-3 py-2 rounded no-underline'}>Consultations</NavLink>
        <NavLink to="/personnel/ordonnances" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'text-primary font-medium px-3 py-2 rounded no-underline' : 'text-on-surface-variant font-medium hover:text-primary px-3 py-2 rounded no-underline'}>Ordonnances</NavLink>
        <NavLink to="/personnel/dossiers" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'text-primary font-medium px-3 py-2 rounded no-underline' : 'text-on-surface-variant font-medium hover:text-primary px-3 py-2 rounded no-underline'}>Dossiers</NavLink>
      </nav>
    </div>
  );
}

export default NavbarPersonnel;