import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const EMAIL = process.env.REACT_APP_CONTACT_EMAIL || 'contact@moncabinet.example';
  const WA_NUMBER = process.env.REACT_APP_WHATSAPP_NUMBER || '33123456789';
  const waHref = `https://wa.me/${WA_NUMBER}`;
  

  return (
    <div className="bg-background text-on-surface min-h-screen">
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

      <main className="pt-32 pb-xl px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Contactez-nous</h1>
          <p className="text-on-surface-variant mt-2">Une question ? écrivez-nous via le formulaire ci-dessous et nous reviendrons vers vous.</p>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 text-center">
          <p className="text-on-surface-variant mb-4">Pour nous contacter, utilisez l'une des options ci-dessous :</p>
          <div className="flex items-center justify-center gap-4">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent('Contact via MonCabinet')}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Ouvrir Gmail
            </a>
            <a href={waHref} target="_blank" rel="noreferrer" className="px-4 py-2 bg-green-600 text-white rounded-md">WhatsApp</a>
          </div>
        </div>
      </main>

      <footer className="w-full py-md bg-surface-container-low border-t border-outline-variant/50 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop gap-md w-full max-w-screen-2xl mx-auto">
          <div className="text-sm text-on-surface-variant">© 2026 MonCabinet</div>
          <nav className="flex gap-4">
            <Link to="/terms" className="text-on-surface-variant hover:underline">Conditions</Link>
            <Link to="/privacy" className="text-on-surface-variant hover:underline">Confidentialité</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Contact;