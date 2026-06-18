import React from 'react';
import { Link } from 'react-router-dom';

const Accueil = () => {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <header className="backdrop-blur bg-white/70 sticky top-0 z-40 border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary no-underline">MonCabinet</Link>
          <nav className="hidden md:flex gap-6 items-center">
            <Link to="/patient" className="text-on-surface-variant hover:text-primary">Mon Espace</Link>
            <Link to="/contact" className="text-on-surface-variant hover:text-primary">Contact</Link>
            <Link to="/login" className="ml-2 px-4 py-2 bg-primary text-white rounded-md">Se connecter</Link>
          </nav>
          <div className="md:hidden">
            <Link to="/login" className="px-3 py-2 bg-primary text-white rounded-md">Se connecter</Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">Votre santé, simplifiée.</h1>
            <p className="text-lg text-on-surface-variant mb-6">Prenez rendez-vous, consultez vos ordonnances et suivez votre dossier médical depuis une interface simple et sécurisée.</p>
            <div className="flex gap-4">
              <Link to="/login" className="px-6 py-3 bg-primary text-white rounded-md shadow">Accéder aux services</Link>
              <Link to="/register" className="px-6 py-3 border border-outline-variant rounded-md text-on-surface">Créer un compte</Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-start gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">📅</div>
                <p className="text-sm font-medium">Prendre un RDV</p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">🩺</div>
                <p className="text-sm font-medium">Consulter vos ordonnances</p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">🗂️</div>
                <p className="text-sm font-medium">Dossier médical</p>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-br from-primary/10 to-surface-container-lowest rounded-xl shadow-lg h-64 overflow-hidden relative">
              <img
                alt="Vue d'ensemble du cabinet"
                className="w-full h-full object-cover"
                src="https://plus.unsplash.com/premium_photo-1675686363504-ba2df7786f16?q=80&w=2091&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              />
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Services</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card title="Prendre un RDV" desc="Planifiez rapidement une consultation en ligne." to="/login">📅</Card>
            <Card title="Mes rendez-vous" desc="Consultez, modifiez ou annulez vos prochains rendez-vous." to="/login">✔️</Card>
            <Card title="Ordonnances" desc="Accédez à vos ordonnances et imprimez-les." to="/login">💊</Card>
            <Card title="Dossier médical" desc="Consultez et mettez à jour vos informations personnelles." to="/login">🗂️</Card>
          </div>
        </section>
      </main>

      <footer className="border-t mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-on-surface-variant">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>&copy; 2026 MonCabinet — Simplifions la santé ensemble.</div>
            <div className="flex gap-4">
              <Link to="/terms" className="hover:underline">Conditions</Link>
              <Link to="/privacy" className="hover:underline">Confidentialité</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Card = ({ title, desc, to, children }) => (
  <Link to={to} className="block p-4 bg-surface-container-lowest border border-outline-variant rounded-lg hover:shadow-md transition no-underline">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl">{children}</div>
      <div>
        <div className="font-medium text-on-surface">{title}</div>
        <div className="text-sm text-on-surface-variant">{desc}</div>
      </div>
    </div>
  </Link>
);

export default Accueil;