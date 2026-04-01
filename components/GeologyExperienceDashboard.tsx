
import React, { useState } from 'react';
import { initialGeologicalLandmarks, certifiedGuides } from '../constants';
import type { GeologicalLandmark } from '../types';
import { GeologicalDifficulty, LandmarkStatus } from '../types';
import ToggleSwitch from './ToggleSwitch';

const GeologyExperienceDashboard: React.FC = () => {
    const [landmarks, setLandmarks] = useState<GeologicalLandmark[]>(initialGeologicalLandmarks);

    const getDifficultyBadge = (difficulty: GeologicalDifficulty) => {
        switch (difficulty) {
            case GeologicalDifficulty.BAJA: return 'bg-green-500/20 text-green-300';
            case GeologicalDifficulty.MEDIA: return 'bg-yellow-500/20 text-yellow-300';
            case GeologicalDifficulty.ALTA: return 'bg-red-500/20 text-red-300';
            default: return 'bg-slate-500/20 text-slate-300';
        }
    };

    const handleStatusToggle = (id: number) => {
        setLandmarks(landmarks.map(lm => 
            lm.id === id 
                ? { ...lm, status: lm.status === LandmarkStatus.HABILITADO ? LandmarkStatus.CERRADO : LandmarkStatus.HABILITADO }
                : lm
        ));
    };
    
    const handleGuideChange = (id: number, newGuide: string) => {
        setLandmarks(landmarks.map(lm =>
            lm.id === id ? { ...lm, certifiedGuide: newGuide } : lm
        ));
    };

    return (
        <section className="bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Hitos Geológicos de Tomé</h2>
                <button className="bg-[#f06c44] text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    <span>Crear Nuevo Hito</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-slate-300">
                    <thead className="text-xs text-slate-100 uppercase bg-[#2c6b8f]">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nombre del Hito</th>
                            <th scope="col" className="px-6 py-3">Dificultad de Acceso</th>
                            <th scope="col" className="px-6 py-3">Guía Certificada</th>
                            <th scope="col" className="px-6 py-3 text-center">Estado del Sendero</th>
                            <th scope="col" className="px-6 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {landmarks.map((landmark) => (
                            <tr key={landmark.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    {landmark.name}
                                    <p className="font-normal text-xs text-slate-400">{landmark.gpsCoordinates}</p>
                                </th>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyBadge(landmark.difficulty)}`}>
                                        {landmark.difficulty}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                     <select 
                                        value={landmark.certifiedGuide}
                                        onChange={(e) => handleGuideChange(landmark.id, e.target.value)}
                                        className="bg-slate-700 border border-slate-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#2c6b8f] w-full"
                                     >
                                        {certifiedGuides.map(guide => <option key={guide} value={guide}>{guide}</option>)}
                                    </select>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex flex-col items-center">
                                        <ToggleSwitch
                                            checked={landmark.status === LandmarkStatus.HABILITADO}
                                            onChange={() => handleStatusToggle(landmark.id)}
                                        />
                                        <span className="text-xs text-slate-400 mt-1">{landmark.status}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="font-medium text-[#2c6b8f] hover:underline">
                                        Editar Contenido
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default GeologyExperienceDashboard;
