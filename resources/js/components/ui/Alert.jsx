import clsx from 'clsx';

const variants = {
  error: 'bg-red-100 text-red-700 border-red-700',
  success: 'bg-green-100 text-green-700 border-green-700',
};

export default function Alert({ variant, title, message }) {
  return (
    <div
      className={clsx([
        'px-6 py-4 rounded-lg space-y-2 border-2',
        variants[variant],
      ])}
    >
      <p className="font-bold">{title}</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}
