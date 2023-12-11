import Button from '@/components/ui/Button';
import Input from '@/components/ui/form/Input';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function Register() {
  const { flash } = usePage().props;
  const { data, setData, post, errors, processing } = useForm({
    name: '',
    email: '',
    username: '',
    nis: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('auth.register'));
  };

  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <div className="w-full max-w-lg p-16 space-y-16 bg-white rounded-xl">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">Daftar</h1>
          <p className="text-sm">Silahkan daftar untuk membuat akun baru.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <Input
              placeholder="Masukkan Nama"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              disabled={processing}
              error={errors.name}
              isError={!!errors.name}
              required
            />
            <Input
              type="email"
              placeholder="Masukkan Email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              disabled={processing}
              error={errors.email}
              isError={!!errors.email}
              required
            />
            <Input
              placeholder="Masukkan Username"
              value={data.username}
              onChange={(e) => setData('username', e.target.value)}
              disabled={processing}
              error={errors.username}
              isError={!!errors.username}
              required
            />
            <Input
              type="nis"
              placeholder="Masukkan NIS"
              value={data.nis}
              onChange={(e) => setData('nis', e.target.value)}
              disabled={processing}
              error={errors.nis}
              isError={!!errors.nis}
              maxLength={10}
              pattern="[0-9]{10}"
              required
            />
            <Input
              type="password"
              placeholder="Masukkan Password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              disabled={processing}
              error={errors.password}
              isError={!!errors.password}
              minLength={8}
              required
            />
            {flash.error && (
              <Alert variant="error" title="Gagal" message={flash.error} />
            )}
          </div>
          <div className="flex items-center justify-center gap-2 mt-16">
            <Button
              as={Link}
              href={route('auth.login')}
              className="w-full"
              variant="outline"
            >
              Masuk
            </Button>
            <Button type="submit" className="w-full" disabled={processing}>
              Daftar
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
