import clsx from 'clsx';

export default function Input({
  type = 'text',
  label,
  isError,
  error,
  ...props
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor="email" className="text-sm">
          {label}
        </label>
      )}
      <input
        type={type}
        className={clsx([
          'w-full px-5 py-3 border-l-2 border-transparent rounded-lg outline-none focus:border-black placeholder:text-sm disabled:cursor-not-allowed disabled:bg-white/60',
          {
            'text-red-500 placeholder:text-red-500 border-red-500 bg-red-200/30 focus:border-red-500':
              isError,
          },
        ])}
        {...props}
      />
      {isError && <small className="text-red-500">{error}</small>}
    </div>
  );
}
