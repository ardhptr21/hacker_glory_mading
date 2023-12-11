import clsx from 'clsx';

export default function Th({ children, className }) {
  return (
    <th className={clsx(['pb-3 text-left', { [className]: className }])}>
      {children}
    </th>
  );
}
