import clsx from 'clsx';

const variants = {
  default: 'bg-black text-white border-transparent',
  outline: 'border-black hover:bg-black hover:text-white',
};

export default function Button({
  children,
  variant = 'default',
  className,
  as,
  ...props
}) {
  const Component = as || 'button';

  return (
    <Component
      className={clsx([
        'flex justify-center items-center py-3 px-5 rounded-lg min-w-[120px] border-2 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        { [className]: !!className },
      ])}
      {...props}
    >
      {children}
    </Component>
  );
}
