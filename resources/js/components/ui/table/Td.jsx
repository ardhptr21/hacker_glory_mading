import clsx from 'clsx';

export default function Td({ children, className }) {
  return (
    <td className={clsx(['py-3 pr-0', { [className]: className }])}>
      {children}
    </td>
  );
}
