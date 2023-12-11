import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import MagazineCard from '@/components/ui/card/MagazineCard';
import Input from '@/components/ui/form/Input';
import { SortDescending } from '@phosphor-icons/react';

export default function Home() {
  return (
    <main className="container min-h-screen">
      <section className="flex flex-col-reverse items-center justify-center w-full h-screen gap-10 md:gap-28 md:flex-row">
        <div className="space-y-5 text-center md:space-y-10 md:text-left">
          <h1 className="text-5xl font-extrabold md:text-8xl">
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
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <p className="font-bold">CATEGORIES</p>
          <div className="flex items-center justify-center gap-2">
            <Badge text="ART" />
            <Badge text="TECH" />
            <Badge text="DESIGN" />
            <Badge text="MUSIC" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Input
            type="search"
            placeholder="Search"
            className="border border-l border-black w-96"
          />
          <div>
            <Button>
              Terbaru <SortDescending size={20} />
            </Button>
          </div>
        </div>
      </section>
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
