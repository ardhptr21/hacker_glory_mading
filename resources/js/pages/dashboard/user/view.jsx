import DashboardLayout from '@/components/layouts/DashboardLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/form/Input';
import Select from '@/components/ui/form/Select';
import { Link, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function ViewUserDashboard({ user }) {
  const { data, setData, errors, processing, put } = useForm({
    name: user.name,
    email: user.email,
    username: user.username,
    nis: user.nis || '',
    nip: user.nip || '',
    password: user.password,
    role: user.role,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('dashboard.user.update', user.username), {
      onSuccess: () => toast.success('User berhasil diupdate.'),
      onError: () => toast.error('User gagal diupdate.'),
    });
  };

  return (
    <DashboardLayout>
      <section>
        <h1 className="text-xl font-bold">Edit User Dashboard</h1>
      </section>
      <section className="flex flex-col items-start justify-center w-full max-w-xl gap-10 mx-auto mt-10">
        <div className="flex flex-col items-center justify-center w-full gap-2 p-10 bg-white rounded-lg shadow">
          <div className="text-center">
            <h3 className="text-xl font-bold">{user.name}</h3>
            <span className="text-sm text-gray-400">
              @{user.username} • {user.role}
            </span>
          </div>
          <div className="text-center">
            <p>{user.email}</p>
            {user.role !== 'admin' && <p>{user.nis || user.nip}</p>}
          </div>
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit} className="flex-1 space-y-3">
            <Select
              label="Role"
              placeholder="Pilih role"
              value={data.role}
              onChange={(e) => setData('role', e.target.value)}
              error={errors.role}
              isError={!!errors.role}
              disabled={processing}
              required
            >
              <option value="admin">Admin</option>
              <option value="guru">Guru</option>
              <option value="pengurus">Pengurus</option>
              <option value="siswa">Siswa</option>
            </Select>
            <Input
              label="Nama"
              placeholder="Masukkan nama user"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              error={errors.name}
              isError={!!errors.name}
              disabled={processing}
              required
            />
            <Input
              type="email"
              label="Email"
              placeholder="Masukkan email user"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              error={errors.email}
              isError={!!errors.email}
              disabled={processing}
              required
            />
            <Input
              label="Username"
              placeholder="Masukkan username user"
              value={data.username}
              onChange={(e) => setData('username', e.target.value)}
              error={errors.username}
              isError={!!errors.username}
              disabled={processing}
              required
            />
            {(data.role === 'siswa' || data.role === 'pengurus') && (
              <Input
                label="NIS"
                placeholder="Masukkan nis user"
                value={data.nis}
                onChange={(e) => setData('nis', e.target.value)}
                error={errors.nis}
                isError={!!errors.nis}
                disabled={processing}
                maxLength={10}
                pattern="[0-9]{10}"
                required
              />
            )}
            {data.role === 'guru' && (
              <Input
                label="NIP"
                placeholder="Masukkan nip user"
                value={data.nip}
                onChange={(e) => setData('nip', e.target.value)}
                error={errors.nip}
                isError={!!errors.nip}
                disabled={processing}
                maxLength={18}
                pattern="[0-9]{18}"
                required
              />
            )}
            <Input
              type="password"
              label="Password"
              placeholder="Masukkan password user"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              error={errors.password}
              isError={!!errors.password}
              disabled={processing}
            />

            <div className="flex justify-end gap-2">
              <Button
                as={Link}
                href={route('dashboard.user.index')}
                variant="outline"
              >
                Batal
              </Button>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </div>
      </section>
    </DashboardLayout>
  );
}
