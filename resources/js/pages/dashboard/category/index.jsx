import DashboardLayout from '@/components/layouts/DashboardLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/form/Input';
import Table from '@/components/ui/table/Table';
import Td from '@/components/ui/table/Td';
import Th from '@/components/ui/table/Th';
import Tr from '@/components/ui/table/Tr';
import { useForm } from '@inertiajs/react';
import { Pencil, Trash } from '@phosphor-icons/react';

export default function CategoryDashboard({ categories }) {
  const { data, setData, errors, processing, post } = useForm({
    name: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('dashboard.category.store'));
  };

  return (
    <DashboardLayout>
      <section>
        <h1 className="text-xl font-bold">Kategori Dashboard</h1>
      </section>

      <section className="mt-10 ">
        <form onSubmit={handleSubmit} className="flex justify-end gap-5">
          <Input
            placeholder="Tambah Kategori"
            className="w-96"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            error={errors.name}
            isError={!!errors.name}
            disabled={processing}
          />
          <Button type="submit" disabled={processing}>
            Tambah
          </Button>
        </form>
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
                {categories.map((category) => (
                  <Tr key={category.slug}>
                    <Td>{category.id}</Td>
                    <Td>{category.name}</Td>
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
