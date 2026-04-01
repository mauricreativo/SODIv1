
import React from 'react';
import KpiCard from './KpiCard';
import BusinessSummaryTable from './BusinessSummaryTable';
import { initialBusinesses, initialSubscriptionPlans } from '../constants';

const DashboardView: React.FC = () => {
    // Calculate KPIs from mock data
    const totalLeads = initialBusinesses.reduce((sum, business) => sum + business.whatsappClicks, 0);
    const activeBusinessesCount = initialBusinesses.filter(b => b.isActive).length;
    const totalBusinesses = initialBusinesses.length;
    const projectedRevenue = initialBusinesses.reduce((sum, business) => {
        if (business.isActive) {
            const plan = initialSubscriptionPlans.find(p => p.name === business.planName);
            return sum + (plan?.price || 0);
        }
        return sum;
    }, 0);
    const pendingPayments = initialBusinesses.filter(b => {
        const paymentDate = new Date(b.paymentDate);
        const today = new Date();
        return paymentDate < today && b.isActive;
    }).length;

    const KpiChartIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
    );

    const UsersIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    );

    const DollarIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4a2 2 0 00-2-2H8a2 2 0 00-2 2h4v1M12 18V7m-3.79 4h7.58" />
        </svg>
    );

    const AlertIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    );

    return (
        <>
            <header>
                <h1 className="text-3xl font-bold text-white">Dashboard Principal</h1>
                <p className="text-slate-400 mt-1">Visión general del ecosistema TurismoTomé.</p>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <KpiCard title="Total Leads (WhatsApp Clicks)" value={totalLeads.toString()} icon={<KpiChartIcon />} />
                <KpiCard title="Locales Activos" value={`${activeBusinessesCount}/${totalBusinesses}`} icon={<UsersIcon />} />
                <KpiCard title="Ingresos Proyectados Mes" value={`$${projectedRevenue.toLocaleString('es-CL')}`} icon={<DollarIcon />} />
                <KpiCard title="Pagos Pendientes" value={pendingPayments.toString()} icon={<AlertIcon />} color="orange" />
            </section>

            <section className="mt-10 bg-slate-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Resumen de Negocios</h2>
                <BusinessSummaryTable />
            </section>
        </>
    );
};

export default DashboardView;