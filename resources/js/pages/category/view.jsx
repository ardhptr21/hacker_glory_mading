import Filter from '@/components/partials/Filter';
import Button from '@/components/ui/Button';
import MagazineCard from '@/components/ui/card/MagazineCard';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from '@phosphor-icons/react';

export default function ViewCategory({ category, magazines }) {
  return (
    <main className="container">
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
      <Filter categoryTitle="OTHER CATEGORIES" className="mt-24" />
      <section className="grid grid-cols-1 gap-5 mt-16 md:grid-cols-3">
        {magazines.map((magazine) => (
          <MagazineCard
            className="break-inside-avoid mb-5"
            key={magazine.slug}
            title={magazine.title}
            excerpt={magazine.description}
            image={`/storage/${magazine.thumbnail}`}
            category={category.name}
            author={magazine.author.username}
            published_at={magazine.published_at}
            category_slug={category.slug}
            slug={magazine.slug}
          />
        ))}
      </section>
    </main>
  );
}
