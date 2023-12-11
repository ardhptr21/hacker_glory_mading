import Button from '@/components/ui/Button';
import Input from '@/components/ui/form/Input';
import { Link, useForm, usePage } from '@inertiajs/react';
import Alert from '../../components/ui/Alert';

export default function Login() {
  const { flash } = usePage().props;
  const { data, setData, errors, processing, post } = useForm({
    login: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('auth.login'));
  };

  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <div className="w-full max-w-lg p-16 space-y-16 bg-white rounded-xl">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-sm">
            Selamat datang, silahkan masuk untuk melanjutkan.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <Input
              placeholder="Masukkan email/username/nis/nip"
              value={data.login}
              onChange={(e) => setData('login', e.target.value)}
              isError={!!errors.login}
              error={errors.login}
              disabled={processing}
              required
            />
            <Input
              type="password"
              placeholder="Masukkan password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              isError={!!errors.password}
              error={errors.password}
              disabled={processing}
              required
            />
            {flash.error && (
              <Alert variant="error" title="Gagal" message={flash.error} />
            )}
            {flash.success && (
              <Alert
                variant="success"
                title="Berhasil"
                message={flash.success}
              />
            )}
          </div>
          <div className="flex items-center justify-center gap-2 mt-16">
            <Button
              as={Link}
              href={route('auth.register')}
              className="w-full"
              variant="outline"
            >
              Daftar
            </Button>
            <Button type="submit" className="w-full" disabled={processing}>
              Masuk
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
