import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
  const { user } = usePage().props;

  return (
    <header className="fixed w-full p-5 bg-white shadow">
      <nav className="container flex items-center justify-between">
        <div>
          <Link href="/" className="">
            <span className="text-xl font-bold">Hacker Glory</span>{' '}
            <sup className="text-sm italic">Mading</sup>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-5">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          {user ? (
            <>
              <Link href={route('dashboard.index')} className="hover:underline">
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link href={route('auth.login')} className="hover:underline">
                Masuk
              </Link>
              <Link href={route('auth.register')} className="hover:underline">
                Daftar
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
