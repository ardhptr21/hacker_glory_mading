import clsx from 'clsx';

export default function Badge({ text, className, ...props }) {
  return (
    <div
      className={clsx([
        'px-4 py-2 text-sm uppercase bg-white border border-black rounded-full',
        { [className]: className },
      ])}
      {...props}
    >
      {text}
    </div>
  );
}
