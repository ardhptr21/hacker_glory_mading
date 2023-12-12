import { Clock } from '@phosphor-icons/react';
import clsx from 'clsx';
import Badge from '../Badge';
import { Link, router } from '@inertiajs/react';

export default function MagazineCard({
  published_at,
  title,
  excerpt,
  image,
  category,
  author,
  slug,
  category_slug,
  className,
}) {
  const handleMove = (e) => {
    e.preventDefault();

    if (e.target.tagName !== 'A' && e.target.parentElement.tagName !== 'A') {
      router.visit(`/mading/${slug}`);
    }
  };
  return (
    <article
      onClick={handleMove}
      className={clsx([
        'p-10 space-y-10 border-black border flex-1 flex-shrink-0 bg-white hover:bg-yellow-50 transition duration-300 cursor-pointer rounded-lg',
        { [className]: className },
      ])}
    >
      <div className="flex items-center justify-between">
        <p className="inline-flex items-center gap-1 text-sm">
          <Clock size={18} />
          {published_at}
        </p>
        {category_slug ? (
          <Link href={`/categories/${category_slug}`}>
            <Badge text={category} />
          </Link>
        ) : (
          <Badge text={category} />
        )}
      </div>
      <div className="overflow-hidden aspect-square">
        <img className="object-cover w-full h-full" src={image} alt={title} />
      </div>
      <div className="space-y-4">
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="leading-relaxed tracking-wide">{excerpt}</p>
      </div>
      <div>
        <p>
          <span className="font-bold">Author</span> {author}
        </p>
      </div>
    </article>
  );
}
