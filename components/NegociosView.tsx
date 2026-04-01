
import React, { useState } from 'react';
import BusinessForm from './BusinessForm';
import BusinessList from './BusinessList';
import BusinessPublicView from './BusinessPublicView';
import type { Business } from '../types';
import { initialBusinesses } from '../constants';

const NegociosView: React.FC = () => {
    const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses);
    const [viewMode, setViewMode] = useState<'list' | 'form' | 'publicView'>('list');
    const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

    const handleCreate = () => {
        setSelectedBusiness(null); 
        setViewMode('form');
    };

    const handleEdit = (business: Business) => {
        setSelectedBusiness(business);
        setViewMode('form');
    };
    
    const handleViewPublic = (business: Business) => {
        setSelectedBusiness(business);
        setViewMode('publicView');
    };

    const handleBackToList = () => {
        setViewMode('list');
        setSelectedBusiness(null);
    };

    const handleSave = (savedBusiness: Business) => {
        if (selectedBusiness && !savedBusiness.id) { // Editing a business that might not have an id yet in the form state
            savedBusiness.id = selectedBusiness.id;
        }

        if (selectedBusiness) {
            // Edit existing
            setBusinesses(businesses.map(b => b.id === savedBusiness.id ? savedBusiness : b));
        } else {
            // Create new
            const newBusiness = { ...savedBusiness, id: Date.now(), whatsappClicks: 0 }; // Simple ID generation
            setBusinesses([...businesses, newBusiness]);
        }
        handleBackToList();
    };

    const renderContent = () => {
        switch(viewMode) {
            case 'form':
                return <BusinessForm business={selectedBusiness} onSave={handleSave} onCancel={handleBackToList} />;
            case 'publicView':
                return selectedBusiness ? <BusinessPublicView business={selectedBusiness} onBack={handleBackToList} /> : null;
            case 'list':
            default:
                 return <BusinessList businesses={businesses} onCreate={handleCreate} onEdit={handleEdit} onViewPublic={handleViewPublic} />;
        }
    };
    
    const getHeaderTitle = () => {
        switch(viewMode) {
            case 'form':
                return selectedBusiness ? `Editando: ${selectedBusiness.name}` : 'Creando Nuevo Negocio';
            case 'publicView':
                 return selectedBusiness ? `Ficha Pública: ${selectedBusiness.name}` : 'Gestión de Negocios';
            case 'list':
            default:
                return 'Gestión de Negocios';
        }
    };
    
    const getHeaderSubtitle = () => {
        switch(viewMode) {
            case 'form':
                return 'Modificando los detalles y configuración del local.';
            case 'publicView':
                 return 'Previsualización de la información que verán los turistas.';
            case 'list':
            default:
                return 'Visualiza, crea o edita los locales comerciales.';
        }
    }


    return (
        <>
            <header>
                <h1 className="text-3xl font-bold text-white">{getHeaderTitle()}</h1>
                <p className="text-slate-400 mt-1">{getHeaderSubtitle()}</p>
            </header>
            <section className="mt-8">
                 {viewMode !== 'form' && (
                    <div className="bg-slate-800 rounded-lg shadow-lg p-6">
                        {renderContent()}
                    </div>
                )}
                {viewMode === 'form' && renderContent()}
            </section>
        </>
    );
};

export default NegociosView;