
import React from 'react';
import { Megaphone, Target, TrendingUp, Users } from 'lucide-react';
import KpiCard from './KpiCard';

const MarketingView: React.FC = () => {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white">Centro de Marketing</h1>
                <p className="text-slate-400 mt-1">Gestiona la visibilidad y el posicionamiento de Turismo Tomé.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Alcance Total" value="45.2k" change="+12%" icon={<Users className="text-blue-400" />} />
                <KpiCard title="Engagement" value="8.4%" change="+3.2%" icon={<Target className="text-purple-400" />} />
                <KpiCard title="Conversión" value="2.1%" change="+0.5%" icon={<TrendingUp className="text-green-400" />} />
                <KpiCard title="Campañas Activas" value="12" change="0" icon={<Megaphone className="text-orange-400" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-4">Próximas Campañas</h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Semana Santa en Tomé', date: 'Abril 2024', status: 'Planificado' },
                            { name: 'Festival Gastronómico Invierno', date: 'Junio 2024', status: 'Borrador' },
                            { name: 'Ruta del Vino Ancestral', date: 'Mayo 2024', status: 'En Revisión' }
                        ].map((camp, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                                <div>
                                    <p className="font-bold text-white">{camp.name}</p>
                                    <p className="text-xs text-slate-400">{camp.date}</p>
                                </div>
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full">
                                    {camp.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-4">Canales de Difusión</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-300">Instagram Ads</span>
                            <div className="w-48 bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-[#f06c44] h-full" style={{ width: '75%' }}></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-300">Google Search</span>
                            <div className="w-48 bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-300">Newsletter Local</span>
                            <div className="w-48 bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full" style={{ width: '90%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketingView;
