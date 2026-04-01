
import React from 'react';
import { initialAttributes } from '../constants';
import type { Attribute } from '../types';

const AttributeManagerView: React.FC = () => {
    return (
        <>
            <header>
                <h1 className="text-3xl font-bold text-white">Gestor de Atributos</h1>
                <p className="text-slate-400 mt-1">Crea y asigna atributos a las categorías de negocio.</p>
            </header>

            <section className="mt-8 bg-slate-800 rounded-lg shadow-lg p-6">
                 <div className="flex justify-end mb-6">
                    <button className="bg-[#f06c44] text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        <span>Crear Atributo</span>
                    </button>
                </div>
                 <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-slate-300">
                        <thead className="text-xs text-slate-400 uppercase bg-slate-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Nombre del Atributo</th>
                                <th scope="col" className="px-6 py-3">Categoría(s) Asignada(s)</th>
                                <th scope="col" className="px-6 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {initialAttributes.map((attribute: Attribute) => (
                                <tr key={attribute.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                    <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                        {attribute.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {attribute.categories.map(cat => (
                                                <span key={cat} className="px-2 py-1 rounded-full text-xs font-semibold bg-[#2c6b8f]/50 text-[#6fa8dc]">
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="font-medium text-[#2c6b8f] hover:underline">
                                            Editar
                                        </button>
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

export default AttributeManagerView;
