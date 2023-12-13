import DashboardLayout from '@/components/layouts/DashboardLayout';
import PaginationTable from '@/components/partials/PaginationTable';
import Button from '@/components/ui/Button';
import Table from '@/components/ui/table/Table';
import Td from '@/components/ui/table/Td';
import Th from '@/components/ui/table/Th';
import Tr from '@/components/ui/table/Tr';
import { Link, useForm } from '@inertiajs/react';
import { Eye, Pencil, Plus, Trash } from '@phosphor-icons/react';
import FilterDashboard from '../../../components/partials/FilterDashboard';

export default function DashboardMagazine({ magazines }) {
  console.log(magazines);
  const { delete: destroy } = useForm({});

  const handleDelete = (slug) => {
    confirm('Apakah kamu yakin ingin menghapus mading ini?') &&
      destroy(route('dashboard.mading.destroy', slug));
  };

  return (
    <DashboardLayout>
      <section className="flex justify-between">
        <h1 className="text-xl font-bold">Dashboard Mading</h1>
        <Button as={Link} href={route('dashboard.mading.create')}>
          <Plus />
          Buat Baru
        </Button>
      </section>
      <section>
        <FilterDashboard
          filters={[
            {
              key: 'status',
              label: 'Status',
              options: [
                { label: 'Published', value: 'published' },
                { label: 'Unpublished', value: 'unpublished' },
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
                  <Th className="min-w-[120px]">Judul</Th>
                  <Th className="min-w-[120px]">Status</Th>
                  <Th className="min-w-[120px]">Author</Th>
                  <Th className="min-w-[120px]">Category</Th>
                  <Th></Th>
                </tr>
              </thead>
              <tbody>
                {magazines?.data?.map((magazine, index) => (
                  <Tr key={magazine.slug}>
                    <Td>{index + 1}</Td>
                    <Td>{magazine.title}</Td>
                    <Td>
                      {magazine.is_published ? 'Published' : 'Unpublished'}
                    </Td>
                    <Td>{magazine.author.username}</Td>
                    <Td>{magazine.category.name}</Td>
                    <Td>
                      <div className="flex gap-5">
                        <Button
                          onClick={() => handleDelete(magazine.slug)}
                          size="box"
                          className="text-red-500 border-red-500 hover:bg-red-500"
                          variant="outline"
                        >
                          <Trash />
                        </Button>
                        <Button
                          as={Link}
                          href={route('dashboard.mading.edit', magazine.slug)}
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
            <PaginationTable
              className="mt-5"
              total={magazines.total}
              from={magazines.from}
              to={magazines.to}
              prevPageUrl={magazines.prev_page_url}
              nextPageUrl={magazines.next_page_url}
              links={magazines.links}
              currentPage={magazines.current_page}
            />
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
