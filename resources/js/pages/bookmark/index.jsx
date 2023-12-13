import GeneralLayout from '@/components/layouts/GeneralLayout';
import Filter from '@/components/partials/Filter';
import Button from '@/components/ui/Button';
import MagazineCard from '@/components/ui/card/MagazineCard';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from '@phosphor-icons/react';

export default function ViewCategory({ bookmarks }) {
  return (
    <GeneralLayout className="pt-24">
      <section className="flex flex-col justify-center gap-10">
        <div className="flex items-center justify-between">
          <Button as={Link} href="/" variant="outline">
            <ArrowLeft />
            Kembali
          </Button>
          <p className="font-bold">BOOKMARK</p>
        </div>
        <h1 className="mx-auto font-extrabold text-center uppercase before:-z-10 text-9xl max-w-max">
          BOOKMARK
        </h1>
      </section>
      <Filter
        categoryTitle="OTHER CATEGORIES"
        className="mt-24"
        withCategory={false}
      />
      <section className="grid grid-cols-1 gap-5 mt-16 md:grid-cols-3">
        {bookmarks.map((bookmark) => (
          <MagazineCard
            className="mb-5 break-inside-avoid"
            key={bookmark.magazine.slug}
            magazine={{
              ...bookmark.magazine,
              thumbnail: `/storage/${bookmark.magazine.thumbnail}`,
            }}
            unbookmark={bookmark.id}
          />
        ))}
      </section>
    </GeneralLayout>
  );
}
