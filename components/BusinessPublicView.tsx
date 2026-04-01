
import React from 'react';
import { initialBusinesses } from '../constants';
import type { Business } from '../types';

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 20l-4.95-6.05a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8 9a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
        <path d="M2.553 6.95A6.962 6.962 0 0110 3c2.488 0 4.742.992 6.345 2.622a1 1 0 11-1.414 1.414A4.962 4.962 0 0010 5a4.962 4.962 0 00-4.95 4.385 1 1 0 11-1.98-.285A6.962 6.962 0 0110 3z" />
        <path d="M17.447 13.05A6.962 6.962 0 0110 17c-2.488 0-4.742-.992-6.345-2.622a1 1 0 111.414-1.414A4.962 4.962 0 0010 15a4.962 4.962 0 004.95-4.385 1 1 0 111.98.285A6.962 6.962 0 0110 17z" />
    </svg>
);


interface BusinessPublicViewProps {
    business: Business;
    onBack: () => void;
}

const BusinessPublicView: React.FC<BusinessPublicViewProps> = ({ business, onBack }) => {
    
    const consumers = React.useMemo(() => {
        return initialBusinesses.filter(b => 
            b.localPartners?.some(p => p.partnerId === business.id)
        );
    }, [business.id]);

    return (
        <div className="space-y-8">
            <div className="flex justify-start">
                 <button onClick={onBack} className="bg-slate-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors duration-200 flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                    <span>Volver a la Lista</span>
                </button>
            </div>

            <div className="text-center">
                <h2 className="text-4xl font-extrabold text-white">{business.name}</h2>
                <p className="text-lg text-slate-400 mt-2">{business.shortDescription}</p>
            </div>
            
            <div className="max-w-3xl mx-auto">
                 <p className="text-slate-300 whitespace-pre-wrap leading-relaxed text-center">{business.longDescription}</p>
            </div>

            {business.localPartners && business.localPartners.length > 0 && (
                <div className="p-6 bg-slate-700/30 backdrop-blur-md border border-slate-600/50 rounded-lg max-w-3xl mx-auto">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                        <LinkIcon />
                        Sabores con Origen Local
                    </h3>
                    <div className="space-y-3">
                        {business.localPartners.map(partner => {
                            const partnerBusiness = initialBusinesses.find(b => b.id === partner.partnerId);
                            if (!partnerBusiness) return null;
                            
                            return (
                                <div key={partner.partnerId} className="bg-slate-800/50 p-3 rounded-md flex justify-between items-center">
                                    <p className="text-slate-300">
                                        Este local prefiere <strong className="text-white">{partner.productProvided}</strong> de <strong className="text-white">{partner.partnerName}</strong> ({partnerBusiness.sector})
                                    </p>
                                    <button className="text-xs bg-emerald-500/20 text-emerald-300 font-bold py-1 px-3 rounded-full hover:bg-emerald-500/40 transition-colors">
                                        Ver el origen
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            
            {consumers.length > 0 && (
                 <div className="p-6 bg-slate-700/30 backdrop-blur-md border border-slate-600/50 rounded-lg max-w-3xl mx-auto">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                        <LocationIcon />
                        Dónde Disfrutar Nuestros Productos
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {consumers.map(consumer => (
                             <div key={consumer.id} className="bg-slate-800/50 p-2 px-3 rounded-md">
                                <p className="text-slate-300 font-semibold">{consumer.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}


        </div>
    );
};

export default BusinessPublicView;