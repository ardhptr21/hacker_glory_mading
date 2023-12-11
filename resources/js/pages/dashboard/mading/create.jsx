import DashboardLayout from '@/components/layouts/DashboardLayout';
import Button from '@/components/ui/Button';
import MagazineCard from '@/components/ui/card/MagazineCard';
import Input from '@/components/ui/form/Input';
import Select from '@/components/ui/form/Select';
import Textarea from '@/components/ui/form/Textarea';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function CreateMagazine({ categories }) {
  const { user } = usePage().props;

  const { data, setData, processing, errors, post, reset } = useForm({
    title: '',
    description: '',
    thumbnail: '',
    category_id: '',
    published_at: '',
  });
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('dashboard.mading.store'), {
      onSuccess: () => {
        reset();
        setSelectedCategory('');
      },
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
            <Input
              type="datetime-local"
              label="Tanggal Terbit"
              value={data.published_at}
              onChange={(e) => setData('published_at', e.target.value)}
              error={errors.published_at}
              isError={!!errors.published_at}
              disabled={processing}
              required
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
                Buat
              </Button>
            </div>
          </form>
          <div className="flex-1 max-w-xl pl-10">
            <h3 className="text-lg font-semibold">Preview</h3>
            <MagazineCard
              className="mt-5"
              title={data.title}
              excerpt={data.description}
              image={data.thumbnail ? URL.createObjectURL(data.thumbnail) : ''}
              category={selectedCategory}
              author={user?.name}
              published_at={data.published_at}
            />
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
