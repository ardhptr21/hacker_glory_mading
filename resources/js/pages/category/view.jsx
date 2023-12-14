import GeneralLayout from '@/components/layouts/GeneralLayout';
import Filter from '@/components/partials/Filter';
import Button from '@/components/ui/Button';
import MagazineCard from '@/components/ui/card/MagazineCard';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from '@phosphor-icons/react';

export default function ViewCategory({ category, magazines }) {
  return (
    <GeneralLayout className="pt-24">
      <section className="flex flex-col justify-center gap-10">
        <div className="flex items-center justify-between">
          <Button as={Link} href="/" variant="outline">
            <ArrowLeft />
            Kembali
          </Button>
          <p className="font-bold">KATEGORI</p>
        </div>
        <h1 className="mx-auto font-extrabold text-center uppercase before:-z-10 text-9xl max-w-max">
          {category.name}
        </h1>
      </section>
      <Filter className="mt-24" />
      <section className="gap-5 mt-16 columns-sm">
        {magazines.map((magazine) => (
          <MagazineCard
            className="mb-5 break-inside-avoid"
            key={magazine.slug}
            magazine={{
              ...magazine,
              category: {
                name: category.name,
              },
              thumbnail: `/storage/${magazine.thumbnail}`,
            }}
          />
        ))}
      </section>
    </GeneralLayout>
  );
}
