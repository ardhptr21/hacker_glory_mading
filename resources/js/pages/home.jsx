import Button from '@/components/ui/Button';
import MagazineCard from '@/components/ui/card/MagazineCard';
import { Link } from '@inertiajs/react';
import { ArrowRight, Siren } from '@phosphor-icons/react';
import GeneralLayout from '../components/layouts/GeneralLayout';

export default function Home({ important_magazines, latest_magazines }) {
  return (
    <GeneralLayout>
      <section className="flex flex-col-reverse items-center justify-center w-full h-screen gap-10 md:gap-28 md:flex-row">
        <div className="space-y-5 text-center md:space-y-10 md:text-left">
          <h1 className="text-5xl font-extrabold tracking-wide md:text-8xl font-titan">
            Hacker Glory Mading
          </h1>
          <p className="md:text-xl">
            Informasi - informasi terbaru mengenai hal - hal yang seru dan
            penting akan selalu kamu dapatkan disini.
          </p>
        </div>
        <div>
          <img
            src="/illustrations/absurd-book.png"
            alt="Absurd Book"
            data-credit="https://absurd.design/"
            className="w-full max-w-3xl"
          />
        </div>
      </section>

      <section className="mt-16 space-y-5">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Siren /> Mading Penting
          </h2>
        </div>
        <div className="gap-5 grid grid-cols-3">
          {important_magazines.map((magazine) => (
            <MagazineCard
              className="mb-5 break-inside-avoid"
              key={magazine.slug}
              magazine={{
                ...magazine,
                thumbnail: `/storage/${magazine.thumbnail}`,
              }}
            />
          ))}
        </div>
      </section>

      <section className="space-y-5 mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Siren /> Mading Terbaru
          </h2>
          <Link
            className="inline-flex items-center gap-5 hover:underline"
            href={route('mading.index')}
          >
            Selengkapnya
            <ArrowRight />
          </Link>
        </div>
        <div className="gap-5 grid grid-cols-3">
          {latest_magazines.map((magazine) => (
            <MagazineCard
              className="mb-5 break-inside-avoid"
              key={magazine.slug}
              magazine={{
                ...magazine,
                thumbnail: `/storage/${magazine.thumbnail}`,
              }}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Button as={Link} href={route('mading.index')}>
            Selengkapnya <ArrowRight />
          </Button>
        </div>
      </section>
    </GeneralLayout>
  );
}
