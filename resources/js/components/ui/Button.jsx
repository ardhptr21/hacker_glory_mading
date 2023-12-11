import clsx from 'clsx';

const variants = {
  default: 'bg-black text-white border-transparent',
  outline: 'border-black hover:bg-black hover:text-white',
};

const sizes = {
  normal: 'py-3 px-5 min-w-[120px]',
  box: 'p-3',
};

export default function Button({
  children,
  variant = 'default',
  size = 'normal',
  className,
  as,
  ...props
}) {
  const Component = as || 'button';

  return (
    <Component
      className={clsx([
        'flex justify-center items-center gap-2 rounded-lg border-2 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60',
        sizes[size],
        variants[variant],
        { [className]: !!className },
      ])}
      {...props}
    >
      {children}
    </Component>
  );
}
