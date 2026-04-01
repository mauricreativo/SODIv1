
import React from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color?: 'blue' | 'orange';
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'text-[#2c6b8f]',
    orange: 'text-[#f06c44]',
  };
  
  const bgColorClasses = {
    blue: 'bg-[#2c6b8f]/10',
    orange: 'bg-[#f06c44]/10',
  };

  return (
    <div className="bg-slate-800 p-5 rounded-lg shadow-lg flex items-center space-x-4">
      <div className={`p-3 rounded-full ${bgColorClasses[color]}`}>
        <div className={colorClasses[color]}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
};

export default KpiCard;
