import GeneralLayout from '@/components/layouts/GeneralLayout';
import PhotoProfile from '@/components/partials/PhotoProfile';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/form/Input';
import { useForm } from '@inertiajs/react';
import { UserCircleGear } from '@phosphor-icons/react';
import { Password } from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function Profile({ user }) {
  const { data, setData, processing, errors, put } = useForm({
    name: user.name,
    email: user.email,
    username: user.username,
    nis: user.nis || '',
    bio: user.bio,
  });
  const {
    data: data_cp,
    setData: setDataCP,
    processing: processing_cp,
    errors: errors_cp,
    patch,
    reset,
  } = useForm({
    old_password: '',
    password: '',
  });

  const [state, setState] = useState('edit-profile');

  const states = [
    {
      label: 'Edit Profil',
      icon: UserCircleGear,
      active: state === 'edit-profile',
      handle: () => setState('edit-profile'),
    },
    {
      label: 'Ganti Password',
      icon: Password,
      active: state === 'change-password',
      handle: () => setState('change-password'),
    },
  ];

  const handleEditProfile = (e) => {
    e.preventDefault();
    put(route('profile.update'), {
      onSuccess: () => {
        setState('edit-profile');
        toast.success('Berhasil mengubah profil.');
      },
      onError: () => toast.error('Gagal mengubah profil.'),
    });
  };

  const handleChangePassword = (e) => [
    e.preventDefault(),
    patch(route('profile.change_password'), {
      onSuccess: () => {
        setState('edit-profile');
        reset();
        toast.success('Berhasil mengubah password.');
      },
      onError: () => {
        reset();
        toast.error('Gagal mengubah password.');
      },
    }),
  ];

  return (
    <GeneralLayout className="pt-36">
      <section>
        <div className="flex flex-col items-center justify-center w-full gap-10 px-10 py-20 bg-white shadow rounded-xl">
          <PhotoProfile name={user.name} />
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="font-semibold">
              @{user.username} • {user.role}{' '}
              {user?.role === 'siswa' && <>({user.nis})</>}
            </p>
          </div>
        </div>
      </section>
      <section className="flex items-start gap-5 mt-10">
        <div className="p-5 space-y-2 bg-white shadow w-80 rounded-xl">
          {states.map((s) => (
            <button
              onClick={s.handle}
              key={s.label}
              className={clsx(
                [
                  'flex items-center gap-2 px-5 py-3 rounded-lg transition duration-300 w-full',
                ],
                {
                  'text-white bg-black': s.active,
                  'hover:bg-gray-200': !s.active,
                }
              )}
            >
              <s.icon size={24} />
              {s.label}
            </button>
          ))}
        </div>
        {state === 'edit-profile' && (
          <div className="w-full p-10 bg-white shadow rounded-xl">
            <h3 className="text-xl font-bold">Edit Profil</h3>
            <form onSubmit={handleEditProfile} className="mt-5 space-y-3">
              <Input
                label="Nama"
                placeholder="Masukkan nama"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                disabled={processing}
                error={errors.name}
                isError={!!errors.name}
                required
              />
              <Input
                type="email"
                label="Email"
                placeholder="Masukkan email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                disabled={processing}
                error={errors.email}
                isError={!!errors.email}
                required
              />
              <Input
                label="Username"
                placeholder="Masukkan username"
                value={data.username}
                onChange={(e) => setData('username', e.target.value)}
                disabled={processing}
                error={errors.username}
                isError={!!errors.username}
                required
              />
              {user.role === 'siswa' && (
                <Input
                  type="nis"
                  placeholder="Masukkan NIS"
                  label="NIS"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  value={data.nis}
                  onChange={(e) => setData('nis', e.target.value)}
                  disabled={processing}
                  error={errors.nis}
                  isError={!!errors.nis}
                  required
                />
              )}
              <div className="flex justify-end">
                <Button disabled={processing}>Ubah</Button>
              </div>
            </form>
          </div>
        )}
        {state === 'change-password' && (
          <div className="w-full p-10 bg-white shadow rounded-xl">
            <h3 className="text-xl font-bold">Ganti Password</h3>
            <form onSubmit={handleChangePassword} className="mt-5 space-y-3">
              <Input
                type="password"
                label="Password Lama"
                placeholder="Masukkan password lama"
                value={data_cp.old_password}
                onChange={(e) => setDataCP('old_password', e.target.value)}
                disabled={processing_cp}
                error={errors_cp.old_password}
                isError={!!errors_cp.old_password}
                required
              />
              <Input
                type="password"
                label="Password Baru"
                placeholder="Masukkan password baru"
                value={data_cp.password}
                onChange={(e) => setDataCP('password', e.target.value)}
                disabled={processing_cp}
                error={errors_cp.password}
                isError={!!errors_cp.password}
                required
              />

              <div className="flex justify-end">
                <Button disabled={processing}>Ubah</Button>
              </div>
            </form>
          </div>
        )}
      </section>
    </GeneralLayout>
  );
}
