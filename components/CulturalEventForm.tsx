import React, { useState, useMemo } from 'react';
import type { CulturalEvent, Business } from '../types';
import { Sector } from '../types';
import ImageUpload from './ImageUpload';

interface CulturalEventFormProps {
    event: CulturalEvent | null;
    allBusinesses: Business[];
    onSave: (event: CulturalEvent) => void;
    onCancel: () => void;
}

const NEW_EVENT_TEMPLATE: Omit<CulturalEvent, 'id'> = {
    name: '',
    location: Sector.EL_MORRO,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    linkedBusinesses: [],
    promoBannerUrl: '',
};

const CulturalEventForm: React.FC<CulturalEventFormProps> = ({ event, allBusinesses, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Omit<CulturalEvent, 'id'>>(() => 
        event ? { ...event } : { ...NEW_EVENT_TEMPLATE }
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBusinessLinkToggle = (businessId: number) => {
        setFormData(prev => {
            const linked = prev.linkedBusinesses;
            const isLinked = linked.includes(businessId);
            return {
                ...prev,
                linkedBusinesses: isLinked 
                    ? linked.filter(id => id !== businessId)
                    : [...linked, businessId],
            };
        });
    };

    const businessesBySector = useMemo(() => {
        return allBusinesses.reduce((acc, business) => {
            (acc[business.sector] = acc[business.sector] || []).push(business);
            return acc;
        }, {} as Record<Sector, Business[]>);
    }, [allBusinesses]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: event?.id || Date.now() });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-3">
                {event ? `Editando: ${event.name}` : 'Crear Nuevo Evento Cultural'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-[#2c6b8f] mb-2">Nombre de la Fiesta</label>
                    <input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-[#2c6b8f] mb-2">Localidad</label>
                    <select
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white"
                    >
                       {Object.values(Sector).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-[#2c6b8f] mb-2">Fecha de Inicio</label>
                    <input 
                        type="date"
                        name="startDate" 
                        value={formData.startDate} 
                        onChange={handleInputChange}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white"
                        required
                    />
                </div>
                 <div>
                    <label className="block text-sm font-bold text-[#2c6b8f] mb-2">Fecha de Término</label>
                    <input 
                        type="date"
                        name="endDate" 
                        value={formData.endDate} 
                        onChange={handleInputChange}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-[#f06c44] mb-2">Banner Promocional / Afiche</label>
                <ImageUpload label="Arrastra o selecciona el afiche del evento" />
            </div>

            <div>
                <label className="block text-sm font-bold text-[#2c6b8f] mb-2">Negocios Vinculados</label>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 max-h-64 overflow-y-auto space-y-4">
                    {Object.entries(businessesBySector).map(([sector, businesses]) => (
                        <div key={sector}>
                            <h4 className="font-bold text-slate-300 border-b border-slate-600 pb-1 mb-2">{sector}</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {/* FIX: Explicitly cast `businesses` to `Business[]` to resolve a TypeScript type inference issue. */}
                                {(businesses as Business[]).map(business => (
                                    <label key={business.id} className="flex items-center space-x-2 bg-slate-700/50 p-2 rounded-md cursor-pointer hover:bg-slate-700">
                                        <input
                                            type="checkbox"
                                            checked={formData.linkedBusinesses.includes(business.id)}
                                            onChange={() => handleBusinessLinkToggle(business.id)}
                                            className="h-4 w-4 rounded bg-slate-600 border-slate-500 text-[#2c6b8f] focus:ring-0"
                                        />
                                        <span className="text-white text-sm">{business.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end pt-4 space-x-3 border-t border-slate-700">
                 <button type="button" onClick={onCancel} className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-500 transition-colors duration-200">
                    Cancelar
                </button>
                <button type="submit" className="bg-[#f06c44] text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-200">
                    Guardar Evento
                </button>
            </div>
        </form>
    );
};

export default CulturalEventForm;