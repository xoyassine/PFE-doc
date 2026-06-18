import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-white border-b border-outline-variant/30 shadow-sm">
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
          <span className="text-primary font-label-md text-label-md tracking-widest uppercase">Légalité & Conformité</span>
          <h1 className="font-headline-xl text-headline-xl text-on-background tracking-tight">Conditions Générales d'Utilisation</h1>
          <p className="text-on-surface-variant font-body-md text-body-md max-w-2xl">Dernière mise à jour : 24 Mai 2024. Ces conditions régissent l'accès et l'utilisation de la plateforme MonCabinet.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-lg items-start">
          <div className="lg:order-1 space-y-lg text-on-surface-variant">
            <section id="acceptance" className="doc-section scroll-mt-24 bg-surface-container-lowest p-md md:p-lg rounded-xl border border-outline-variant/10 shadow-sm">
              <div className="flex items-center gap-sm mb-sm text-primary">
                <span className="material-symbols-outlined">verified</span>
                <h2 className="font-headline-md text-headline-md text-on-surface">1. Acceptation des conditions</h2>
              </div>
              <div className="font-body-md text-body-md space-y-md">
                <p>En accédant et en utilisant les services fournis par <strong>MonCabinet</strong>, vous reconnaissez avoir lu, compris et accepté d'être lié par les présentes Conditions Générales d'Utilisation (CGU).</p>
                <p>Si vous n'acceptez pas ces conditions, vous devez cesser immédiatement d'utiliser le service.</p>
              </div>
            </section>

            <section id="responsibilities" className="doc-section scroll-mt-24 bg-surface-container-lowest p-md md:p-lg rounded-xl border border-outline-variant/10 shadow-sm">
              <div className="flex items-center gap-sm mb-sm text-primary">
                <span className="material-symbols-outlined">person_pin</span>
                <h2 className="font-headline-md text-headline-md text-on-surface">2. Responsabilités de l'utilisateur</h2>
              </div>
              <div className="font-body-md text-body-md space-y-md">
                <p>En tant qu'utilisateur de MonCabinet, vous vous engagez à :</p>
                <ul className="list-disc pl-md space-y-xs">
                  <li>Fournir des informations exactes et à jour lors de la création de votre profil.</li>
                  <li>Maintenir la confidentialité de vos identifiants de connexion.</li>
                  <li>Utiliser la plateforme conformément aux lois et réglementations en vigueur.</li>
                </ul>
              </div>
            </section>

            <section id="privacy" className="doc-section scroll-mt-24 bg-surface-container-lowest p-md md:p-lg rounded-xl border border-outline-variant/10 shadow-sm">
              <div className="flex items-center gap-sm mb-sm text-primary">
                <span className="material-symbols-outlined">lock</span>
                <h2 className="font-headline-md text-headline-md text-on-surface">3. Politique de confidentialité</h2>
              </div>
              <div className="font-body-md text-body-md space-y-md">
                <p>La protection de vos données personnelles et de santé est notre priorité. Nous traitons vos données conformément au RGPD.</p>
              </div>
            </section>

            <section id="liability" className="doc-section scroll-mt-24 bg-surface-container-lowest p-md md:p-lg rounded-xl border border-outline-variant/10 shadow-sm">
              <div className="flex items-center gap-sm mb-sm text-primary">
                <span className="material-symbols-outlined">report_problem</span>
                <h2 className="font-headline-md text-headline-md text-on-surface">4. Limitation de responsabilité</h2>
              </div>
              <div className="font-body-md text-body-md space-y-md">
                <p>MonCabinet s'efforce de fournir une plateforme performante et sécurisée. Toutefois, la responsabilité est limitée conformément aux conditions.</p>
              </div>
            </section>

            <section id="property" className="doc-section scroll-mt-24 bg-surface-container-lowest p-md md:p-lg rounded-xl border border-outline-variant/10 shadow-sm">
              <div className="flex items-center gap-sm mb-sm text-primary">
                <span className="material-symbols-outlined">copyright</span>
                <h2 className="font-headline-md text-headline-md text-on-surface">5. Propriété intellectuelle</h2>
              </div>
              <div className="font-body-md text-body-md space-y-md">
                <p>Tous les éléments constituant la plateforme sont la propriété de MonCabinet Medical Suite ou de ses partenaires.</p>
              </div>
            </section>
          </div>

          <aside className="lg:order-2 sticky top-24 bg-surface-container-low border border-outline-variant/30 rounded-xl p-md">
            <h3 className="font-headline-md text-headline-md mb-sm text-primary">Sommaire</h3>
            <nav className="space-y-sm">
              <a href="#acceptance" className="block font-label-md text-label-md text-on-surface-variant hover:text-primary pl-base">1. Acceptation</a>
              <a href="#responsibilities" className="block font-label-md text-label-md text-on-surface-variant hover:text-primary pl-base">2. Responsabilités</a>
              <a href="#privacy" className="block font-label-md text-label-md text-on-surface-variant hover:text-primary pl-base">3. Confidentialité</a>
              <a href="#liability" className="block font-label-md text-label-md text-on-surface-variant hover:text-primary pl-base">4. Limitation</a>
              <a href="#property" className="block font-label-md text-label-md text-on-surface-variant hover:text-primary pl-base">5. Propriété</a>
            </nav>
            <div className="mt-md pt-md border-t border-outline-variant/30">
              <button className="w-full bg-primary text-on-primary py-sm rounded-lg font-label-md text-label-md hover:bg-tertiary transition-all shadow-sm">Télécharger le PDF</button>
            </div>
          </aside>
        </div>
      </main>

      <footer className="w-full py-md bg-surface-container-low border-t border-outline-variant/50">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop gap-md w-full max-w-screen-2xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-xs">
            <span className="font-headline-md text-headline-md text-on-surface">MonCabinet</span>
            <p className="font-body-md text-body-md text-on-surface-variant">© 2026 MonCabinet Medical Suite.</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-md">
            <Link to="/privacy" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline">Privacy Policy</Link>
            <Link to="/terms" className="font-label-sm text-label-sm text-primary font-bold hover:text-primary underline">Terms</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Terms;
