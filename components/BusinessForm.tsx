
import React, { useState, useEffect, useMemo } from 'react';
import { Sector, PaymentStatus, Category } from '../types';
import type { Business, Specialty, DaySchedule, UnitType, Promotion, LocalPartner, SubscriptionPlan } from '../types';
import ImageUpload from './ImageUpload';
import ToggleSwitch from './ToggleSwitch';
import BusinessHoursEditor from './BusinessHoursEditor';
import ServiceAttributesChecklist from './ServiceAttributesChecklist';
import { initialBusinesses, initialSubscriptionPlans } from '../constants';

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.505 1.905 6.344l-1.225 4.485 4.635-1.218zM8.332 9.55c.023-.198.241-.352.488-.431.247-.079.587-.064.833.039.245.102.378.223.502.418.124.196.258.492.382.787.123.295.232.502.37.564.139.061.373.019.511-.045.138-.063.296-.113.476-.197s.418-.266.6-.441c.181-.176.353-.393.509-.65.156-.257.246-.564.246-.564s-.011-.5-.034-.551c-.023-.051-.232-.232-.34-.294s-.232-.08-.283-.08c-.051 0-.113.011-.164.023s-.295.102-.451.246c-.156.145-.266.304-.338.418s-.145.247-.232.394c-.088.146-.164.246-.223.318s-.156.08-.246.039c-.09-.042-.232-.123-.338-.204s-.295-.211-.429-.394c-.134-.182-.246-.405-.338-.65s-.164-.451-.232-.6c-.069-.149-.138-.247-.232-.295s-.204-.069-.283-.051c-.08.019-.247.051-.378.138s-.246.211-.295.283c-.05.072-.123.232-.123.379s0 .304.011.429c.011.124.023.232.023.246s.011.138.011.164c0 .025-.034.138-.08.197c-.046.059-.138.112-.223.156-.086.042-.204.061-.283.051-.08-.011-.232-.042-.379-.145s-.283-.232-.382-.363c-.1-.131-.211-.304-.283-.502s-.138-.418-.138-.418z"/>
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
    </svg>
);

const LockedFeatureBlock: React.FC<{ children: React.ReactNode, isLocked: boolean, lockReason: string }> = ({ children, isLocked, lockReason }) => {
    if (!isLocked) {
        return <>{children}</>;
    }
    return (
        <div className="relative">
            <div className="absolute inset-0 bg-slate-800/50 backdrop-blur-sm rounded-lg z-10 flex flex-col items-center justify-center">
                <LockIcon />
                <p className="text-slate-300 font-semibold">{lockReason}</p>
            </div>
            <div className="opacity-30 pointer-events-none">
                {children}
            </div>
        </div>
    );
};

const calculateExpiryDate = (startDate: string, planName: string, allPlans: SubscriptionPlan[]): string => {
    const plan = allPlans.find(p => p.name === planName);
    if (!plan) return startDate;
    const start = new Date(startDate);
    start.setMonth(start.getMonth() + plan.durationInMonths);
    return start.toISOString().split('T')[0];
};


const NEW_BUSINESS_TEMPLATE: Omit<Business, 'id' | 'whatsappClicks'> = {
    ownerName: '', privateContactNumber: '', email: '',
    adminName: '', adminPhoneNumber: '',
    planName: 'Básico', category: Category.RESTAURANTE, name: '', whatsappNumber: '',
    phoneNumber: '', googleMapsLink: '',
    hours: [
        { day: 'Lunes', opens: '09:00', closes: '20:00', closed: false },
        { day: 'Martes', opens: '09:00', closes: '20:00', closed: false },
        { day: 'Miércoles', opens: '09:00', closes: '20:00', closed: false },
        { day: 'Jueves', opens: '09:00', closes: '20:00', closed: false },
        { day: 'Viernes', opens: '09:00', closes: '22:00', closed: false },
        { day: 'Sábado', opens: '10:00', closes: '22:00', closed: false },
        { day: 'Domingo', opens: '', closes: '', closed: true },
    ],
    serviceAttributes: [], digitalMenuLink: '', heroImage: '', galleryImages: ['', '', '', ''],
    specialties: [
        { photo: '', name: '', description: '', price: '0', showPrice: true },
        { photo: '', name: '', description: '', price: '0', showPrice: true },
        { photo: '', name: '', description: '', price: '0', showPrice: true },
    ],
    checkIn: '15:00', checkOut: '12:00',
    unitTypes: [
        { name: '', capacity: '' },
        { name: '', capacity: '' },
        { name: '', capacity: '' },
    ],
    hasPromotionsActive: true,
    promotions: [
        { id: `new-promo-${Date.now()}-1`, image: '', title: '', normalPrice: 0, promoPrice: 0, isActive: false, isFeatured: false },
        { id: `new-promo-${Date.now()}-2`, image: '', title: '', normalPrice: 0, promoPrice: 0, isActive: false, isFeatured: false },
        { id: `new-promo-${Date.now()}-3`, image: '', title: '', normalPrice: 0, promoPrice: 0, isActive: false, isFeatured: false },
    ],
    selloCampoMar: false,
    productoEstrellaLocal: '',
    relatoHistorico: '',
    localPartners: [],
    shortDescription: '', longDescription: '', sector: Sector.EL_MORRO,
    paymentDate: new Date().toISOString().split('T')[0],
    paymentStatus: PaymentStatus.PENDIENTE, isActive: true,
};

const BusinessForm: React.FC<{ business: any, onSave: any, onCancel: any }> = ({ business, onSave, onCancel }) => {
    const [formData, setFormData] = useState<any>(() => {
        const initial = business ? JSON.parse(JSON.stringify(business)) : { ...NEW_BUSINESS_TEMPLATE };
        initial.expiryDate = calculateExpiryDate(initial.paymentDate, initial.planName, initialSubscriptionPlans);
        if (!initial.unitTypes) initial.unitTypes = NEW_BUSINESS_TEMPLATE.unitTypes;
        if (!initial.specialties) initial.specialties = NEW_BUSINESS_TEMPLATE.specialties;
        if (!initial.localPartners) initial.localPartners = [];

        const currentPromos = initial.promotions || [];
        initial.promotions = Array.from({ length: 3 }).map((_, i) => currentPromos[i] || { 
             id: `form-promo-${initial.id || 'new'}-${i}`, 
             image: '', 
             title: '', 
             normalPrice: 0, 
             promoPrice: 0, 
             isActive: false, 
             isFeatured: false 
        });

        if (initial.hasPromotionsActive === undefined) initial.hasPromotionsActive = true;
        if (initial.selloCampoMar === undefined) initial.selloCampoMar = false;

        return initial;
    });
    
    const [newPartnerId, setNewPartnerId] = useState<string>('');
    const [newPartnerProductProvided, setNewPartnerProductProvided] = useState<string>('');

    const selectedPlan = useMemo(() => {
        return initialSubscriptionPlans.find(p => p.name === formData.planName);
    }, [formData.planName]);


    useEffect(() => {
        const newExpiry = calculateExpiryDate(formData.paymentDate, formData.planName, initialSubscriptionPlans);
        if (newExpiry !== formData.expiryDate) {
            setFormData((prev: any) => ({ ...prev, expiryDate: newExpiry }));
        }
    }, [formData.planName, formData.paymentDate]);
    
    useEffect(() => {
        const hasPartners = formData.localPartners && formData.localPartners.length > 0;
        if (hasPartners && !formData.selloCampoMar) {
            setFormData(prev => ({ ...prev, selloCampoMar: true }));
        }
    }, [formData.localPartners]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSpecialtyChange = (index: number, field: keyof Specialty, value: string | boolean) => {
        const updatedSpecialties = [...formData.specialties];
        (updatedSpecialties[index] as any)[field] = value;
        setFormData((prev: any) => ({ ...prev, specialties: updatedSpecialties }));
    };
    
    const handleUnitTypeChange = (index: number, field: keyof UnitType, value: string) => {
        const updatedUnitTypes = [...formData.unitTypes];
        (updatedUnitTypes[index] as any)[field] = value;
        setFormData((prev: any) => ({ ...prev, unitTypes: updatedUnitTypes }));
    };

    const handlePromotionChange = (index: number, field: keyof Promotion, value: string | boolean | number) => {
        const updatedPromotions = [...formData.promotions];
        if (!updatedPromotions[index]) {
            updatedPromotions[index] = { id: `form-promo-added-${index}`, image: '', title: '', normalPrice: 0, promoPrice: 0, isActive: false, isFeatured: false };
        }
        (updatedPromotions[index] as any)[field] = value;
        setFormData((prev: any) => ({ ...prev, promotions: updatedPromotions }));
    };
    
    const handleAddPartner = () => {
        if (!newPartnerId || !newPartnerProductProvided) return;
        const partner = initialBusinesses.find(b => b.id === parseInt(newPartnerId, 10));
        if (!partner) return;

        const newPartner: LocalPartner = {
            partnerId: partner.id,
            partnerName: partner.name,
            productProvided: newPartnerProductProvided,
            sector: partner.sector,
        };
        
        setFormData((prev:any) => ({
            ...prev,
            localPartners: [...(prev.localPartners || []), newPartner]
        }));
        
        setNewPartnerId('');
        setNewPartnerProductProvided('');
    };

    const handleRemovePartner = (indexToRemove: number) => {
        setFormData((prev:any) => ({
            ...prev,
            localPartners: (prev.localPartners || []).filter((_:any, index:number) => index !== indexToRemove)
        }));
    };

    const handleAttributeChange = (name: string, isChecked: boolean) => {
        setFormData((prev: any) => {
            const current = prev.serviceAttributes || [];
            return {
                ...prev,
                serviceAttributes: isChecked ? [...new Set([...current, name])] : current.filter((a: any) => a !== name)
            };
        });
    };
    
    const availablePartners = initialBusinesses.filter(b => b.id !== formData.id && !(formData.localPartners || []).some((p: LocalPartner) => p.partnerId === b.id));
    const isSelloDisabled = formData.localPartners && formData.localPartners.length > 0;


    const FormBlock: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
        <div className="w-full flex flex-col bg-slate-800/60 p-6 rounded-xl border border-slate-700 shadow-xl overflow-visible h-auto min-h-fit">
            <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-3 mb-6 flex items-center">
                <span className="w-1 h-6 bg-[#f06c44] mr-3 rounded-full"></span>
                {title}
            </h3>
            <div className="flex-1 h-auto">{children}</div>
        </div>
    );

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave({...formData, hasPromotionsActive: true}); }} className="flex flex-col space-y-12 pb-32 max-w-6xl mx-auto">
            
            <FormBlock title="Gestión Administrativa (Privado)">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="text-xs font-black uppercase text-[#2c6b8f]">Dueño</label>
                        <input name="ownerName" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white mt-1" value={formData.ownerName} onChange={handleInputChange} placeholder="Nombre Dueño" />
                    </div>
                    <div>
                        <label className="text-xs font-black uppercase text-[#2c6b8f]">Celular Dueño</label>
                        <input name="privateContactNumber" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white mt-1" value={formData.privateContactNumber} onChange={handleInputChange} placeholder="+569..." />
                    </div>
                    <div>
                        <label className="text-xs font-black uppercase text-[#2c6b8f]">Correo Dueño</label>
                        <input name="email" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white mt-1" value={formData.email} onChange={handleInputChange} placeholder="email@..." />
                    </div>
                    <div>
                        <label className="text-xs font-black uppercase text-[#2c6b8f]">Administrador</label>
                        <input name="adminName" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white mt-1" value={formData.adminName} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className="text-xs font-black uppercase text-[#2c6b8f]">Celular Admin</label>
                        <input name="adminPhoneNumber" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white mt-1" value={formData.adminPhoneNumber} onChange={handleInputChange} />
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="text-xs font-black uppercase text-[#f06c44]">Plan Actual</label>
                            <select name="planName" className="w-full bg-slate-900 p-2 rounded text-white mt-1" value={formData.planName} onChange={handleInputChange}>
                                {initialSubscriptionPlans.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-black uppercase text-slate-500">Publicación</label>
                            <input type="date" className="w-full bg-transparent text-white mt-1" value={formData.paymentDate} readOnly />
                        </div>
                        <div>
                            <label className="text-xs font-black uppercase text-green-500">Término (Auto)</label>
                            <input type="date" className="w-full bg-transparent text-green-400 font-bold mt-1" value={formData.expiryDate} readOnly />
                        </div>
                    </div>
                </div>
            </FormBlock>

            <FormBlock title="Información del Negocio (Web)">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col">
                        <label className="text-xs font-black uppercase tracking-wider text-[#2c6b8f] mb-1">Categoría</label>
                        <select name="category" className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-white font-bold" value={formData.category} onChange={handleInputChange}>
                            {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs font-black uppercase tracking-wider text-[#2c6b8f] mb-1">Nombre Comercial</label>
                        <input name="name" className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-white text-lg" value={formData.name} onChange={handleInputChange} />
                    </div>
                </div>
            </FormBlock>

            <FormBlock title="Ubicación y Contacto (Público)">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-xs font-black uppercase text-[#2c6b8f]">Sector</label>
                        <select name="sector" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white mt-1" value={formData.sector} onChange={handleInputChange}>
                           {Object.values(Sector).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="text-xs font-black uppercase text-[#2c6b8f]">Link Google Maps</label>
                        <input name="googleMapsLink" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white mt-1" value={formData.googleMapsLink || ''} onChange={handleInputChange} placeholder="https://maps.app.goo.gl/..." />
                    </div>
                     <div>
                        <label className="text-xs font-black uppercase text-[#2c6b8f]">Nº WhatsApp</label>
                        <input name="whatsappNumber" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white mt-1" value={formData.whatsappNumber || ''} onChange={handleInputChange} placeholder="+569..." />
                    </div>
                     <div>
                        <label className="text-xs font-black uppercase text-[#2c6b8f]">Nº Teléfono Fijo/Llamadas</label>
                        <input name="phoneNumber" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white mt-1" value={formData.phoneNumber || ''} onChange={handleInputChange} placeholder="+5641..." />
                    </div>
                </div>
            </FormBlock>

            <FormBlock title="Identidad y Relato (PLADETUR)">
                 <div className="space-y-6">
                    <LockedFeatureBlock 
                        isLocked={!selectedPlan?.permissions.campoMarSeal}
                        lockReason={`Disponible en planes con "Sello Campo-Mar"`}>
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h4 className="font-bold text-white">Sello Campo-Mar</h4>
                                <p className="text-sm text-slate-400">
                                    {isSelloDisabled 
                                        ? 'Asignado automáticamente por tener alianzas locales.'
                                        : 'Marca este negocio como parte de la ruta gastronómica oficial.'
                                    }
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <ToggleSwitch 
                                    checked={formData.selloCampoMar || false} 
                                    onChange={() => setFormData((prev: any) => ({ ...prev, selloCampoMar: !prev.selloCampoMar }))} 
                                    disabled={isSelloDisabled}
                                />
                            </div>
                        </div>
                    </LockedFeatureBlock>
                    
                    {formData.selloCampoMar && (
                        <div className="pl-4 border-l-4 border-[#2c6b8f]">
                            <label className="text-xs font-black uppercase text-[#2c6b8f]">Producto Estrella / Plato Identitario</label>
                            <input 
                                name="productoEstrellaLocal" 
                                className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white mt-1" 
                                value={formData.productoEstrellaLocal || ''} 
                                onChange={handleInputChange} 
                                placeholder="Ej: Jaiba de Coliumo, Tortilla de Rescoldo" 
                            />
                        </div>
                    )}
                    
                    <div>
                        <label className="text-xs font-black uppercase text-slate-400">Descripción Corta (Web)</label>
                         <input 
                            name="shortDescription"
                            className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white mt-1"
                            value={formData.shortDescription || ''}
                            onChange={handleInputChange}
                            placeholder="Frase clave del negocio (máx 100 caracteres)"
                            maxLength={100}
                        />
                    </div>
                     <div>
                        <label className="text-xs font-black uppercase text-slate-400">Descripción Larga (Web)</label>
                         <textarea 
                            name="longDescription"
                            rows={4}
                            className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white mt-1"
                            value={formData.longDescription || ''}
                            onChange={handleInputChange}
                            placeholder="Descripción detallada de los servicios, ambiente, etc."
                        />
                    </div>
                     <div>
                        <label className="text-xs font-black uppercase text-slate-400">Relato e Historia (Storytelling PLADETUR)</label>
                        <textarea 
                            name="relatoHistorico"
                            rows={5}
                            maxLength={500}
                            className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white mt-1"
                            value={formData.relatoHistorico || ''}
                            onChange={handleInputChange}
                            placeholder="Cuenta la historia de tu negocio, su valor patrimonial o su conexión con la identidad de Tomé (máx. 500 caracteres)."
                        />
                    </div>
                </div>
            </FormBlock>
            
            <FormBlock title="Alianzas Estratégicas (Campo-Mar)">
                <div className="space-y-4">
                    {(formData.localPartners || []).map((partner: LocalPartner, index: number) => (
                        <div key={partner.partnerId} className="flex items-center justify-between bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                            <div>
                                <p className="font-bold text-white">{partner.partnerName} <span className="text-xs text-slate-400">({partner.sector})</span></p>
                                <p className="text-sm text-slate-400">Insumo: <span className="font-semibold">{partner.productProvided}</span></p>
                            </div>
                            <button type="button" onClick={() => handleRemovePartner(index)} className="text-red-400 hover:text-red-300 font-bold text-xs">QUITAR</button>
                        </div>
                    ))}
                    
                     <div className="pt-4 border-t border-slate-700/50 flex flex-col md:flex-row items-end gap-4">
                        <div className="w-full md:w-1/2">
                            <label className="text-xs font-black uppercase text-slate-400">Seleccionar Partner</label>
                            <select 
                                value={newPartnerId} 
                                onChange={(e) => setNewPartnerId(e.target.value)}
                                className="w-full bg-slate-700 border border-slate-600 p-2 rounded-lg text-white mt-1"
                            >
                                <option value="">-- Elige un negocio --</option>
                                {availablePartners.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                        </div>
                         <div className="w-full md:flex-1">
                            <label className="text-xs font-black uppercase text-slate-400">¿Qué producto o insumo provee?</label>
                            <input 
                                value={newPartnerProductProvided}
                                onChange={(e) => setNewPartnerProductProvided(e.target.value)}
                                placeholder="Ej: Vino País de cepas patrimoniales"
                                className="w-full bg-slate-700 border border-slate-600 p-2 rounded-lg text-white mt-1"
                            />
                        </div>
                        <button 
                            type="button" 
                            onClick={handleAddPartner}
                            className="w-full md:w-auto px-4 py-2 bg-[#2c6b8f] text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0"
                        >
                            Añadir Alianza
                        </button>
                    </div>
                </div>
            </FormBlock>

            <FormBlock title="Horarios de Atención (GMB Style)">
                <BusinessHoursEditor hours={formData.hours} onChange={(idx, f, v) => {
                    const h = [...formData.hours]; (h[idx] as any)[f] = v; setFormData({...formData, hours: h});
                }} />
            </FormBlock>
            
            {formData.category === Category.RESTAURANTE && (
                <FormBlock title="Especialidades y Menú Digital">
                    <div className="mb-8 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                        <label className="text-xs font-black uppercase text-[#f06c44] mb-2 block">Link a Carta Digital</label>
                        <input name="digitalMenuLink" className="w-full bg-slate-900 p-3 rounded text-white border border-slate-700" value={formData.digitalMenuLink || ''} onChange={handleInputChange} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                        {(formData.specialties || []).map((specialty: any, index: number) => (
                            <div key={index} className="flex flex-col bg-slate-900 p-5 rounded-xl border border-slate-700 space-y-4 shadow-2xl min-h-fit">
                                <ImageUpload label={`Foto Plato ${index + 1}`} />
                                <input placeholder="Nombre del Plato" className="w-full bg-slate-800 p-3 rounded-lg text-white text-sm" value={specialty.name} onChange={(e) => handleSpecialtyChange(index, 'name', e.target.value)} />
                                <textarea placeholder="Descripción..." rows={4} className="w-full bg-slate-800 p-3 rounded-lg text-white text-sm" value={specialty.description} onChange={(e) => handleSpecialtyChange(index, 'description', e.target.value)} />
                                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                                    <input type="number" className="w-24 bg-slate-800 p-2 rounded text-white font-bold" value={specialty.price} onChange={(e) => handleSpecialtyChange(index, 'price', e.target.value)} />
                                    <div className="flex items-center space-x-2">
                                        <ToggleSwitch checked={specialty.showPrice} onChange={() => handleSpecialtyChange(index, 'showPrice', !specialty.showPrice)} />
                                        <span className="text-[10px] text-slate-500">Público</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </FormBlock>
            )}
            
            {formData.category === Category.ALOJAMIENTO && (
                <FormBlock title="Configuración de Alojamiento">
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-md font-bold text-slate-300 mb-4 border-b border-slate-700 pb-2">Horarios de Recepción</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div>
                                    <label className="text-xs font-black uppercase text-[#2c6b8f]">Check-in</label>
                                    <input name="checkIn" type="time" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white mt-1" value={formData.checkIn || ''} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label className="text-xs font-black uppercase text-[#2c6b8f]">Check-out</label>
                                    <input name="checkOut" type="time" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white mt-1" value={formData.checkOut || ''} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-md font-bold text-slate-300 mb-4 border-b border-slate-700 pb-2">Capacidad y Tipos de Unidad</h4>
                            <div className="space-y-4 mt-4">
                                {(formData.unitTypes || []).map((unit: any, index: number) => (
                                    <div key={index} className="grid grid-cols-2 gap-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                                        <input placeholder="Ej: Cabaña Familiar" className="w-full bg-slate-800 p-2 rounded-lg text-white text-sm" value={unit.name} onChange={(e) => handleUnitTypeChange(index, 'name', e.target.value)} />
                                        <input placeholder="Ej: 4 personas" className="w-full bg-slate-800 p-2 rounded-lg text-white text-sm" value={unit.capacity} onChange={(e) => handleUnitTypeChange(index, 'capacity', e.target.value)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </FormBlock>
            )}

            {formData.hasPromotionsActive && formData.promotions.some((p: Promotion) => p.title) && (
                <FormBlock title="Ofertas Especiales (Vista Previa Pública)">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {formData.promotions.filter((p: Promotion) => p.title && p.isActive).map((promo: Promotion) => {
                            const normalPrice = promo.normalPrice;
                            const offerPrice = promo.promoPrice;
                            const savings = normalPrice > 0 && offerPrice > 0 ? normalPrice - offerPrice : 0;
                            const savingsPercent = normalPrice > 0 && savings > 0 ? Math.round((savings / normalPrice) * 100) : 0;
                            
                            const hasDelivery = formData.serviceAttributes?.includes('Delivery');
                            let smartButtonText = '';
                            let showSmartButton = true;

                            if (hasDelivery) {
                                smartButtonText = 'Pedir Delivery';
                            } else {
                                switch (formData.category) {
                                    case Category.ALOJAMIENTO:
                                        smartButtonText = 'Consultar Disponibilidad';
                                        break;
                                    case Category.RESTAURANTE:
                                        showSmartButton = false;
                                        break;
                                    default: // COMERCIO, PANORAMA, etc.
                                        smartButtonText = 'Ver Oferta';
                                        break;
                                }
                            }

                            return (
                                <div key={promo.id} className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
                                    <div className="aspect-square bg-slate-700 flex items-center justify-center text-slate-500">
                                        <span className="text-sm">Imagen 1:1</span>
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <h4 className="font-bold text-white truncate">{promo.title}</h4>
                                        <div className="flex items-baseline gap-2 pt-1">
                                            {promo.normalPrice > 0 && <span className="text-slate-500 line-through">${promo.normalPrice.toLocaleString('es-CL')}</span>}
                                            {promo.promoPrice > 0 && <span className="text-2xl font-bold text-[#f06c44]">${promo.promoPrice.toLocaleString('es-CL')}</span>}
                                        </div>
                                        {savings > 0 && (
                                            <div className="text-xs font-bold bg-green-500/20 text-green-300 py-1 px-2 rounded-full inline-block">
                                                Ahorras ${savings.toLocaleString('es-CL')} ({savingsPercent}%)
                                            </div>
                                        )}
                                        {showSmartButton && (
                                             <button type="button" className="!mt-4 w-full bg-[#f06c44] text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center text-sm">
                                                <WhatsAppIcon />
                                                {smartButtonText}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </FormBlock>
            )}

            <ServiceAttributesChecklist 
                category={formData.category} 
                selectedAttributes={formData.serviceAttributes || []} 
                onChange={handleAttributeChange} 
            />

            <FormBlock title="Gestión de Promociones y Ofertas (Editor)">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {(formData.promotions || []).map((promo: Promotion, index: number) => {
                        // 1. CÁLCULO DE LÓGICA EN TIEMPO REAL
                        const hasDelivery = formData.serviceAttributes?.includes('Delivery');
                        const isAlojamiento = formData.category === Category.ALOJAMIENTO;
                        const isRestaurante = formData.category === Category.RESTAURANTE;

                        let btnText = "Ver Oferta"; // Default
                        let showBtn = true;

                        if (hasDelivery) {
                            btnText = "Pedir Delivery";
                        } else if (isAlojamiento) {
                            btnText = "Consultar Disponibilidad";
                        } else if (isRestaurante) {
                            showBtn = false; // Instrucción: Ocultar en Restaurante si no hay Delivery
                        }

                        return (
                          <div key={promo.id} className="flex flex-col bg-slate-900 p-5 rounded-xl border border-slate-700 space-y-4 shadow-2xl min-h-fit">
                            <ImageUpload label={`Imagen Promo ${index + 1} (1:1)`} />
                            
                            <input 
                              placeholder="Título de la Promoción" 
                              className="w-full bg-slate-800 p-3 rounded-lg text-white text-sm" 
                              value={promo.title} 
                              onChange={(e) => handlePromotionChange(index, 'title', e.target.value)}
                            />
                            
                            <div className="pt-2 border-t border-slate-800 flex items-center justify-end">
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-slate-400 font-bold">PROMO ACTIVA</span>
                                    <ToggleSwitch checked={promo.isActive} onChange={() => handlePromotionChange(index, 'isActive', !promo.isActive)} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                              <div className="flex flex-col">
                                <label className="text-[9px] text-slate-500 uppercase ml-1">Antes</label>
                                <input 
                                  type="number" 
                                  placeholder="$"
                                  className="bg-slate-800 p-2 rounded text-slate-400 text-sm line-through" 
                                  value={promo.normalPrice || ''} 
                                  onChange={(e) => handlePromotionChange(index, 'normalPrice', parseInt(e.target.value, 10) || 0)} 
                                />
                              </div>
                              <div className="flex flex-col">
                                <label className="text-[9px] text-[#f06c44] uppercase ml-1 font-bold">Oferta</label>
                                <input 
                                  type="number" 
                                  placeholder="$"
                                  className="bg-slate-800 p-2 rounded text-[#f06c44] font-bold text-sm border border-orange-900/30" 
                                  value={promo.promoPrice || ''} 
                                  onChange={(e) => handlePromotionChange(index, 'promoPrice', parseInt(e.target.value, 10) || 0)}
                                />
                              </div>
                            </div>

                            {/* BOTÓN INTELIGENTE PREVISUALIZADO */}
                            {showBtn && (
                              <div className="pt-2">
                                <div className="w-full bg-[#f06c44] text-white text-[11px] font-bold py-2.5 rounded-lg flex items-center justify-center space-x-2 shadow-lg shadow-orange-900/20">
                                  <WhatsAppIcon />
                                  <span>{btnText}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                </div>
            </FormBlock>

            <FormBlock title="Gestor de Medios (Hero y Galería)">
                <LockedFeatureBlock 
                    isLocked={!selectedPlan?.permissions.proGallery}
                    lockReason="Galería Pro disponible en planes Premium y superiores"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ImageUpload label="Hero Image" />
                        <div className="grid grid-cols-2 gap-3">
                            <ImageUpload label="G1" /> <ImageUpload label="G2" />
                            <ImageUpload label="G3" /> <ImageUpload label="G4" />
                        </div>
                    </div>
                </LockedFeatureBlock>
            </FormBlock>

            <FormBlock title="Integraciones Tech">
                <LockedFeatureBlock
                    isLocked={!selectedPlan?.permissions.posSync}
                    lockReason="Sincronización POS disponible en Plan Pro"
                >
                     <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <h4 className="font-bold text-white">Sincronización con Puntos de Venta (POS)</h4>
                        <p className="text-sm text-slate-400 mt-1">Conecta tu sistema de ventas para una gestión automática.</p>
                        <button className="mt-4 bg-slate-600 text-white font-bold py-2 px-4 rounded-lg text-sm">Configurar</button>
                    </div>
                </LockedFeatureBlock>
            </FormBlock>

            <div className="sticky bottom-6 flex justify-end space-x-4 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-700 shadow-2xl z-50">
                <button type="button" onClick={onCancel} className="px-10 py-4 bg-slate-700 text-white rounded-xl font-black">CANCELAR</button>
                <button type="submit" className="px-10 py-4 bg-[#f06c44] text-white rounded-xl font-black">GUARDAR CAMBIOS</button>
            </div>
        </form>
    );
};

export default BusinessForm;