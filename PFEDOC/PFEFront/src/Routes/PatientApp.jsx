import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Pages/Layouts/LayoutPatient';
import Dashboard from '../Pages/EspacePatient/Dashboard';
import RendezVousList from '../Pages/EspacePatient/MesRendezVous/RendezVousList';
import ReserverRdv from '../Pages/EspacePatient/MesRendezVous/ReserverRdv';
import MesConsultation from '../Pages/EspacePatient/MonDossier/MesConsultations';
import DetailConsultations from '../Pages/EspacePatient/MonDossier/DetailConsultation';

const PatientApp = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard/>} />

        <Route path="rendez-vous" element={<RendezVousList/>} />
        <Route path="rendez-vous/reservation" element={<ReserverRdv/>} />

        <Route path="consultations" element={<MesConsultation/>} />
        <Route path="consultations/Details" element={<DetailConsultations/>} />

      </Route>
    </Routes>
  );
};

export default PatientApp;