import { Link, usePage } from '@inertiajs/react';
import {
  Article,
  Gauge,
  Hash,
  SignOut,
  Tray,
  Users,
} from '@phosphor-icons/react';
import clsx from 'clsx';

export default function Sidebar() {
  const { user } = usePage().props;

  const routes = [
    {
      label: 'Dashboard',
      icon: Gauge,
      route: route('dashboard.index'),
      active: route().current('dashboard.index'),
      show: true,
    },
    {
      label: 'Mading',
      icon: Article,
      route: route('dashboard.mading.index'),
      active: route().current('dashboard.mading.index'),
      show: user?.role !== 'siswa',
    },
    {
      label: 'Request',
      icon: Tray,
      route: route('dashboard.mading.request'),
      active: route().current('dashboard.mading.request'),
      show: user?.role === 'admin',
    },
    {
      label: 'Category',
      icon: Hash,
      route: route('dashboard.category.index'),
      active: route().current('dashboard.category.index'),
      show: user?.role !== 'siswa',
    },
    {
      label: 'Users',
      icon: Users,
      route: route('dashboard.user.index'),
      active: route().current('dashboard.user.index'),
      show: user?.role === 'admin',
    },
  ];

  return (
    <aside className="h-screen p-10 bg-white w-80 flex flex-col justify-between">
      <div className="space-y-3">
        {routes
          .filter((v) => v.show)
          .map((r) => (
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
      </div>
      <div>
        <Link
          href={route('auth.logout')}
          className="flex items-center gap-2 px-5 py-3 rounded-lg transition duration-300 hover:bg-red-100 border text-red-500 border-red-500"
        >
          <SignOut size={24} />
          Logout
        </Link>
      </div>
    </aside>
  );
}
