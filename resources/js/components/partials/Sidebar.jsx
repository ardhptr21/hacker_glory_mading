import { Link, usePage } from '@inertiajs/react';
import { Article, Gauge, Hash, Users } from '@phosphor-icons/react';
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
    <aside className="h-screen p-10 space-y-3 bg-white w-80">
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
    </aside>
  );
}
