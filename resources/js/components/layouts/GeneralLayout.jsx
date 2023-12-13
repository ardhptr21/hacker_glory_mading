import { usePage } from '@inertiajs/react';
import Navbar from '../partials/Navbar';
import clsx from 'clsx';
import { Toaster } from 'react-hot-toast';

export default function GeneralLayout({ children, className }) {
  usePage;

  return (
    <>
      <Navbar />
      <main
        className={clsx([
          'container min-h-screen pb-10',
          { [className]: className },
        ])}
      >
        {children}
      </main>
      <Toaster />
    </>
  );
}
