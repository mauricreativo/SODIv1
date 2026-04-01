
import React from 'react';
import type { DaySchedule } from '../types';

interface BusinessHoursEditorProps {
    hours: DaySchedule[];
    onChange: (dayIndex: number, field: keyof DaySchedule, value: string | boolean) => void;
}

const BusinessHoursEditor: React.FC<BusinessHoursEditorProps> = ({ hours, onChange }) => {
    return (
        <div className="space-y-3">
            {hours.map((schedule, index) => (
                <div key={schedule.day} className="grid grid-cols-1 md:grid-cols-4 items-center gap-x-4 gap-y-2 p-3 bg-slate-700/50 rounded-lg">
                    <div className="font-semibold text-white md:col-span-1">{schedule.day}</div>
                    <div className="flex items-center gap-2 md:col-span-2">
                        <input
                            type="time"
                            value={schedule.opens}
                            onChange={(e) => onChange(index, 'opens', e.target.value)}
                            disabled={schedule.closed}
                            className="w-full bg-slate-600 border border-slate-500 rounded-md p-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2c6b8f] disabled:opacity-50"
                        />
                        <span className="text-slate-400">-</span>
                        <input
                            type="time"
                            value={schedule.closes}
                            onChange={(e) => onChange(index, 'closes', e.target.value)}
                            disabled={schedule.closed}
                            className="w-full bg-slate-600 border border-slate-500 rounded-md p-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2c6b8f] disabled:opacity-50"
                        />
                    </div>
                    <div className="flex items-center justify-start md:justify-end space-x-3 md:col-span-1">
                         <label htmlFor={`closed-${schedule.day}`} className="text-sm text-slate-300 font-medium">Cerrado</label>
                         <input
                            type="checkbox"
                            id={`closed-${schedule.day}`}
                            checked={schedule.closed}
                            onChange={() => onChange(index, 'closed', !schedule.closed)}
                            className="h-5 w-5 rounded bg-slate-600 border-slate-500 text-[#2c6b8f] focus:ring-2 focus:ring-offset-0 focus:ring-offset-slate-800 focus:ring-[#2c6b8f]"
                         />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BusinessHoursEditor;
