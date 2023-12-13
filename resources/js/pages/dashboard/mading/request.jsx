import DashboardLayout from '@/components/layouts/DashboardLayout';
import FilterDashboard from '@/components/partials/FilterDashboard';
import PaginationTable from '@/components/partials/PaginationTable';
import Button from '@/components/ui/Button';
import Table from '@/components/ui/table/Table';
import Td from '@/components/ui/table/Td';
import Th from '@/components/ui/table/Th';
import Tr from '@/components/ui/table/Tr';
import { useForm } from '@inertiajs/react';
import { Check, X } from '@phosphor-icons/react';
import toast from 'react-hot-toast';

export default function DashboardRequestMagazine({ magazines, user }) {
  const { delete: destroy, patch } = useForm({});

  const handleDelete = (slug) => {
    confirm('Apakah kamu yakin ingin menghapus mading ini?') &&
      destroy(route('dashboard.mading.destroy', slug), {
        onSuccess: () => toast.success('Mading berhasil dihapus.'),
        onError: () => toast.error('Mading gagal dihapus.'),
      });
  };

  const handleApprove = (slug) => {
    patch(route('dashboard.mading.approve', slug), {
      onSuccess: () => toast.success('Madin g berhasil diapprove.'),
      onError: () => toast.error('Mading gagal diapprove.'),
    });
  };

  return (
    <DashboardLayout>
      <section className="flex justify-between">
        <h1 className="text-xl font-bold">Dashboard Mading</h1>
      </section>
      <section className="mt-10">
        <FilterDashboard />
        <div className="block py-8 pt-6 mt-5 bg-white shadow-sm rounded-xl px-9">
          <div className="overflow-x-auto">
            <Table>
              <thead className="align-bottom">
                <tr className="font-bold">
                  <Th className="min-w-[50px]">#</Th>
                  <Th className="min-w-[120px]">Judul</Th>
                  <Th className="min-w-[120px]">Published At</Th>
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
                    <Td>{magazine.published_at}</Td>
                    <Td>{magazine.author.username}</Td>
                    <Td>{magazine.category.name}</Td>
                    <Td>
                      <div className="flex gap-5">
                        <Button
                          size="box"
                          variant="outline"
                          title="Unapprove Mading"
                          onClick={() => handleApprove(magazine.slug)}
                        >
                          {magazine.approved ? <X /> : <Check />}
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
