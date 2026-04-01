
import React, { useState, useEffect } from 'react';
import type { SectorData } from '../types';
import ImageUpload from './ImageUpload';

interface SectorEditorProps {
    sectorData: SectorData | null;
    onSave: () => void; // Placeholder for save logic
    onCancel: () => void;
}

const SectorEditor: React.FC<SectorEditorProps> = ({ sectorData, onSave, onCancel }) => {
    const [sector, setSector] = useState<Partial<SectorData>>({});

    useEffect(() => {
        setSector(sectorData || {});
    }, [sectorData]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSector(prev => ({ ...prev, [name]: value }));
    };

    const FormLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <label className="block text-sm font-bold text-[#2c6b8f] mb-2">{children}</label>
    );

    const FormInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
        <input {...props} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2c6b8f]" />
    );

    return (
        <div className="bg-slate-800/50 p-6 rounded-lg space-y-6">
            <h3 className="text-xl font-bold text-white">{sectorData?.id ? `Editando: ${sectorData.name}` : 'Creando Nuevo Sector'}</h3>
            
            <div>
                <FormLabel>Nombre del Sector</FormLabel>
                <FormInput name="name" value={sector.name || ''} onChange={handleInputChange} disabled={!!sectorData?.id} />
                 {sectorData?.id && <p className="text-xs text-slate-500 mt-1">El nombre de un sector existente no se puede cambiar.</p>}
            </div>

            <div>
                <FormLabel>Título del Hero</FormLabel>
                <FormInput name="heroTitle" value={sector.heroTitle || ''} onChange={handleInputChange} />
            </div>

            <div>
                 <FormLabel>Imagen de Fondo</FormLabel>
                 <ImageUpload label="Arrastra o selecciona una imagen" />
            </div>

            <div className="flex justify-end pt-4 space-x-3">
                 <button onClick={onCancel} className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-500 transition-colors duration-200">
                    Cancelar
                </button>
                <button onClick={onSave} className="bg-[#f06c44] text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-200">
                    Guardar Cambios
                </button>
            </div>
        </div>
    );
};

export default SectorEditor;
