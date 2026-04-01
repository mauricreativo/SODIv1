
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import NegociosView from './components/NegociosView';
import SectorsView from './components/SectorsView';
import AttributeManagerView from './components/AttributeManagerView';
import TrekkingView from './components/TrekkingView';
import CalendarView from './components/CalendarView';
import PromotionsDashboard from './components/PromotionsDashboard';
import RutasGastronomicasView from './components/RutasGastronomicasView';
import PatrimonioRuralidadView from './components/PatrimonioRuralidadView';
import GeoparqueCienciaView from './components/GeoparqueCienciaView';
import PlanManagerView from './components/PlanManagerView';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('Dashboard');

  const renderActiveView = () => {
    switch (activeView) {
      case 'Negocios':
        return <NegociosView />;
      case 'Promociones':
        return <PromotionsDashboard />;
      case 'Rutas Gastronómicas':
        return <RutasGastronomicasView />;
      case 'Patrimonio y Ruralidad':
        return <PatrimonioRuralidadView />;
      case 'Geoparque y Ciencia':
        return <GeoparqueCienciaView />;
      case 'Calendario de Identidad':
        return <CalendarView />;
      case 'Atributos':
        return <AttributeManagerView />;
      case 'Planes':
        return <PlanManagerView />;
      case 'Sectores':
        return <SectorsView />;
      case 'Trekking':
        return <TrekkingView />;
      case 'Dashboard':
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-gray-200 font-sans">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {renderActiveView()}
      </main>
    </div>
  );
};

export default App;