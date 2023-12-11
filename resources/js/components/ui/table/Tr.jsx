import clsx from 'clsx';

export default function Tr({ children, className }) {
  return (
    <tr
      className={clsx([
        'border-b border-dashed last:border-b-0',
        { [className]: className },
      ])}
    >
      {children}
    </tr>
  );
}
