import { Check } from '@phosphor-icons/react';

export default function Checkbox({ label, id, ...props }) {
  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        className="relative w-4 h-4 bg-white border-2 border-black rounded-sm appearance-none peer shrink-0 checked:bg-black checked:border-0"
        {...props}
      />
      <label htmlFor={id} className="text-sm select-none">
        {label}
      </label>
      <Check
        className="absolute hidden w-4 h-4 text-white pointer-events-none peer-checked:block"
        weight="bold"
      />
    </div>
  );
}
