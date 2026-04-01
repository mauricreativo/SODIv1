
import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, disabled = false }) => {
  return (
    <label htmlFor={`toggle-${Math.random()}`} className={`flex items-center justify-center ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
      <div className="relative">
        <input
          type="checkbox"
          id={`toggle-${Math.random()}`}
          className="sr-only"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <div className={`block w-14 h-8 rounded-full transition ${checked ? 'bg-[#2c6b8f]' : 'bg-slate-600'}`}></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform transform ${
            checked ? 'translate-x-6' : 'translate-x-0'
          }`}
        ></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;