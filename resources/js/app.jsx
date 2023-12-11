import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./pages/**/*.jsx', { eager: true });
    const page = pages[`./pages/${name}.jsx`];
    return page;
  },
  setup: ({ el, App, props }) => {
    createRoot(el).render(<App {...props} />);
  },
});
