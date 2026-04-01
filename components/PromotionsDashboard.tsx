
import React, { useState, useMemo } from 'react';
import { initialBusinesses } from '../constants';
import { Category, Sector } from '../types';
import type { Promotion } from '../types';
import ToggleSwitch from './ToggleSwitch';

const ImageIcon = () => (
    <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
);

const StarIcon = ({ isFeatured }: { isFeatured: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" 
        className={`transition-colors ${isFeatured ? 'text-yellow-400' : 'text-slate-600 hover:text-yellow-500'}`} />
    </svg>
);

interface FlatPromotion extends Promotion {
    businessName: string;
    businessCategory: Category;
    businessSector: Sector;
}

const PromotionsDashboard: React.FC = () => {
    const flattenedPromos = useMemo(() => {
        return initialBusinesses.flatMap(business => 
            (business.promotions || [])
            .filter(promo => promo.title)
            .map((promo) => ({
                ...promo,
                businessName: business.name,
                businessCategory: business.category,
                businessSector: business.sector,
            }))
        );
    }, []);

    const [promotions, setPromotions] = useState<FlatPromotion[]>(flattenedPromos);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterSector, setFilterSector] = useState('');

    const handleToggle = (promoId: string, field: 'isActive' | 'isFeatured') => {
        setPromotions(currentPromos => 
            currentPromos.map(p => 
                p.id === promoId ? { ...p, [field]: !p[field] } : p
            )
        );
    };

    const filteredPromotions = promotions.filter(promo => {
        const matchesSearch = promo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              promo.businessName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === '' || promo.businessCategory === filterCategory;
        const matchesSector = filterSector === '' || promo.businessSector === filterSector;
        return matchesSearch && matchesCategory && matchesSector;
    });

    const activePromosCount = useMemo(() => promotions.filter(p => p.isActive).length, [promotions]);
    const featuredPromosCount = useMemo(() => promotions.filter(p => p.isFeatured).length, [promotions]);

    const FilterSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
         <select {...props} className="bg-slate-700 border border-slate-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#2c6b8f] w-full sm:w-auto" />
    );
    
    const Counter: React.FC<{ label: string; value: number; color: string; }> = ({ label, value, color }) => (
        <div className="flex items-center space-x-2">
            <span className={`text-2xl font-bold ${color}`}>{value}</span>
            <span className="text-sm text-slate-400">{label}</span>
        </div>
    );

    return (
        <>
            <header className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-white">Central de Marketing</h1>
                    <p className="text-slate-400 mt-1">Gestiona todas las ofertas de la plataforma de forma masiva.</p>
                </div>
                <div className="flex space-x-6">
                    <Counter label="Promos Activas" value={activePromosCount} color="text-green-400" />
                    <Counter label="Promos en Portada" value={featuredPromosCount} color="text-yellow-400" />
                </div>
            </header>

            <section className="mt-8 bg-slate-800 rounded-lg shadow-lg p-6">
                 <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                     <div className="flex flex-col sm:flex-row gap-2 w-full">
                        <input 
                            type="text"
                            placeholder="Buscar promo o negocio..."
                            className="bg-slate-700 border border-slate-600 rounded-md p-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2c6b8f] w-full sm:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                         <FilterSelect value={filterSector} onChange={(e) => setFilterSector(e.target.value)}>
                            <option value="">Todos los Sectores</option>
                            {Object.values(Sector).map(c => <option key={c} value={c}>{c}</option>)}
                        </FilterSelect>
                        <FilterSelect value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                            <option value="">Todas las Categorías</option>
                            {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                        </FilterSelect>
                     </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-slate-300">
                        <thead className="text-xs text-slate-100 uppercase bg-[#2c6b8f]">
                            <tr>
                                <th scope="col" className="px-6 py-3">Negocio</th>
                                <th scope="col" className="px-6 py-3">Miniatura</th>
                                <th scope="col" className="px-6 py-3">Oferta</th>
                                <th scope="col" className="px-6 py-3 text-center">Portada</th>
                                <th scope="col" className="px-6 py-3 text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPromotions.map((promo) => (
                                <tr key={promo.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50 transition-colors duration-150">
                                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                        {promo.businessName}
                                        <div className="text-xs text-slate-400">📍 {promo.businessSector}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="w-12 h-12 bg-slate-700 rounded-md flex items-center justify-center aspect-square">
                                            <ImageIcon />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-white">{promo.title}</div>
                                        <div className="flex items-baseline gap-2 mt-1">
                                            {promo.normalPrice > 0 && <span className="line-through text-slate-500">${promo.normalPrice.toLocaleString('es-CL')}</span>}
                                            {promo.promoPrice > 0 && <span className="font-bold text-lg text-[#f06c44]">${promo.promoPrice.toLocaleString('es-CL')}</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button onClick={() => handleToggle(promo.id, 'isFeatured')} className="p-2 rounded-full hover:bg-yellow-400/10">
                                             <StarIcon isFeatured={!!promo.isFeatured} />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <ToggleSwitch checked={promo.isActive} onChange={() => handleToggle(promo.id, 'isActive')} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

export default PromotionsDashboard;