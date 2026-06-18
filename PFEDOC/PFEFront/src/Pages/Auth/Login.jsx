import React, { useState, useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import BackToAccueil from '../../Componentes/BackToAccueil';
import authService from '../../Services/AuthService';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const captchaWidgetId = useRef(null);
  const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY || '';
  const [grecaptchaLoaded, setGrecaptchaLoaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setMessage({ type: 'danger', text: 'Tous les champs sont requis.' });
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setMessage({ type: 'danger', text: "Format d'e-mail invalide." });
      return;
    }

    if (siteKey && !captchaToken) {
      setMessage({ type: 'danger', text: 'Veuillez compléter le captcha.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const response = await authService.login({ email, password, captcha: captchaToken });
      // determine role robustly from response or stored user
      const stored = authService.getCurrentUser();
      const roleRaw = (
        response?.role || response?.user?.role || stored?.role || stored?.user?.role || ''
      ).toString();
      const role = roleRaw.trim().toUpperCase();
      const destination = role.includes('PATIENT') ? '/patient' : '/personnel';
      setMessage({ type: 'success', text: 'Connexion réussie, redirection...' });
      navigate(destination);
    } catch (err) {
      const errorText = err?.response?.data?.message || 'Erreur de connexion. Vérifiez vos identifiants.';
      setMessage({ type: 'danger', text: errorText });
    } finally {
      setLoading(false);
    }
  };

  // use react-google-recaptcha; no manual script handling needed
  useEffect(() => {
    // no-op: component will load script automatically
    return () => {
      // reset token on unmount
      setCaptchaToken('');
    };
  }, []);

  return (
    // Changed min-w-[760px] to w-full to prevent horizontal scrolling issues on smaller screens
    <div className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-surface px-4">

      <main className="w-full max-w-[680px] z-10">
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md md:p-xl soft-shadow relative">
          <BackToAccueil />

          {/* Header Section */}
          <div className="flex flex-col items-center mb-xl">
            <div className="w-16 h-16 bg-primary-container/10 rounded-full flex items-center justify-center mb-md">
              <span className="material-symbols-outlined text-primary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
            </div>
            <h1 className="font-headline-md text-headline-md text-primary mb-xs">MonCabinet</h1>
            <p className="font-body-md text-body-md text-on-surface-variant opacity-80">Medical Suite</p>
          </div>

          <div className="mb-lg">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Connexion</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Accédez à votre espace médical</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-md">

            {/* Email Input */}
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="email">Adresse e-mail</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">mail</span>
                <input
                  id="email"
                  type="email"
                  className="w-full pl-xl pr-md py-sm bg-surface border border-outline-variant rounded-lg font-body-md text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="nom@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-xs">
              <div className="flex justify-between items-center gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant whitespace-nowrap" htmlFor="password">Mot de passe</label>
                <a className="font-label-sm text-label-sm text-primary hover:underline transition-all whitespace-nowrap" href="#">Mot de passe oublié ?</a>
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">lock</span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-xl pr-md py-sm bg-surface border border-outline-variant rounded-lg font-body-md text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-sm top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-body-md">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            {/* reCAPTCHA widget (mounted when REACT_APP_RECAPTCHA_SITE_KEY is set) */}
            {siteKey && (
              <div className="my-4 flex justify-center">
                <ReCAPTCHA
                  sitekey={siteKey}
                  onChange={(token) => setCaptchaToken(token)}
                  onExpired={() => setCaptchaToken('')}
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-base bg-primary hover:bg-primary-container text-white font-label-md text-label-md py-sm rounded-lg shadow-sm active:scale-[0.98] transition-all flex justify-center items-center gap-sm"
              disabled={loading}
            >
              {loading ? 'Chargement...' : 'Se connecter'}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>

          {/* Feedback Message */}
          {message.text && (
            <div className={`mt-4 py-2 text-sm text-center rounded-md ${message.type === 'danger' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {message.text}
            </div>
          )}

          {/* Registration Link */}
          <div className="mt-xl pt-lg border-t border-outline-variant/30 text-center">
            <p className="font-body-md text-body-md text-on-surface-variant">Pas encore de compte ? <a className="text-primary font-bold hover:underline ml-xs transition-all" href="/register">Inscription</a></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;