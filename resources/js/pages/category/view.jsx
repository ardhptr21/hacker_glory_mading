import Filter from '@/components/partials/Filter';
import Button from '@/components/ui/Button';
import MagazineCard from '@/components/ui/card/MagazineCard';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from '@phosphor-icons/react';

export default function ViewCategory() {
  return (
    <main className="container">
      <section className="flex flex-col justify-center gap-10">
        <div className="flex items-center justify-between">
          <Button as={Link} href="/" variant="outline">
            <ArrowLeft />
            Kembali
          </Button>
          <p className="font-bold">CATEGORY</p>
        </div>
        <h1 className="mx-auto font-extrabold text-center uppercase before:-z-10 text-9xl max-w-max">
          ART
        </h1>
      </section>
      <Filter categoryTitle="OTHER CATEGORIES" className="mt-24" />
      <section className="grid grid-cols-1 gap-5 mt-16 md:grid-cols-3">
        {Array.from({ length: 12 }).map((_, index) => (
          <MagazineCard
            key={index}
            title="Hope die last"
            excerpt="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ab, ipsa reiciendis earum iusto ullam enim dicta esse dignissimos, vel voluptatibus itaque vero sit sequi doloribus commodi quasi ducimus nemo!"
            image="https://juliannakunstler.com/images_art1/color/monochromatic/1.jpg"
            category="ART"
            author="Ardhi Putra"
            published_at="16 Maret 2023"
          />
        ))}
      </section>
    </main>
  );
}
