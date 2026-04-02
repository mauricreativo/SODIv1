
import React, { useState } from 'react';
import { initialSubscriptionPlans } from '../constants';
import type { SubscriptionPlan, PlanPermissions } from '../types';
import ToggleSwitch from './ToggleSwitch';

const PlanManagerView: React.FC = () => {
    const [plans, setPlans] = useState<SubscriptionPlan[]>(initialSubscriptionPlans);
    const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleEdit = (plan: SubscriptionPlan) => {
        setEditingPlan(plan);
        setIsCreating(false);
    };

    const handleCreate = () => {
        const newPlanTemplate: SubscriptionPlan = {
            id: 0,
            name: '',
            price: 0,
            durationInMonths: 1,
            freeMonths: 0,
            color: 'gray',
            permissions: {
                homeCarousel: false, topCategory: false, routeFeatured: false,
                published: true,
                proGallery: false, historicalStory: false, campoMarSeal: false,
                posSync: false, metricsDashboard: false,
            }
        };
        setEditingPlan(newPlanTemplate);
        setIsCreating(true);
    };

    const handleCancel = () => {
        setEditingPlan(null);
        setIsCreating(false);
    };

    const handleSave = (planToSave: SubscriptionPlan) => {
        if (isCreating) {
            setPlans([...plans, { ...planToSave, id: Date.now() }]);
        } else {
            setPlans(plans.map(p => p.id === planToSave.id ? planToSave : p));
        }
        handleCancel();
    };
    
    const PlanForm: React.FC<{ plan: SubscriptionPlan, onSave: (plan: SubscriptionPlan) => void, onCancel: () => void }> = ({ plan, onSave, onCancel }) => {
        const [formData, setFormData] = useState<SubscriptionPlan>(plan);

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            const parsedValue = (name === 'price' || name === 'freeMonths') ? parseInt(value, 10) : name === 'durationInMonths' ? parseInt(value, 10) as 1 | 3 | 6 | 12 : value;
            setFormData(prev => ({ ...prev, [name]: parsedValue }));
        };
        
        const handlePermissionToggle = (permission: keyof PlanPermissions) => {
            setFormData(prev => ({
                ...prev,
                permissions: {
                    ...prev.permissions,
                    [permission]: !prev.permissions[permission],
                }
            }));
        };

        const PermissionToggle: React.FC<{ label: string; pKey: keyof PlanPermissions }> = ({ label, pKey }) => (
             <div className="flex items-center justify-between bg-slate-700/50 p-3 rounded-md">
                <span className="text-slate-300">{label}</span>
                <ToggleSwitch checked={formData.permissions[pKey]} onChange={() => handlePermissionToggle(pKey)} />
            </div>
        );

        return (
             <div className="bg-slate-800 rounded-lg shadow-lg p-6 mt-8">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-3">{isCreating ? 'Creando Nuevo Plan' : `Editando: ${plan.name}`}</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div>
                        <label className="text-xs font-bold uppercase text-[#2c6b8f]">Nombre del Plan</label>
                        <input name="name" value={formData.name} onChange={handleInputChange} className="w-full mt-1 bg-slate-700 p-2 rounded-md text-white" />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase text-[#2c6b8f]">Precio (CLP)</label>
                        <input name="price" type="number" value={formData.price} onChange={handleInputChange} className="w-full mt-1 bg-slate-700 p-2 rounded-md text-white" />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase text-[#2c6b8f]">Meses Gratis</label>
                        <input name="freeMonths" type="number" value={formData.freeMonths} onChange={handleInputChange} className="w-full mt-1 bg-slate-700 p-2 rounded-md text-white" />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase text-[#2c6b8f]">Duración</label>
                        <select name="durationInMonths" value={formData.durationInMonths} onChange={handleInputChange} className="w-full mt-1 bg-slate-700 p-2 rounded-md text-white">
                            <option value={1}>1 Mes</option>
                            <option value={3}>3 Meses</option>
                            <option value={6}>6 Meses</option>
                            <option value={12}>12 Meses</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                        <h3 className="font-semibold text-slate-400">Visibilidad</h3>
                        <PermissionToggle label="Home Carousel" pKey="homeCarousel" />
                        <PermissionToggle label="Top Categoría" pKey="topCategory" />
                        <PermissionToggle label="Destacado en Ruta" pKey="routeFeatured" />
                        <PermissionToggle label="Publicado" pKey="published" />
                    </div>
                     <div className="space-y-3">
                        <h3 className="font-semibold text-slate-400">Funciones</h3>
                        <PermissionToggle label="Galería Pro" pKey="proGallery" />
                        <PermissionToggle label="Relato Histórico" pKey="historicalStory" />
                        <PermissionToggle label="Sello Campo-Mar" pKey="campoMarSeal" />
                    </div>
                     <div className="space-y-3">
                        <h3 className="font-semibold text-slate-400">Tech</h3>
                        <PermissionToggle label="Sincronización POS" pKey="posSync" />
                        <PermissionToggle label="Dashboard de Métricas" pKey="metricsDashboard" />
                    </div>
                </div>
                
                 <div className="flex justify-end pt-6 mt-6 border-t border-slate-700 space-x-3">
                    <button onClick={onCancel} className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-500">Cancelar</button>
                    <button onClick={() => onSave(formData)} className="bg-[#f06c44] text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600">Guardar Plan</button>
                </div>
            </div>
        )
    };

    return (
        <>
            <header>
                <h1 className="text-3xl font-bold text-white">Centro de Comando de Planes</h1>
                <p className="text-slate-400 mt-1">Crea y gestiona los planes de suscripción de la plataforma.</p>
            </header>

            {isCreating || editingPlan ? (
                <PlanForm plan={editingPlan!} onSave={handleSave} onCancel={handleCancel} />
            ) : (
                <section className="mt-8">
                    <div className="flex justify-end mb-6">
                        <button onClick={handleCreate} className="bg-[#f06c44] text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200">
                           Crear Nuevo Plan
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {plans.map(plan => (
                            <div key={plan.id} className={`bg-slate-800 rounded-lg shadow-lg p-6 border-t-4 flex flex-col
                                ${plan.color === 'gray' ? 'border-slate-500' : ''}
                                ${plan.color === 'blue' ? 'border-[#2c6b8f]' : ''}
                                ${plan.color === 'orange' ? 'border-[#f06c44] shadow-[0_0_15px_rgba(240,108,68,0.5)]' : ''}
                            `}>
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                                    <p className="text-4xl font-extrabold text-white my-4">${plan.price.toLocaleString('es-CL')} <span className="text-base font-normal text-slate-400">/ {plan.durationInMonths} mes(es)</span></p>
                                    {plan.freeMonths > 0 && (
                                        <p className="text-green-400 text-sm font-bold mb-4">🎁 +{plan.freeMonths} mes(es) gratis!</p>
                                    )}
                                    <ul className="space-y-2 text-sm">
                                        {Object.entries(plan.permissions).map(([key, value]) => (
                                            <li key={key} className={`flex items-center ${value ? 'text-slate-200' : 'text-slate-500 line-through'}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${value ? 'text-green-400' : 'text-slate-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-6">
                                    <button onClick={() => handleEdit(plan)} className="w-full bg-[#2c6b8f] text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                        Editar Plan
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </>
    );
};

export default PlanManagerView;