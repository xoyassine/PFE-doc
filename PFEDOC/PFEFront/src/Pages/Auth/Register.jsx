import React, { useState } from 'react';
import BackToAccueil from '../../Componentes/BackToAccueil';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import authService from '../../Services/AuthService';

const Register = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nom, prenom, email, password, confirmPassword } = formData;

        if (!nom || !prenom || !email || !password || !confirmPassword) {
            setMessage({ type: 'danger', text: '⚠️ Tous les champs sont obligatoires.' });
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            setMessage({ type: 'danger', text: '📧 Adresse e-mail invalide.' });
            return;
        }
        if (password.length < 6) {
            setMessage({ type: 'danger', text: '🔒 Le mot de passe doit contenir au moins 6 caractères.' });
            return;
        }
        if (password !== confirmPassword) {
            setMessage({ type: 'danger', text: '❌ Les mots de passe ne correspondent pas.' });
            return;
        }

        // captcha check when site key is provided
        if (siteKey && !captchaToken) {
            setMessage({ type: 'danger', text: 'Veuillez compléter le captcha.' });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });
        try {
            const payload = { email, nom, password, prenom, role: 'PATIENT', captcha: captchaToken };
            await authService.register(payload);
            setMessage({ type: 'success', text: "✅ Compte créé avec succès ! Redirection vers la connexion..." });
            setFormData({ nom: '', prenom: '', email: '', password: '', confirmPassword: '' });
            setTimeout(() => navigate('/login'), 1200);
        } catch (err) {
            const errMsg = err?.response?.data?.message || 'Erreur lors de la création du compte.';
            setMessage({ type: 'danger', text: errMsg });
        } finally {
            setLoading(false);
        }
    };

    const [captchaToken, setCaptchaToken] = useState('');
    const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY || '';

    return (
            <div className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-surface px-4">
#
                <main className="w-full max-w-[680px] z-10">
                    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md md:p-xl soft-shadow relative">
                        <BackToAccueil />
                    <div className="flex flex-col items-center mb-xl">
                        <div className="w-16 h-16 bg-secondary-container/10 rounded-full flex items-center justify-center mb-md">
                            <span className="material-symbols-outlined text-secondary text-[28px]">person_add</span>
                        </div>
                        <h1 className="font-headline-md text-headline-md text-on-surface mb-xs">Créer un compte</h1>
                        <p className="font-body-md text-body-md text-on-surface-variant opacity-80">Remplissez les informations ci-dessous</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                            <div className="flex flex-col gap-xs">
                                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="nom">Nom</label>
                                <input id="nom" name="nom" value={formData.nom} onChange={handleChange} className="w-full pl-3 pr-3 py-2 bg-surface border border-outline-variant rounded-lg" placeholder="Dupont" />
                            </div>
                            <div className="flex flex-col gap-xs">
                                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="prenom">Prénom</label>
                                <input id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} className="w-full pl-3 pr-3 py-2 bg-surface border border-outline-variant rounded-lg" placeholder="Marie" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-xs">
                            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="email">Adresse e-mail</label>
                            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="w-full pl-3 pr-3 py-2 bg-surface border border-outline-variant rounded-lg" placeholder="marie.dupont@exemple.fr" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                            <div className="flex flex-col gap-xs">
                                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">Mot de passe</label>
                                <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className="w-full pl-3 pr-3 py-2 bg-surface border border-outline-variant rounded-lg" placeholder="Minimum 6 caractères" />
                            </div>
                            <div className="flex flex-col gap-xs">
                                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="confirmPassword">Confirmer le mot de passe</label>
                                <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className="w-full pl-3 pr-3 py-2 bg-surface border border-outline-variant rounded-lg" placeholder="Retapez votre mot de passe" />
                            </div>
                        </div>

                        {/* reCAPTCHA widget (only when site key provided) */}
                        {siteKey && (
                            <div className="my-4 flex justify-center">
                                <ReCAPTCHA
                                    sitekey={siteKey}
                                    onChange={(token) => setCaptchaToken(token)}
                                    onExpired={() => setCaptchaToken('')}
                                />
                            </div>
                        )}

                        <button type="submit" className="mt-base bg-primary hover:bg-primary-container text-white font-label-md text-label-md py-sm rounded-lg shadow-sm" disabled={loading}>
                            {loading ? 'Création...' : "S'inscrire"}
                        </button>
                    </form>

                    {message.text && (
                        <div className={`mt-4 py-2 text-sm text-center rounded-md ${message.type === 'danger' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="mt-xl pt-lg border-t border-outline-variant/30 text-center">
                        <p className="font-body-md text-body-md text-on-surface-variant">Déjà membre ? <a className="text-primary font-bold hover:underline ml-xs transition-all" href="/login">Connectez-vous</a></p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Register;