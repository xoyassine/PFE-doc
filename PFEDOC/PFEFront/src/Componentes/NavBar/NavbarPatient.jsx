import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import authService from '../../Services/AuthService';

const NavbarPatient = () => {
	const navigate = useNavigate();

	return (
		<>
			<header className="bg-surface border-b border-outline-variant shadow-sm fixed top-0 left-0 right-0 z-40">
				<div className="flex justify-between items-center px-6 py-3 w-full max-w-container-max mx-auto">
					<div className="flex items-center gap-4">
						<Link to="/patient" className="text-2xl font-semibold text-primary no-underline">MonCabinet</Link>
						<nav className="hidden md:flex items-center gap-3">
							<NavLink to="/patient" end className={({ isActive }) => isActive ? 'text-primary font-medium px-3 py-1 rounded no-underline' : 'text-on-surface-variant font-medium hover:text-primary px-3 py-1 rounded no-underline'}>Accueil</NavLink>
							<NavLink to="/patient/rendez-vous" className={({ isActive }) => isActive ? 'text-primary font-medium px-3 py-1 rounded no-underline' : 'text-on-surface-variant font-medium hover:text-primary px-3 py-1 rounded no-underline'}>Rendez-vous</NavLink>
							<NavLink to="/patient/consultations" className={({ isActive }) => isActive ? 'text-primary font-medium px-3 py-1 rounded no-underline' : 'text-on-surface-variant font-medium hover:text-primary px-3 py-1 rounded no-underline'}>Consultations</NavLink>
						</nav>
					</div>

					<div className="flex items-center gap-3">
						<button onClick={() => { authService.logout(); navigate('/login'); }} className="flex items-center gap-2 px-3 py-2 bg-primary-container text-white rounded-lg text-sm hover:opacity-90 transition-all">
							<span className="material-symbols-outlined text-[18px]">logout</span>
							<span className='hidden sm:block'>Déconnexion</span>
						</button>
					</div>
				</div>
			</header>
			<div aria-hidden="true" style={{ height: '64px' }} />
		</>
	);
};

export default NavbarPatient;
