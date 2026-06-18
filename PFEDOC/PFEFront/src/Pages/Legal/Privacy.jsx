import React from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <header className="fixed top-0 w-full z-50 glass-header border-b border-outline-variant/30 shadow-sm">
        <div className="flex justify-between items-center px-margin-desktop h-16 w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-md">
            <Link to="/" className="font-headline-lg text-headline-lg text-primary tracking-tight no-underline">MonCabinet</Link>
          </div>
          <div className="flex items-center gap-sm">
            <Link to="/login" className="px-3 py-2 bg-primary text-white rounded-md">Se connecter</Link>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-xl px-margin-mobile md:px-margin-desktop max-w-5xl mx-auto">
        <div className="mb-lg space-y-xs">
          <h1 className="font-headline-xl text-headline-xl text-on-background tracking-tight">Politique de confidentialité</h1>
          <p className="text-on-surface-variant">Nous traitons vos données conformément au RGPD. Cette page explique comment nous collectons et utilisons les données.</p>
        </div>

        <section className="space-y-md">
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/10">
            <h2 className="font-headline-md text-headline-md">Collecte des données</h2>
            <p className="text-body-md text-on-surface-variant">Nous collectons uniquement les données nécessaires au bon fonctionnement du service.</p>
          </div>
        </section>
      </main>

      <footer className="w-full py-md bg-surface-container-low border-t border-outline-variant/50">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop gap-md w-full max-w-screen-2xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-xs">
            <span className="font-headline-md text-headline-md text-on-surface">MonCabinet</span>
            <p className="font-body-md text-body-md text-on-surface-variant">© 2026 MonCabinet Medical Suite.</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-md">
            <Link to="/terms" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline">Terms</Link>
            <Link to="/privacy" className="font-label-sm text-label-sm text-primary font-bold hover:text-primary underline">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;
