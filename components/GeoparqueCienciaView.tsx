
import React from 'react';
import GeologyExperienceDashboard from './GeologyExperienceDashboard';

const GeoparqueCienciaView: React.FC = () => {
    return (
        <>
            <header>
                <h1 className="text-3xl font-bold text-white">Gestión de Geoparque y Ciencia</h1>
                <p className="text-slate-400 mt-1">Administra el turismo geológico, los hitos y las rutas científicas de la comuna.</p>
            </header>
            <section className="mt-8">
                <GeologyExperienceDashboard />
            </section>
        </>
    );
};

export default GeoparqueCienciaView;