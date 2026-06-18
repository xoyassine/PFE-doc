import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackToAccueil = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/')}
      aria-label="Retour à l'accueil"
      className="absolute top-4 left-4 z-50 bg-white/90 backdrop-blur-sm shadow-md rounded-full p-3 hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
    >
      <span className="material-symbols-outlined text-primary">home</span>
    </button>
  );
};

export default BackToAccueil;
