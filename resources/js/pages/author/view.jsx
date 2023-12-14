import GeneralLayout from '@/components/layouts/GeneralLayout';
import Filter from '@/components/partials/Filter';
import PhotoProfile from '@/components/partials/PhotoProfile';
import Button from '@/components/ui/Button';
import MagazineCard from '@/components/ui/card/MagazineCard';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from '@phosphor-icons/react';

export default function ViewCategory({ author, magazines }) {
  return (
    <GeneralLayout className="pt-24">
      <section className="flex flex-col justify-center gap-10">
        <div className="flex items-center justify-between">
          <Button as={Link} href="/" variant="outline">
            <ArrowLeft />
            Kembali
          </Button>
          <p className="font-bold">AUTHOR</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-5">
          <PhotoProfile name={author.name} />
          <h1 className="mx-auto font-extrabold text-center before:-z-10 text-9xl max-w-max">
            @{author.username}
          </h1>
          <p className="text-xl font-semibold">{author.name}</p>
        </div>
      </section>
      <Filter className="mt-24" categoryInParam={true} />
      <section className="gap-5 mt-16 columns-sm">
        {magazines.map((magazine) => (
          <MagazineCard
            className="mb-5 break-inside-avoid"
            key={magazine.slug}
            magazine={{
              ...magazine,
              author: {
                username: author.username,
              },
              thumbnail: `/storage/${magazine.thumbnail}`,
            }}
          />
        ))}
      </section>
    </GeneralLayout>
  );
}
