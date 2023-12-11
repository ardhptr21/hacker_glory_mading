import { Link } from '@inertiajs/react';
import { Article, Gauge, Users } from '@phosphor-icons/react';
import clsx from 'clsx';

export default function DashboardLayout({ children }) {
  const routes = [
    {
      label: 'Dashboard',
      icon: Gauge,
      route: route('dashboard.index'),
      active: route().current('dashboard.index'),
    },
    {
      label: 'Majalah',
      icon: Article,
    },
    {
      label: 'Users',
      icon: Users,
    },
  ];

  return (
    <div className="flex">
      <aside className="h-screen p-10 space-y-3 bg-white w-80">
        {routes.map((r) => (
          <Link
            key={r.label}
            className={clsx(
              [
                'flex items-center gap-2 px-5 py-3 rounded-lg transition duration-300',
              ],
              {
                'text-white bg-black': r.active,
                'hover:bg-gray-200': !r.active,
              }
            )}
            href={r.route}
          >
            <r.icon size={24} />
            {r.label}
          </Link>
        ))}
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
