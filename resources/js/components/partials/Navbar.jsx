import { Link, usePage } from '@inertiajs/react';
import {
  Article,
  BookmarkSimple,
  Gauge,
  House,
  SignIn,
  SignOut,
  User,
  UserPlus,
} from '@phosphor-icons/react';
import clsx from 'clsx';

export default function Navbar() {
  const { user } = usePage().props;

  const routes = [
    {
      label: 'Home',
      icon: House,
      route: route('page.home'),
      active: route().current('page.home'),
      show: true,
    },
    {
      label: 'Mading',
      icon: Article,
      route: route('mading.index'),
      active: route().current('mading.index'),
      show: true,
    },
    {
      label: 'Bookmark',
      icon: BookmarkSimple,
      route: route('bookmark.index'),
      active: route().current('bookmark.index'),
      show: !!user && user?.role === 'siswa',
    },
    {
      label: 'Profil',
      icon: User,
      route: route('profile.index'),
      active: route().current('profile.index'),
      show: !!user,
    },
    {
      label: 'Dashboard',
      icon: Gauge,
      route: route('dashboard.index'),
      active: route().current('dashboard.index'),
      show: !!user && user?.role !== 'siswa',
    },
    {
      label: 'Daftar',
      icon: UserPlus,
      route: route('auth.register'),
      active: route().current('auth.register'),
      show: !user,
    },
    {
      label: 'Masuk',
      icon: SignIn,
      route: route('auth.login'),
      active: route().current('auth.login'),
      show: !user,
    },
  ];

  return (
    <header className="fixed z-50 w-full p-5 bg-white shadow">
      <nav className="container flex items-center justify-between">
        <div>
          <Link href="/" className="">
            <span className="text-xl font-bold tracking-wide font-titan">
              Hacker Glory
            </span>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-5">
          {routes
            .filter((v) => v.show)
            .map((r) => (
              <Link
                key={r.label}
                href={r.route}
                className={clsx([
                  'inline-flex items-center gap-2 px-3 py-1 rounded-lg group',
                  {
                    'text-white bg-black': r.active,
                    'hover:bg-gray-200': !r.active,
                  },
                ])}
              >
                <r.icon size={20} className="" />
                {r.label}
              </Link>
            ))}
          {!!user && (
            <Link
              href={route('auth.logout')}
              className="inline-flex items-center gap-2 px-3 py-1 text-red-500 rounded-lg group hover:bg-red-100"
            >
              <SignOut size={20} />
              Logout
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
