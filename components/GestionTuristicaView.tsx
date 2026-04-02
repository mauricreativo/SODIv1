
import React from 'react';
import { Map, Briefcase, Globe, BarChart3, Settings } from 'lucide-react';
import KpiCard from './KpiCard';

const GestionTuristicaView: React.FC = () => {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white">Gestión Turística</h1>
                <p className="text-slate-400 mt-1">Administra los recursos y el desarrollo del Geoparque Tomé.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Sectores Activos" value="9" change="0" icon={<Map className="text-blue-400" />} />
                <KpiCard title="Convenios Locales" value="42" change="+5" icon={<Briefcase className="text-green-400" />} />
                <KpiCard title="Visitantes Mes" value="12.5k" change="+18%" icon={<Globe className="text-purple-400" />} />
                <KpiCard title="Ocupación Promedio" value="72%" change="+4.5%" icon={<BarChart3 className="text-orange-400" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white">Estado de Sectores Turísticos</h3>
                        <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                            <Settings className="text-slate-400" size={20} />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-700 text-slate-500 text-sm">
                                    <th className="pb-3 font-medium">Sector</th>
                                    <th className="pb-3 font-medium">Capacidad</th>
                                    <th className="pb-3 font-medium">Estado</th>
                                    <th className="pb-3 font-medium">Última Inspección</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-300">
                                {[
                                    { name: 'El Morro', capacity: 'Alta', status: 'Operativo', date: '2024-03-25' },
                                    { name: 'Cocholgüe', capacity: 'Media', status: 'Mantenimiento', date: '2024-03-28' },
                                    { name: 'Dichato', capacity: 'Alta', status: 'Operativo', date: '2024-03-20' },
                                    { name: 'Rafael', capacity: 'Baja', status: 'Operativo', date: '2024-03-15' }
                                ].map((sector, i) => (
                                    <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                                        <td className="py-4 font-bold">{sector.name}</td>
                                        <td className="py-4">{sector.capacity}</td>
                                        <td className="py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                sector.status === 'Operativo' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                                            }`}>
                                                {sector.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-sm text-slate-500">{sector.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-4">Acciones Rápidas</h3>
                    <div className="space-y-3">
                        <button className="w-full p-4 bg-slate-700/50 hover:bg-slate-700 text-left rounded-lg transition-colors border border-slate-600">
                            <p className="font-bold text-white">Nueva Inspección</p>
                            <p className="text-xs text-slate-400">Registrar estado de sector</p>
                        </button>
                        <button className="w-full p-4 bg-slate-700/50 hover:bg-slate-700 text-left rounded-lg transition-colors border border-slate-600">
                            <p className="font-bold text-white">Reporte de Afluencia</p>
                            <p className="text-xs text-slate-400">Generar PDF mensual</p>
                        </button>
                        <button className="w-full p-4 bg-slate-700/50 hover:bg-slate-700 text-left rounded-lg transition-colors border border-slate-600">
                            <p className="font-bold text-white">Gestión de Guías</p>
                            <p className="text-xs text-slate-400">Asignar turnos y rutas</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GestionTuristicaView;
