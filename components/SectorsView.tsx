
import React, { useState } from 'react';
import { initialSectors } from '../constants';
import type { SectorData } from '../types';
import SectorEditor from './SectorEditor';

const SectorsView: React.FC = () => {
    const [sectors, setSectors] = useState<SectorData[]>(initialSectors);
    const [editingSector, setEditingSector] = useState<SectorData | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleEdit = (sector: SectorData) => {
        setEditingSector(sector);
        setIsCreating(false);
    };

    const handleCreate = () => {
        setEditingSector(null);
        setIsCreating(true);
    };

    const handleCancel = () => {
        setEditingSector(null);
        setIsCreating(false);
    };
    
    const handleSave = () => {
        // Placeholder for actual save logic
        console.log("Saving sector...");
        handleCancel();
    };

    return (
        <>
            <header>
                <h1 className="text-3xl font-bold text-white">Gestión de Sectores</h1>
                <p className="text-slate-400 mt-1">Administra los sectores turísticos de Tomé.</p>
            </header>

            <section className="mt-8">
            {isCreating || editingSector ? (
                <SectorEditor 
                    sectorData={editingSector}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <div className="bg-slate-800 rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Sectores Actuales</h2>
                        <button onClick={handleCreate} className="bg-[#2c6b8f] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                            Crear Nuevo Sector
                        </button>
                    </div>
                    <div className="space-y-3">
                        {sectors.map(sector => (
                            <div key={sector.id} className="bg-slate-700/50 p-4 rounded-lg flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-white">{sector.name}</h3>
                                    <p className="text-sm text-slate-400">{sector.heroTitle}</p>
                                </div>
                                <button onClick={() => handleEdit(sector)} className="text-sm font-medium text-[#2c6b8f] hover:text-blue-400">
                                    Editar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                )}
            </section>
        </>
    );
};

export default SectorsView;
