import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Pages/Layouts/LayoutPersonnel';
import Dashboard from '../Pages/EspacePersonnel/Dashboard';

import PatientList from '../Pages/EspacePersonnel/Patient/PatientList';
import AjoutPatient from '../Pages/EspacePersonnel/Patient/AjoutPatient';
import ModifierPatient from '../Pages/EspacePersonnel/Patient/ModifierPatient';

import ListeRendezVous from '../Pages/EspacePersonnel/RendezVous/RendezVousList';
import AjoutRendezVous from '../Pages/EspacePersonnel/RendezVous/AjoutRdv';
import ModifierRendezVous from '../Pages/EspacePersonnel/RendezVous/ModifierRdv';

import ConsultationsList from '../Pages/EspacePersonnel/Consultation/ConsultationsList';
import AjoutConsultation from '../Pages/EspacePersonnel/Consultation/AjoutConsultation';
import ModifierConsultation from '../Pages/EspacePersonnel/Consultation/ModifierConsultation';

import OrdonnanceList from '../Pages/EspacePersonnel/Ordonnance/OrdonnancesList';
import AjoutOrdonnance from '../Pages/EspacePersonnel/Ordonnance/AjoutOrdonnance';
import ModifierOrdonnance from '../Pages/EspacePersonnel/Ordonnance/ModifierOrdonnance';

const PersonnelApp = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard/>} />

        <Route path="patients" element={<PatientList/>} />
        <Route path="patients/ajout" element={<AjoutPatient/>} />
        <Route path="patients/modifier/:id" element={<ModifierPatient/>} />

        <Route path="rendez-vous" element={<ListeRendezVous/>} />
        <Route path="rendez-vous/ajout" element={<AjoutRendezVous/>} />
        <Route path="rendez-vous/modifier/:id" element={<ModifierRendezVous/>} />

        <Route path="consultations" element={<ConsultationsList/>} />
        <Route path="consultations/ajout" element={<AjoutConsultation/>} />
        <Route path="consultations/modifier/:id" element={<ModifierConsultation/>} />

        <Route path="ordonnances" element={<OrdonnanceList />} />
        <Route path="ordonnances/ajout" element={<AjoutOrdonnance />} />
        <Route path="ordonnances/ajout/:consultationId" element={<AjoutOrdonnance />} />
        <Route path="ordonnances/modifier/:id" element={<ModifierOrdonnance />} />

      </Route>
    </Routes>
  );
};

export default PersonnelApp;