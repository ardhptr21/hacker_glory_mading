import GeneralLayout from '@/components/layouts/GeneralLayout';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Clock, Siren, UserCircle } from '@phosphor-icons/react';

export default function ViewMagazineArticle({ magazine }) {
  return (
    <GeneralLayout className="pt-24">
      <section className="flex flex-col justify-center gap-10">
        <div className="flex items-center justify-between">
          <Button as={Link} href="/" variant="outline">
            <ArrowLeft />
            Kembali
          </Button>
          <p className="font-bold">MADING</p>
        </div>
      </section>
      <section className="flex items-center justify-center gap-40 mt-20">
        <div className="flex-1">
          {!!magazine.important && (
            <div className="inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold text-white bg-orange-700 rounded-lg">
              <Siren weight="bold" size={18} /> <span>Penting</span>
            </div>
          )}
          <h1 className="font-extrabold tracking-wide uppercase text-7xl font-titan">
            {magazine.title}
          </h1>
        </div>
        <p className="flex-1 text-lg font-semibold leading-relaxed">
          {magazine.description}
        </p>
      </section>
      <section className="flex flex-col items-center justify-between gap-5 mt-28">
        <div className="flex items-center justify-between w-full">
          <div className="inline-flex items-center justify-center gap-10">
            <p className="inline-flex items-center gap-2">
              <UserCircle size={20} weight="bold" /> {magazine.author.name}
            </p>
            <p className="inline-flex items-center gap-2">
              <Clock size={20} weight="bold" />
              {magazine.published_at}
            </p>
          </div>
          <Badge text={magazine.category.name} />
        </div>
        <div className="w-full overflow-hidden bg-white aspect-video">
          <img
            className="object-cover w-full h-full rounded-xl"
            src={`/storage/${magazine.thumbnail}`}
            alt={magazine.title}
          />
        </div>
        {magazine.article && (
          <div className="flex items-start justify-between w-5/6 min-h-[85vh] gap-10 mx-auto mt-16 space-y-5">
            <div className="sticky w-[800px] top-28 bg-white p-5 rounded-xl shadow">
              <div>
                <h3 className="text-2xl font-bold">{magazine.author.name}</h3>
                <small>@{magazine.author.username}</small>
              </div>
              <div className="mt-5 space-y-3">
                <div className="flex items-start justify-between gap-5">
                  <p className="font-bold">Judul</p>{' '}
                  <p className="break-words">{magazine.title}</p>
                </div>
                <div className="flex items-start justify-between gap-5">
                  <p className="font-bold">Publikasi</p>{' '}
                  <p className="break-words">{magazine.published_at}</p>
                </div>
                <div className="flex items-start justify-between gap-5">
                  <p className="font-bold">Kategori</p>{' '}
                  <p className="break-words">{magazine.category.name}</p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div
                className="prose prose-lg max-w-none prose-ol:ml-5 prose-ul:ml-5"
                dangerouslySetInnerHTML={{ __html: magazine.article }}
              ></div>
            </div>
          </div>
        )}
      </section>
    </GeneralLayout>
  );
}
