
import React from 'react';
import IdentityCalendar from './IdentityCalendar';

const CalendarView: React.FC = () => {
    return (
        <>
            <header>
                <h1 className="text-3xl font-bold text-white">Calendario de Identidad</h1>
                <p className="text-slate-400 mt-1">Gestiona los eventos de la comunidad y fiestas costumbristas de la comuna.</p>
            </header>
            <section className="mt-8">
                <IdentityCalendar />
            </section>
        </>
    );
};

export default CalendarView;