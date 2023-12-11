import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from '@phosphor-icons/react';

export default function ViewMagazineArticle() {
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
      </section>
      <section className="flex items-center justify-center gap-40 mt-20">
        <h1 className="flex-1 font-extrabold uppercase text-8xl">
          Hope dies last
        </h1>
        <p className="flex-1 text-lg font-semibold leading-relaxed">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo
          natus modi quod distinctio accusamus eius consequuntur ab tenetur quas
          possimus expedita molestias ullam libero, adipisci voluptatum.
          Exercitationem id delectus officiis.
        </p>
      </section>
      <section className="flex flex-col items-center justify-between gap-5 mt-28">
        <div className="flex items-center justify-between w-full">
          <div className="inline-flex items-center justify-center gap-10">
            <p>
              <span className="font-bold">Author</span> Ardhi Putra
            </p>
            <p>
              <span className="font-bold">Publikasi</span> 16 Maret 2023
            </p>
          </div>
          <Badge text="MUSIC" />
        </div>
        <div className="w-full bg-red-500 aspect-video">
          <img
            className="object-cover w-full h-full"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/1dbbc759274971.5a1c7cc11aade.jpg"
            alt=""
          />
        </div>

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
                <p className="break-words">Hope dies last</p>
              </div>
              <div className="flex items-start justify-between gap-5">
                <p className="font-bold">Publikasi</p>{' '}
                <p className="break-words">16 Maret 2023</p>
              </div>
              <div className="flex items-start justify-between gap-5">
                <p className="font-bold">Kategori</p>{' '}
                <p className="break-words">Music</p>
              </div>
            </div>
          </div>
          <div className="max-w-2xl space-y-5 text-lg leading-loose">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              distinctio nemo quae dolores asperiores repudiandae nisi rem
              aliquid, dolor quod, harum vitae officiis dicta ratione, possimus
              ipsa debitis nostrum id. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Molestias nostrum sapiente modi quisquam sequi.
              Quisquam cumque hic ducimus eius quibusdam debitis, exercitationem
              placeat! Veritatis porro ratione deleniti fugiat eligendi
              deserunt.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              distinctio nemo quae dolores asperiores repudiandae nisi rem
              aliquid, dolor quod, harum vitae officiis dicta ratione, possimus
              ipsa debitis nostrum id.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              distinctio nemo quae dolores asperiores repudiandae nisi rem
              aliquid, dolor quod, harum vitae officiis dicta ratione, possimus
              ipsa debitis nostrum id. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Aliquam distinctio nemo quae dolores asperiores
              repudiandae nisi rem aliquid, dolor quod, harum vitae officiis
              dicta ratione, possimus ipsa debitis nostrum id. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Aliquam distinctio nemo
              quae dolores asperiores repudiandae nisi rem aliquid, dolor quod,
              harum vitae officiis dicta ratione, possimus ipsa debitis nostrum
              id. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aliquam distinctio nemo quae dolores asperiores repudiandae nisi
              rem aliquid, dolor quod, harum vitae officiis dicta ratione,
              possimus ipsa debitis nostrum id. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Aliquam distinctio nemo quae dolores
              asperiores repudiandae nisi rem aliquid, dolor quod, harum vitae
              officiis dicta ratione, possimus ipsa debitis nostrum id.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              distinctio nemo quae dolores asperiores repudiandae nisi rem
              aliquid, dolor quod, harum vitae officiis dicta ratione, possimus
              ipsa debitis nostrum id.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              distinctio nemo quae dolores asperiores repudiandae nisi rem
              aliquid, dolor quod, harum vitae officiis dicta ratione, possimus
              ipsa debitis nostrum id.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
