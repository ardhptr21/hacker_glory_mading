import DashboardLayout from '@/components/layouts/DashboardLayout';
import PaginationTable from '@/components/partials/PaginationTable';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/form/Input';
import Table from '@/components/ui/table/Table';
import Td from '@/components/ui/table/Td';
import Th from '@/components/ui/table/Th';
import Tr from '@/components/ui/table/Tr';
import { useForm } from '@inertiajs/react';
import { Check, Pencil, Plus, Trash, X } from '@phosphor-icons/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import FilterDashboard from '../../../components/partials/FilterDashboard';

export default function CategoryDashboard({ categories }) {
  const {
    data,
    setData,
    errors,
    processing,
    clearErrors,
    post,
    patch,
    delete: destroy,
    reset,
  } = useForm({
    name: '',
  });
  const [willUpdate, setWillUpdate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('dashboard.category.store'), {
      onSuccess: () => {
        reset();
        toast.success('Kategori berhasil ditambahkan.');
      },
      onError: () => toast.error('Kategori gagal ditambahkan.'),
    });
  };

  const handleUpdate = () => {
    patch(route('dashboard.category.update', willUpdate), {
      onSuccess: () => {
        setWillUpdate(null), setData('name', '');
        toast.success('Kategori berhasil diupdate.');
      },
      onError: () => toast.error('Kategori gagal diupdate.'),
    });
  };

  const handleDelete = (slug) => {
    confirm('Yakin ingin menghapus kategori ini?') &&
      destroy(route('dashboard.category.destroy', slug), {
        onSuccess: () => toast.success('Kategori berhasil dihapus.'),
        onError: () => toast.error('Kategori gagal dihapus.'),
      });
  };

  const handleUpdateClick = (category) => {
    setWillUpdate(category.slug);
    setData('name', category.name);
  };

  return (
    <DashboardLayout>
      <section>
        <h1 className="text-xl font-bold">Kategori Dashboard</h1>
      </section>
      <section className="mt-10 ">
        <div className="flex justify-between">
          <FilterDashboard />
          <form
            onSubmit={handleSubmit}
            className="flex items-start justify-end gap-5"
          >
            <Input
              placeholder="Tambah Kategori"
              className="w-full"
              value={willUpdate ? '' : data.name}
              onChange={(e) => setData('name', e.target.value)}
              error={errors.name}
              isError={!!errors.name && !willUpdate}
              disabled={processing || willUpdate}
              required
            />
            <Button type="submit" disabled={processing || willUpdate}>
              <Plus />
              Tambah
            </Button>
          </form>
        </div>
        <div className="block py-8 pt-6 mt-5 bg-white shadow-sm rounded-xl px-9">
          <div className="overflow-x-auto">
            <Table>
              <thead className="align-bottom">
                <tr className="font-bold">
                  <Th className="min-w-[50px]">#</Th>
                  <Th className="min-w-[120px]">Nama</Th>
                  <Th></Th>
                </tr>
              </thead>
              <tbody>
                {categories.data.map((category, index) => (
                  <Tr key={category.slug}>
                    <Td>{index + categories.from}</Td>
                    <Td>
                      {willUpdate === category.slug ? (
                        <div className="flex items-start w-full gap-2">
                          <Input
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            isError={!!errors.name}
                            disabled={processing}
                          />
                          <Button
                            size="box"
                            onClick={() => {
                              setWillUpdate(null),
                                setData('name', ''),
                                clearErrors();
                            }}
                            disabled={processing}
                          >
                            <X />
                          </Button>
                          <Button
                            size="box"
                            disabled={processing}
                            onClick={handleUpdate}
                          >
                            <Check />
                          </Button>
                        </div>
                      ) : (
                        category.name
                      )}
                    </Td>
                    <Td>
                      <div className="flex gap-5">
                        <Button
                          onClick={() => handleDelete(category.slug)}
                          size="box"
                          className="text-red-500 border-red-500 hover:bg-red-500"
                          variant="outline"
                        >
                          <Trash />
                        </Button>
                        <Button
                          onClick={() => handleUpdateClick(category)}
                          size="box"
                          className="text-yellow-500 border-yellow-500 hover:bg-yellow-500"
                          variant="outline"
                        >
                          <Pencil />
                        </Button>
                      </div>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
            <PaginationTable
              className="mt-5"
              total={categories.total}
              from={categories.from}
              to={categories.to}
              prevPageUrl={categories.prev_page_url}
              nextPageUrl={categories.next_page_url}
              links={categories.links}
              currentPage={categories.current_page}
            />
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
