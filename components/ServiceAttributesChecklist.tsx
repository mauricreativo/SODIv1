import React from 'react';
import { Category } from '../types';
import { initialAttributes } from '../constants';

interface ServiceAttributesChecklistProps {
  category: Category;
  selectedAttributes: string[];
  onChange: (attributeName: string, isChecked: boolean) => void;
}

const ServiceAttributesChecklist: React.FC<ServiceAttributesChecklistProps> = ({ 
  category, 
  selectedAttributes, 
  onChange 
}) => {
  const availableAttributes = initialAttributes.filter(attr => 
    attr.categories.includes(category)
  );

  return (
    /* Forzamos que este bloque sea una sección independiente con margen */
    <section className="w-full block relative bg-slate-800/50 p-6 rounded-lg border border-slate-700 mt-10">
      <h3 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mb-6">
        Asignación de Atributos Dinámicos
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {availableAttributes.map((attr) => (
          <label key={attr.id} className="flex items-center space-x-3 bg-slate-700/50 p-3 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors">
            <input
              type="checkbox"
              checked={selectedAttributes.includes(attr.name)}
              onChange={(e) => onChange(attr.name, e.target.checked)}
              className="h-5 w-5 rounded bg-slate-600 border-slate-500 text-[#2c6b8f] focus:ring-0"
            />
            <span className="text-white font-medium text-sm">{attr.name}</span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default ServiceAttributesChecklist;