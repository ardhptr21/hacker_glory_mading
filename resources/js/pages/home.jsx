import Filter from '@/components/partials/Filter';
import MagazineCard from '@/components/ui/card/MagazineCard';
import GeneralLayout from '../components/layouts/GeneralLayout';

export default function Home({ magazines }) {
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
      <Filter />
      <section className="gap-5 mt-16 columns-sm">
        {magazines.map((magazine) => (
          <MagazineCard
            className="mb-5 break-inside-avoid"
            key={magazine.slug}
            magazine={{
              ...magazine,
              thumbnail: `/storage/${magazine.thumbnail}`,
            }}
          />
        ))}
      </section>
    </GeneralLayout>
  );
}
