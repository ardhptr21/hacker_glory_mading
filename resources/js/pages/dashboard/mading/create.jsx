import DashboardLayout from '@/components/layouts/DashboardLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/form/Input';
import Textarea from '@/components/ui/form/Textarea';
import { useForm } from '@inertiajs/react';
import Select from '@/components/ui/form/Select';
import Badge from '@/components/ui/Badge';
import { useState } from 'react';

export default function CreateMagazine({ categories }) {
  const { data, setData, processing, errors, post, reset } = useForm({
    title: '',
    description: '',
    thumbnail: '',
    category_id: '',
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
            <div className="flex justify-end">
              <Button type="submit" disabled={processing}>
                Buat
              </Button>
            </div>
          </form>
          <div className="flex-1 max-w-xl pl-10">
            <h3 className="text-lg font-semibold">Preview</h3>
            <div className="mt-5">
              <div className="space-y-2">
                <div className="flex justify-end">
                  {selectedCategory && <Badge text={selectedCategory} />}
                </div>
                {data.thumbnail && (
                  <img
                    src={URL.createObjectURL(data.thumbnail)}
                    alt="preview"
                    className="w-full"
                  />
                )}
                <p className="text-3xl font-bold">{data.title}</p>
                <p className="leading-relaxed">{data.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
