
import React, { useState } from 'react';
import { initialCulturalEvents, initialBusinesses } from '../constants';
import type { CulturalEvent } from '../types';
import CulturalEventForm from './CulturalEventForm';

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
    </svg>
);


const IdentityCalendar: React.FC = () => {
    const [events, setEvents] = useState<CulturalEvent[]>(initialCulturalEvents);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<CulturalEvent | null>(null);

    const handleCreateNew = () => {
        setSelectedEvent(null);
        setIsFormVisible(true);
    };

    const handleEdit = (event: CulturalEvent) => {
        setSelectedEvent(event);
        setIsFormVisible(true);
    };

    const handleCancel = () => {
        setIsFormVisible(false);
        setSelectedEvent(null);
    };
    
    const handleSave = (eventToSave: CulturalEvent) => {
        if (selectedEvent) {
            setEvents(events.map(e => e.id === eventToSave.id ? eventToSave : e));
        } else {
            const newEvent = { ...eventToSave, id: Date.now() };
            setEvents([...events, newEvent]);
        }
        handleCancel();
    };

    const getEventStatus = (startDate: string, endDate: string) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const fifteenDaysFromNow = new Date();
        fifteenDaysFromNow.setDate(today.getDate() + 15);
        fifteenDaysFromNow.setHours(0, 0, 0, 0);

        const start = new Date(startDate);
        const end = new Date(endDate);
        
        // Adjust for timezone differences when creating date from string
        start.setTime(start.getTime() + start.getTimezoneOffset() * 60 * 1000);
        end.setTime(end.getTime() + end.getTimezoneOffset() * 60 * 1000);


        if (end < today) {
            return { text: 'Finalizado', color: 'bg-slate-500/20 text-slate-300', icon: null };
        } else if (start <= today && end >= today) {
            return { text: 'En Curso', color: 'bg-green-500/20 text-green-300', icon: null };
        } else if (start > today && start <= fifteenDaysFromNow) {
            return { text: 'Visible en Home', color: 'bg-sky-500/20 text-sky-300', icon: <EyeIcon /> };
        } else {
            return { text: 'Próximo', color: 'bg-yellow-500/20 text-yellow-300', icon: null };
        }
    };
    
    if (isFormVisible) {
        return (
            <CulturalEventForm
                event={selectedEvent}
                allBusinesses={initialBusinesses}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        );
    }

    return (
        <section className="bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Próximas Festividades</h2>
                <button 
                    onClick={handleCreateNew}
                    className="bg-[#f06c44] text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                    <span>Crear Evento</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-slate-300">
                    <thead className="text-xs text-slate-100 uppercase bg-[#2c6b8f]">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nombre del Evento</th>
                            <th scope="col" className="px-6 py-3">Fechas</th>
                            <th scope="col" className="px-6 py-3 text-center">Negocios Vinculados</th>
                            <th scope="col" className="px-6 py-3 text-center">Estado</th>
                            <th scope="col" className="px-6 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => {
                            const status = getEventStatus(event.startDate, event.endDate);
                            return (
                                <tr key={event.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                    <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                        {event.name}
                                        <p className="font-normal text-xs text-slate-400">{event.location}</p>
                                    </th>
                                    <td className="px-6 py-4">
                                        {new Date(event.startDate).toLocaleDateString('es-CL', {timeZone: 'UTC'})} - {new Date(event.endDate).toLocaleDateString('es-CL', {timeZone: 'UTC'})}
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold text-white">
                                        {event.linkedBusinesses.length}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${status.color} flex items-center justify-center gap-1.5 w-fit`}>
                                                {status.icon}
                                                {status.text}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleEdit(event)} className="font-medium text-[#2c6b8f] hover:underline">
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default IdentityCalendar;