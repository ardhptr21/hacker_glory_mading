import DashboardLayout from '@/components/layouts/DashboardLayout';
import Editor from '@/components/partials/Editor';
import Button from '@/components/ui/Button';
import MagazineCard from '@/components/ui/card/MagazineCard';
import Input from '@/components/ui/form/Input';
import Select from '@/components/ui/form/Select';
import Textarea from '@/components/ui/form/Textarea';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function EditMagazine({ magazine, categories }) {
  const { user } = usePage().props;

  const { data, setData, processing, errors, post } = useForm({
    _method: 'PUT',
    title: magazine.title,
    description: magazine.description,
    thumbnail: '',
    category_id: magazine.category_id,
    article: magazine.article,
  });
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table(data);
    post(route('dashboard.mading.update', magazine.slug), {
      onSuccess: () => toast.success('Mading berhasil diupdate.'),
      onError: () => toast.error('Mading gagal diupdate.'),
    });
  };

  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold">Buat Mading</h1>

      <section className="mt-10">
        <div className="grid grid-cols-2 gap-10">
          <form onSubmit={handleSubmit} className="flex-1 space-y-3">
            <Input
              label="Judul"
              placeholder="Masukkan judul mading"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              error={errors.title}
              isError={!!errors.title}
              disabled={processing}
              required
            />
            <Select
              label="Kategori"
              placeholder="Pilih kategori"
              value={data.category_id}
              error={errors.category_id}
              isError={!!errors.category_id}
              disabled={processing}
              onChange={(e) => {
                setData('category_id', e.target.value),
                  setSelectedCategory(
                    e.target.options[e.target.selectedIndex].text
                  );
              }}
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
            <Textarea
              label="Deskripsi"
              placeholder="Masukkan deskripsi mading"
              rows={8}
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              error={errors.description}
              isError={!!errors.description}
              disabled={processing}
              required
            />
            <Input
              type="file"
              label="Thumbnail"
              className="bg-white"
              accept="image/*"
              onChange={(e) => setData('thumbnail', e.target.files[0])}
              error={errors.thumbnail}
              isError={!!errors.thumbnail}
              disabled={processing}
            />
            <Editor
              label="Artikel"
              value={data.article}
              onChange={(v) => setData('article', v)}
            />
            <div className="flex justify-end gap-2">
              <Button
                as={Link}
                href={route('dashboard.mading.index')}
                variant="outline"
              >
                Batal
              </Button>
              <Button type="submit" disabled={processing}>
                Update
              </Button>
            </div>
          </form>
          <div className="flex-1 max-w-xl pl-10">
            <h3 className="text-lg font-semibold">Preview Card</h3>
            <MagazineCard
              className="mt-5"
              title={data.title}
              excerpt={data.description}
              image={
                typeof data.thumbnail === 'object'
                  ? URL.createObjectURL(data.thumbnail)
                  : `/storage/${magazine.thumbnail}`
              }
              category={selectedCategory}
              author={user?.name}
              published_at={magazine.published_at}
            />
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
