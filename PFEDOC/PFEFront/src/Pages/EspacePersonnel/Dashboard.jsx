import React from 'react';
import { Link } from 'react-router-dom';
import { User, List, UserPlus, Calendar, PlusSquare, Stethoscope, BarChart2, FileText, Printer, Plus } from 'lucide-react';

const Dashboard = () => {
  return (
    <main className="w-full max-w-container-max mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Tableau de bord – Personnel médical</h1>
        <p className="text-on-surface-variant text-lg">Gérez l'intégralité du cabinet depuis cet espace sécurisé.</p>
      </div>

      <div className="mb-6 relative rounded-3xl overflow-hidden shadow-md group">
        <img alt="Vue d'ensemble du cabinet" className="w-full h-auto object-cover max-h-[400px] transition-transform duration-700 group-hover:scale-105" src="https://plus.unsplash.com/premium_photo-1675686363504-ba2df7786f16?q=80&w=2091&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
          <span className="text-white text-sm bg-secondary-container/80 backdrop-blur-sm self-start px-3 py-1 rounded-full mb-2">Vue actuelle du Cabinet</span>
          <h2 className="text-white text-2xl font-semibold">Surveillance en temps réel</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white border border-outline-variant rounded-3xl p-6 shadow-sm hover:shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
                <div className="w-14 h-14 bg-surface-container-high rounded-xl flex items-center justify-center text-primary">
                <User size={24} className="text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-on-surface mb-2">Patients</h3>
            <p className="text-on-surface-variant text-base mb-4">Accédez à l'historique médical complet, gérez les dossiers personnels et enregistrez les nouveaux arrivants.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/personnel/patients" className="flex-1 px-4 py-2 bg-primary-container text-white rounded-xl text-sm flex items-center justify-center gap-2 no-underline"> 
              <List size={20} /> Liste
            </Link>
            <Link to="/personnel/patients/ajout" className="flex-1 px-4 py-2 border border-primary text-primary rounded-xl text-sm flex items-center justify-center gap-2 no-underline"> 
              <UserPlus size={20} /> Ajouter
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white border border-outline-variant rounded-3xl p-6 shadow-sm hover:shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-14 h-14 bg-surface-container-high rounded-xl flex items-center justify-center text-primary">
                <Calendar size={24} className="text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-on-surface mb-2">Rendez‑vous</h3>
            <p className="text-on-surface-variant text-base mb-4">Planifiez les consultations, gérez les annulations et visualisez l'agenda quotidien de l'équipe.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/personnel/rendez-vous" className="flex-1 px-4 py-2 bg-primary-container text-white rounded-xl text-sm flex items-center justify-center gap-2 no-underline"> 
              <Calendar size={20} /> Liste
            </Link>
            <Link to="/personnel/rendez-vous/ajout" className="flex-1 px-4 py-2 border border-primary text-primary rounded-xl text-sm flex items-center justify-center gap-2 no-underline"> 
              <PlusSquare size={20} /> Ajouter
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white border border-outline-variant rounded-3xl p-6 shadow-sm hover:shadow-lg flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 shrink-0 bg-surface-container-high rounded-xl flex items-center justify-center mb-3">
              <Stethoscope size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-on-surface">Consultations</h3>
            <p className="text-on-surface-variant text-base">Saisissez les comptes-rendus cliniques, examinez les constantes vitales et validez les bilans de santé.</p>
          </div>
          <Link to="/personnel/consultations" className="w-full px-4 py-2 bg-primary-container text-white rounded-xl text-sm flex items-center justify-center gap-2 mt-4 no-underline"> 
            <BarChart2 size={20} /> Accéder à la Liste
          </Link>
        </div>

        <div className="lg:col-span-5 bg-white border border-outline-variant rounded-3xl p-6 shadow-sm hover:shadow-lg flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 bg-surface-container-high rounded-xl flex items-center justify-center mb-3">
              <FileText size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-on-surface">Ordonnances</h3>
            <p className="text-on-surface-variant text-base">Édition rapide et sécurisée des prescriptions médicamenteuses avec vérification des interactions.</p>
          </div>
          <Link to="/personnel/ordonnances" className="w-full px-4 py-2 bg-primary-container text-white rounded-xl text-sm flex items-center justify-center gap-2 mt-4 no-underline"> 
            <Printer size={20} /> Consulter la Liste
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;