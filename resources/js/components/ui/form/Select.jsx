import clsx from 'clsx';

export default function Select({
  children,
  label,
  isError,
  error,
  className,
  placeholder,
  ...props
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor="email" className="text-sm">
          {label}
        </label>
      )}
      <select
        className={clsx([
          'w-full px-5 py-3 border rounded-lg outline-none border-black placeholder:text-sm disabled:cursor-not-allowed disabled:bg-gray-100/60 focus:ring-2 ring-black/40',
          {
            'text-red-500 placeholder:text-red-500 border-red-500 bg-red-200/30 focus:border-red-500':
              isError,
            [className]: className,
          },
        ])}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      {isError && <small className="text-red-500">{error}</small>}
    </div>
  );
}
