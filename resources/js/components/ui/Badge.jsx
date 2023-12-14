import clsx from 'clsx';

export default function Badge({ text, className, ...props }) {
  return (
    <div
      className={clsx([
        'px-3 py-1 text-sm uppercase bg-white border border-black rounded-full',
        { [className]: className },
      ])}
      {...props}
    >
      {text}
    </div>
  );
}
