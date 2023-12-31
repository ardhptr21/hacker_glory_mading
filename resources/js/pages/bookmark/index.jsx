import GeneralLayout from '@/components/layouts/GeneralLayout';
import Filter from '@/components/partials/Filter';
import Button from '@/components/ui/Button';
import MagazineCard from '@/components/ui/card/MagazineCard';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from '@phosphor-icons/react';
import Pagination from '@/components/partials/Pagination';

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
        <h1 className="mx-auto font-extrabold tracking-wide text-center uppercase before:-z-10 text-9xl max-w-max font-titan">
          BOOKMARK
        </h1>
      </section>
      <Filter
        categoryTitle="OTHER CATEGORIES"
        className="mt-24"
        withCategory={false}
      />
      <section className="columns-sm gap-5 mt-16">
        {bookmarks?.data?.map((bookmark) => (
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
      <div className="flex justify-center mt-20">
        <Pagination
          total={bookmarks.total}
          from={bookmarks.from}
          to={bookmarks.to}
          prevPageUrl={bookmarks.prev_page_url}
          nextPageUrl={bookmarks.next_page_url}
          links={bookmarks.links}
          withInfo={false}
        />
      </div>
    </GeneralLayout>
  );
}
