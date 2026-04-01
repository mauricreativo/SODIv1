
import React, { useState } from 'react';
import type { Business, SubscriptionPlan } from '../types';
import { PaymentStatus, Category, Sector } from '../types';
import { initialSubscriptionPlans } from '../constants';

interface BusinessListProps {
    businesses: Business[];
    onEdit: (business: Business) => void;
    onCreate: () => void;
    onViewPublic: (business: Business) => void;
}

const calculateExpiryDate = (startDate: string, planName: string, allPlans: SubscriptionPlan[]): string => {
    const plan = allPlans.find(p => p.name === planName);
    if (!plan) return startDate;
    const start = new Date(startDate);
    start.setMonth(start.getMonth() + plan.durationInMonths);
    return start.toISOString().split('T')[0];
};

const BusinessList: React.FC<BusinessListProps> = ({ businesses, onEdit, onCreate, onViewPublic }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterSector, setFilterSector] = useState('');
    const [filterPaymentStatus, setFilterPaymentStatus] = useState('');
    
    const getPlanBadgeColor = (planName: string) => {
        const plan = initialSubscriptionPlans.find(p => p.name === planName);
        if (!plan) return 'bg-gray-500';
        switch (plan.color) {
            case 'gray': return 'bg-gray-500 text-gray-100';
            case 'blue': return 'bg-[#2c6b8f] text-white';
            case 'orange': return 'bg-[#f06c44] text-white';
            default: return 'bg-gray-500';
        }
    };
    
    const getPaymentStatusBadgeColor = (status: PaymentStatus) => {
        switch (status) {
            case PaymentStatus.AL_DIA: return 'bg-green-500 text-white';
            case PaymentStatus.PENDIENTE: return 'bg-red-500 text-white';
            default: return 'bg-gray-500';
        }
    };

    const filteredBusinesses = businesses.filter(business => {
        return (
            business.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterCategory === '' || business.category === filterCategory) &&
            (filterSector === '' || business.sector === filterSector) &&
            (filterPaymentStatus === '' || business.paymentStatus === filterPaymentStatus)
        );
    });

    const FilterSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
        <select {...props} className="bg-slate-700 border border-slate-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#2c6b8f] w-full sm:w-auto" />
    );

    return (
        <div>
             <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                 <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <input 
                        type="text"
                        placeholder="Buscar por nombre..."
                        className="bg-slate-700 border border-slate-600 rounded-md p-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2c6b8f] w-full sm:w-48"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FilterSelect value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                        <option value="">Categoría</option>
                        {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                    </FilterSelect>
                    <FilterSelect value={filterSector} onChange={(e) => setFilterSector(e.target.value)}>
                        <option value="">Sector</option>
                        {Object.values(Sector).map(s => <option key={s} value={s}>{s}</option>)}
                    </FilterSelect>
                    <FilterSelect value={filterPaymentStatus} onChange={(e) => setFilterPaymentStatus(e.target.value)}>
                        <option value="">Estado de Pago</option>
                        {Object.values(PaymentStatus).map(ps => <option key={ps} value={ps}>{ps}</option>)}
                    </FilterSelect>
                 </div>
                 <button onClick={onCreate} className="bg-[#f06c44] text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center space-x-2 w-full md:w-auto flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    <span>Nuevo Negocio</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-slate-300">
                    <thead className="text-xs text-slate-100 uppercase bg-[#2c6b8f]">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nombre</th>
                            <th scope="col" className="px-6 py-3">Sector</th>
                            <th scope="col" className="px-6 py-3">Plan</th>
                            <th scope="col" className="px-6 py-3">Estado de Pago</th>
                            <th scope="col" className="px-6 py-3">Vencimiento</th>
                            <th scope="col" className="px-6 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBusinesses.map((business) => (
                            <tr key={business.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    {business.name}
                                </th>
                                <td className="px-6 py-4">{business.sector}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPlanBadgeColor(business.planName)}`}>
                                        {business.planName}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentStatusBadgeColor(business.paymentStatus)}`}>
                                        {business.paymentStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(calculateExpiryDate(business.paymentDate, business.planName, initialSubscriptionPlans)).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </td>
                                <td className="px-6 py-4 text-right space-x-4">
                                    <button onClick={() => onViewPublic(business)} className="font-medium text-emerald-400 hover:underline">
                                        Ver Ficha
                                    </button>
                                    <button onClick={() => onEdit(business)} className="font-medium text-[#2c6b8f] hover:underline">
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BusinessList;