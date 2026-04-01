
import React from 'react';

const DashboardIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
);

const BusinessIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
);

const PromotionsIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
);

const UtensilsIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v18m6-15a6 6 0 11-12 0 6 6 0 0112 0zm-6 0h.01" />
    </svg>
);

const LandmarkIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M5 21V5m0 16h5m5 0h5M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4m-6 0h6" />
    </svg>
);

const MountainIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21h18M5 15l4-8 4 8M13 15l4-8 4 8" />
    </svg>
);

const CalendarDaysIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
);

const AttributeIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
);

const PlansIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
);

const SectorsIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2m14 0h-2m-2 0h-2m-2 0H9m-2 0H5"></path></svg>
);

const TrekkingIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
);

interface SidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
    const navItems = [
        { name: 'Dashboard', icon: <DashboardIcon /> },
        { name: 'Negocios', icon: <BusinessIcon /> },
        { name: 'Promociones', icon: <PromotionsIcon /> },
        { name: 'Rutas Gastronómicas', icon: <UtensilsIcon /> },
        { name: 'Patrimonio y Ruralidad', icon: <LandmarkIcon /> },
        { name: 'Geoparque y Ciencia', icon: <MountainIcon /> },
        { name: 'Calendario de Identidad', icon: <CalendarDaysIcon /> },
        { name: 'Atributos', icon: <AttributeIcon /> },
        { name: 'Planes', icon: <PlansIcon /> },
        { name: 'Sectores', icon: <SectorsIcon /> },
        { name: 'Trekking', icon: <TrekkingIcon /> },
    ];

    return (
        <aside className="w-64 bg-slate-800 flex-shrink-0 p-4 flex flex-col">
            <div className="flex items-center mb-10">
                <div className="bg-[#2c6b8f] p-2 rounded-md mr-3">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                </div>
                <h1 className="text-xl font-bold text-white">INN-CORE</h1>
            </div>
            <nav className="flex-1">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.name} className="mb-2">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveView(item.name);
                                }}
                                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                                    activeView === item.name
                                        ? 'bg-[#f06c44]/20 text-[#f06c44] shadow-md'
                                        : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                                }`}
                            >
                                {item.icon}
                                <span className="ml-4 font-medium">{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="mt-auto">
                 <div className="text-center text-xs text-slate-500">
                    <p>&copy; 2024 TurismoTomé</p>
                    <p>INN-CORE: Enterprise Edition</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;