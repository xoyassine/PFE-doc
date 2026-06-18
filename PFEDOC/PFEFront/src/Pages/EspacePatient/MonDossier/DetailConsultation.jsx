import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import consultationService from '../../../Services/ConsultationService';
import ordonnanceService from '../../../Services/OrdonnanceService';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const DetailConsultation = () => {
  const query = useQuery();
  const id = query.get('id');
  const [consult, setConsult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ordonnances, setOrdonnances] = useState([]);

  useEffect(() => {
    const load = async () => {
      if (!id) return setLoading(false);
      setLoading(true);
      try {
        const data = await consultationService.getConsultationById(id);
        setConsult(data || {});
        try {
          const ord = await ordonnanceService.getByConsultation(id);
          setOrdonnances(Array.isArray(ord) ? ord : (ord?.data || []));
        } catch (e) {
          setOrdonnances([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    try {
      return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(d);
    } catch (e) {
      return iso.slice(0, 10);
    }
  };

  const formatTime = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    try {
      return new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(d);
    } catch (e) {
      return iso.slice(11, 16);
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  if (!consult) return <div className="p-6">Détails indisponibles.</div>;

  const consultIdDisplay = consult.idConsultation ? `#C-${consult.idConsultation}` : (consult.id ? `#C-${consult.id}` : '');
  const dateDisplay = formatDate(consult.dateConsultation || consult.date || consult.programme);
  const timeDisplay = formatTime(consult.dateConsultation || consult.date || consult.programme);
  const practitioner = consult.medecinNom || consult.personnelNom || consult.medecin || '—';

  const handleDownloadPdf = (ord) => {
    const numero = ord.numero || ord.id || ord.idOrdonnance || 'ORD-1';
    const edited = ord.dateEdition || ord.editedAt || ord.createdAt || ord.date || '';
    const patientName = consult.patientNom || ord.patientNom || '';
    const prescriptionText = ord.prescriptionText || ord.texte || ord.description || ord.content || ord.notes || JSON.stringify(ord.prescriptions || ord.medicaments || ord.items || ord.lignes || ord.lines || '');
    const html = `
      <html>
        <head>
          <title>Ordonnance ${numero}</title>
          <style>
            body{font-family: Arial, Helvetica, sans-serif; padding:20px; color:#111}
            .card{max-width:800px;margin:0 auto;border:1px solid #e5e7eb;padding:24px;border-radius:12px}
            .header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
            .pres{white-space:pre-wrap;background:#f8fafc;padding:12px;border-radius:8px;border:1px dashed #e6eef6}
            h1,h2{margin:0}
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <div>
                <h2>Ordonnance ${numero}</h2>
                ${edited ? `<div style="color:#6b7280;font-size:12px;margin-top:4px">Éditée le ${formatDate(edited)}</div>` : ''}
              </div>
              <div style="text-align:right">
                <div style="font-size:12px;color:#6b7280">Patient</div>
                <div style="font-weight:700">${patientName || '—'}</div>
              </div>
            </div>
            <h3 style="font-size:16px;margin-bottom:8px">Prescriptions</h3>
            <div class="pres">${prescriptionText}</div>
          </div>
        </body>
      </html>
    `;

    const w = window.open('', '_blank', 'width=900,height=800');
    if (!w) return alert('Impossible d\'ouvrir une nouvelle fenêtre — vérifiez le bloqueur de popups.');
    w.document.open();
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); }, 500);
  };

  return (
    <main className="min-h-screen flex items-start justify-center py-12">
      <div className="w-full max-w-6xl px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <a className="inline-flex items-center text-brand-600 text-sm font-semibold mb-2 hover:underline" href="#" onClick={() => window.history.back()}>
            <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            Mes consultations
          </a>
          <h1 className="text-3xl font-bold text-slate-900">Détail de la consultation</h1>
        </div>
        <button onClick={() => window.print()} className="inline-flex items-center px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-eight shadow-sm transition-all">
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          Imprimer
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-4 space-y-6">
          <div className="card p-8 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-brand-100 flex items-center justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-brand-500 opacity-50"></div>
            </div>
            <div className="w-full space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">ID CONSULTATION</span>
                <p className="text-xl font-bold text-slate-900">{consultIdDisplay}</p>
                <span className="hidden">{consult.idConsultation || consult.id}</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 text-slate-400">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-500">Date</p>
                  <p className="text-slate-900 font-bold">{dateDisplay}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 text-slate-400">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-500">Heure</p>
                  <p className="text-slate-900 font-bold">{timeDisplay}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 text-slate-400">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-500">Praticien</p>
                  <p className="text-slate-900 font-bold">{practitioner}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="lg:col-span-8 space-y-6">
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-brand-600">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Diagnostic &amp; Observations</h2>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
              <p className="text-slate-700 leading-relaxed italic">{consult.diagnostic || consult.description || consult.notes || 'Aucune observation fournie.'}</p>
            </div>
          </div>

          <div className="card p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-8">Ordonnances</h2>
            <div className="bg-blue-50/50 rounded-xl border border-blue-100 p-8">
              {ordonnances.length === 0 ? (
                <div className="text-sm text-slate-500">Aucune ordonnance associée.</div>
              ) : ordonnances.map((o, idx) => {
                const numero = o.numero || o.id || o.idOrdonnance || `ORD-${idx+1}`;
                const edited = o.dateEdition || o.editedAt || o.createdAt || o.date || '';
                const patientName = consult.patientNom || o.patientNom || `${consult.patientNom || ''}` || '';
                const prescriptionText = o.prescriptionText || o.texte || o.description || o.content || o.notes || '';
                return (
                  <div key={numero} className="mb-6">
                    <div className="grid grid-cols-2 gap-8 mb-10 pb-6 border-b border-blue-100">
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">N° ORDONNANCE</span>
                        <p className="text-slate-900 font-bold">{numero}</p>
                        {edited && <p className="text-xs text-slate-500 mt-1">Éditée le {formatDate(edited)}</p>}
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">PATIENT</span>
                        <p className="text-slate-900 font-bold">{patientName || '—'}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-4">Prescriptions</span>
                      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex gap-4">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-slate-900 font-bold text-lg mb-2">Prescription</p>
                          <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded border border-dashed border-slate-200 font-mono text-sm break-all">{prescriptionText || JSON.stringify(o.prescriptions || o.medicaments || o.items || o.lignes || o.lines || '')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button type="button" onClick={() => handleDownloadPdf(o)} className="inline-flex items-center text-brand-600 font-bold text-sm hover:text-brand-700" title="Télécharger le PDF">
                        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        Télécharger le PDF
                      </button>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-xs text-slate-400">Rattachée à la consultation Id: {consult.idConsultation || consult.id}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        </div>
      </div>
    </main>
  );
};

export default DetailConsultation;