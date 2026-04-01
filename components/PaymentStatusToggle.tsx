
import React from 'react';
import { PaymentStatus } from '../types';

interface PaymentStatusToggleProps {
    status: PaymentStatus;
    onChange: (newStatus: PaymentStatus) => void;
}

const PaymentStatusToggle: React.FC<PaymentStatusToggleProps> = ({ status, onChange }) => {
    const isPaid = status === PaymentStatus.AL_DIA;

    const toggleStatus = () => {
        onChange(isPaid ? PaymentStatus.PENDIENTE : PaymentStatus.AL_DIA);
    };

    return (
        <div
            onClick={toggleStatus}
            className={`w-full relative flex items-center h-10 px-2 rounded-md cursor-pointer transition-colors duration-300 ${
                isPaid ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
            }`}
        >
            <div
                className={`absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] rounded-md transition-all duration-300 ease-in-out ${
                    isPaid ? 'bg-green-500 translate-x-0' : 'bg-red-500 translate-x-[calc(100%+4px)]'
                }`}
            ></div>
            <div className="w-1/2 text-center z-10 font-semibold">{PaymentStatus.AL_DIA}</div>
            <div className="w-1/2 text-center z-10 font-semibold">{PaymentStatus.PENDIENTE}</div>
        </div>
    );
};

export default PaymentStatusToggle;
