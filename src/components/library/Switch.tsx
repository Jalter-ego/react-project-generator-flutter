import { useState } from 'react';

export function SwitchComponent({ checked = false, onChange }: {
    checked?: boolean; onChange?: (checked: boolean) => void;
}) {
    const [isChecked, setIsChecked] = useState(checked);

    const handleToggle = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        onChange?.(newChecked);
    };

    return (
        <div
            className="inline-flex items-center cursor-pointer"
            onClick={handleToggle}
             defaultChecked={checked}
            role="checkbox"
            aria-checked={isChecked}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToggle();
                }
            }}
        >
            <div className={`w-11 h-6 rounded-full relative transition-colors ${isChecked ? 'bg-blue-600' : 'bg-gray-300'}`}            >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isChecked ? 'translate-x-5' : ''}`} />
            </div>
        </div>
    );
}