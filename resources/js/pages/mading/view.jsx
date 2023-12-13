import GeneralLayout from '@/components/layouts/GeneralLayout';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from '@phosphor-icons/react';
import 'react-quill/dist/quill.snow.css';

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
        <h1 className="flex-1 font-extrabold uppercase text-8xl">
          {magazine.title}
        </h1>
        <p className="flex-1 text-lg font-semibold leading-relaxed">
          {magazine.description}
        </p>
      </section>
      <section className="flex flex-col items-center justify-between gap-5 mt-28">
        <div className="flex items-center justify-between w-full">
          <div className="inline-flex items-center justify-center gap-10">
            <p>
              <span className="font-bold">Author</span> {magazine.author.name}
            </p>
            <p>
              <span className="font-bold">Publikasi</span>{' '}
              {magazine.published_at}
            </p>
          </div>
          <Badge text={magazine.category.name} />
        </div>
        <div className="w-full overflow-hidden bg-white aspect-video">
          <img
            className="object-cover w-full h-full"
            src={`/storage/${magazine.thumbnail}`}
            alt={magazine.title}
          />
        </div>
        {magazine.article && (
          <div className="flex items-start justify-between w-5/6 gap-20 mx-auto mt-16 space-y-5">
            <div className="sticky w-full top-10">
              <div className="inline-flex items-center gap-5">
                <div className="w-20 h-20 overflow-hidden bg-gray-500 rounded-full">
                  <img
                    className="object-cover w-full h-full"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                    alt=""
                  />
                </div>
                <h3 className="text-3xl font-bold">Ardhi Putra</h3>
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
            <div className="w-full max-w-2xl">
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
