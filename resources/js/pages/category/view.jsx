import GeneralLayout from '@/components/layouts/GeneralLayout';
import Filter from '@/components/partials/Filter';
import Button from '@/components/ui/Button';
import MagazineCard from '@/components/ui/card/MagazineCard';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from '@phosphor-icons/react';
import Pagination from '@/components/partials/Pagination';

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
        <h1 className="mx-auto font-extrabold tracking-wide text-center uppercase before:-z-10 text-9xl max-w-max font-titan">
          {category.name}
        </h1>
      </section>
      <Filter className="mt-24" />
      <section className="gap-5 mt-16 columns-sm">
        {magazines?.data?.map((magazine) => (
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
      <div className="flex justify-center mt-20">
        <Pagination
          total={magazines.total}
          from={magazines.from}
          to={magazines.to}
          prevPageUrl={magazines.prev_page_url}
          nextPageUrl={magazines.next_page_url}
          links={magazines.links}
          withInfo={false}
        />
      </div>
    </GeneralLayout>
  );
}
