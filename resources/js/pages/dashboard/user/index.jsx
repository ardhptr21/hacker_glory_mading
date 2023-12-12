import DashboardLayout from '@/components/layouts/DashboardLayout';
import Button from '@/components/ui/Button';
import Table from '@/components/ui/table/Table';
import Td from '@/components/ui/table/Td';
import Th from '@/components/ui/table/Th';
import Tr from '@/components/ui/table/Tr';
import { Eye, Pencil, Trash } from '@phosphor-icons/react';

export default function index({ users }) {
  return (
    <DashboardLayout>
      <section>
        <h1 className="text-xl font-bold">Dashboard User</h1>
      </section>
      <section>
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
                {users?.map((user, index) => (
                  <Tr key={user.username}>
                    <Td>{index + 1}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.username}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.role}</Td>
                    <Td>
                      <div className="flex gap-5">
                        <Button
                          size="box"
                          className="text-red-500 border-red-500 hover:bg-red-500"
                          variant="outline"
                        >
                          <Trash />
                        </Button>
                        <Button
                          size="box"
                          className="text-yellow-500 border-yellow-500 hover:bg-yellow-500"
                          variant="outline"
                        >
                          <Pencil />
                        </Button>
                        <Button
                          size="box"
                          className="text-blue-500 border-blue-500 hover:bg-blue-500"
                          variant="outline"
                        >
                          <Eye />
                        </Button>
                      </div>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
