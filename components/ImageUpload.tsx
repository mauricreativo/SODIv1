
import React from 'react';

interface ImageUploadProps {
    label: string;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);


const ImageUpload: React.FC<ImageUploadProps> = ({ label }) => {
    return (
        <div>
            <div className="w-full h-full bg-slate-700/50 border-2 border-dashed border-slate-600 rounded-lg flex flex-col justify-center items-center p-6 text-center cursor-pointer hover:border-[#2c6b8f] transition-colors">
                <UploadIcon />
                <p className="mt-2 text-sm text-slate-400">{label}</p>
                <p className="text-xs text-slate-500">PNG, JPG, GIF hasta 10MB</p>
            </div>
        </div>
    );
};

export default ImageUpload;
