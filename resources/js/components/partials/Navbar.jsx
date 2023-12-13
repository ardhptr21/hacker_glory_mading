import { Link, usePage } from '@inertiajs/react';
import { Gauge, House, SignIn, UserPlus } from '@phosphor-icons/react';

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
      label: 'Dashboard',
      icon: Gauge,
      route: route('dashboard.index'),
      active: route().current('dashboard.index'),
      show: user?.role !== 'siswa',
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
    <header className="fixed w-full p-5 bg-white shadow">
      <nav className="container flex items-center justify-between">
        <div>
          <Link href="/" className="">
            <span className="text-xl font-bold">Hacker Glory</span>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-5">
          {routes
            .filter((v) => v.show)
            .map((r) => (
              <Link
                key={r.label}
                href={r.route}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg group hover:bg-gray-200"
              >
                <r.icon size={20} className="" />
                {r.label}
              </Link>
            ))}
        </div>
      </nav>
    </header>
  );
}
