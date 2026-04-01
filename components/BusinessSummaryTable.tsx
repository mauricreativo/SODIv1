
import React, { useState } from 'react';
import type { Business, SubscriptionPlan } from '../types';
import { initialBusinesses, initialSubscriptionPlans } from '../constants';
import ToggleSwitch from './ToggleSwitch';

const calculateExpiryDate = (startDate: string, planName: string, allPlans: SubscriptionPlan[]): string => {
    const plan = allPlans.find(p => p.name === planName);
    if (!plan) return startDate;
    const start = new Date(startDate);
    start.setMonth(start.getMonth() + plan.durationInMonths);
    return start.toISOString().split('T')[0];
};

const BusinessSummaryTable: React.FC = () => {
    const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses);

    const handleToggle = (id: number) => {
        setBusinesses(prevBusinesses =>
            prevBusinesses.map(business =>
                business.id === id ? { ...business, isActive: !business.isActive } : business
            )
        );
    };
    
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


    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-slate-300">
                <thead className="text-xs text-slate-100 uppercase bg-[#2c6b8f]">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nombre del Negocio</th>
                        <th scope="col" className="px-6 py-3">Plan Asignado</th>
                        <th scope="col" className="px-6 py-3">Vencimiento</th>
                        <th scope="col" className="px-6 py-3 text-center">Estado (Público)</th>
                    </tr>
                </thead>
                <tbody>
                    {businesses.map((business) => (
                        <tr key={business.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                            <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                {business.name}
                            </th>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPlanBadgeColor(business.planName)}`}>
                                    {business.planName}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                {new Date(calculateExpiryDate(business.paymentDate, business.planName, initialSubscriptionPlans)).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </td>
                            <td className="px-6 py-4 text-center">
                                <ToggleSwitch
                                    checked={business.isActive}
                                    onChange={() => handleToggle(business.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BusinessSummaryTable;