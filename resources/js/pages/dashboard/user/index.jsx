import DashboardLayout from '@/components/layouts/DashboardLayout';
import FilterDashboard from '@/components/partials/FilterDashboard';
import Pagination from '@/components/partials/Pagination';
import Button from '@/components/ui/Button';
import Table from '@/components/ui/table/Table';
import Td from '@/components/ui/table/Td';
import Th from '@/components/ui/table/Th';
import Tr from '@/components/ui/table/Tr';
import { Link, useForm } from '@inertiajs/react';
import { Eye, Plus, Trash } from '@phosphor-icons/react';
import clsx from 'clsx';
import toast from 'react-hot-toast';

export default function UserDashboard({ users, user: auth }) {
  const { delete: destroy } = useForm();

  const handleDelete = (username) => {
    confirm('Yakin ingin menghapus user ini?') &&
      destroy(route('dashboard.user.destroy', username), {
        onSuccess: () => toast.success('User berhasil dihapus.'),
        onError: () => toast.error('User gagal dihapus.'),
      });
  };

  return (
    <DashboardLayout>
      <section className="flex justify-between">
        <h1 className="text-xl font-bold">Dashboard User</h1>
        <Button as={Link} href={route('dashboard.user.create')}>
          <Plus />
          Buat Baru
        </Button>
      </section>
      <section className="mt-4">
        <FilterDashboard
          filters={[
            {
              key: 'role',
              label: 'Pilih Role',
              options: [
                { value: 'admin', label: 'Admin' },
                { value: 'penulis', label: 'Penulis' },
                { value: 'siswa', label: 'Siswa' },
              ],
            },
          ]}
        />
        <div className="block py-8 pt-6 mt-5 bg-white shadow-sm rounded-xl px-9">
          <div className="overflow-x-auto">
            <Table>
              <thead className="align-bottom">
                <tr className="font-bold">
                  <Th className="min-w-[50px]">#</Th>
                  <Th className="min-w-[120px]">Name</Th>
                  <Th className="min-w-[120px]">Username</Th>
                  <Th className="min-w-[120px]">Email</Th>
                  <Th className="min-w-[120px]">Role</Th>
                  <Th></Th>
                </tr>
              </thead>
              <tbody>
                {users?.data?.map((user, index) => (
                  <Tr
                    key={user.username}
                    className={clsx([{ 'bg-yellow-50': user.id === auth.id }])}
                  >
                    <Td>{index + users.from}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.username}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.role}</Td>
                    <Td>
                      {user.id !== auth.id && (
                        <div className="flex gap-5">
                          <Button
                            onClick={() => handleDelete(user.username)}
                            size="box"
                            className="text-red-500 border-red-500 hover:bg-red-500"
                            variant="outline"
                          >
                            <Trash />
                          </Button>
                          <Button
                            as={Link}
                            href={route('dashboard.user.view', user.username)}
                            size="box"
                            className="text-blue-500 border-blue-500 hover:bg-blue-500"
                            variant="outline"
                          >
                            <Eye />
                          </Button>
                        </div>
                      )}
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Pagination
            className="mt-5"
            total={users.total}
            from={users.from}
            to={users.to}
            prevPageUrl={users.prev_page_url}
            nextPageUrl={users.next_page_url}
            links={users.links}
            currentPage={users.current_page}
          />
        </div>
      </section>
    </DashboardLayout>
  );
}
