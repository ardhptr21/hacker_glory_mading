import Badge from '@/components/ui/Badge';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { Bookmark, Clock, Siren, UserCircle } from '@phosphor-icons/react';
import clsx from 'clsx';
import toast from 'react-hot-toast';

export default function MagazineCard({
  magazine,
  className,
  unbookmark = null,
  isPreview = false,
}) {
  const { errors, flash, user } = usePage().props;
  const { post, delete: destroy } = useForm({ magazine_id: magazine.id });

  const handleMove = (e) => {
    e.preventDefault();

    if (isPreview) return;
    if (e.target.dataset.ignore || e.target.parentElement.dataset.ignore) {
      return;
    }
    router.visit(`/mading/${magazine.slug}`);
  };

  const handleBookmark = () => {
    if (isPreview) return;

    post(route('bookmark.store'), {
      preserveScroll: true,
      onSuccess: () => toast.success(flash.success),
      onError: () => toast.error(errors.bookmark || flash.error),
    });
  };

  const handleUnbookmark = () => {
    destroy(route('bookmark.destroy', unbookmark), {
      preserveScroll: true,
      onSuccess: () => toast.success(flash.success),
      onError: () => toast.error(errors.bookmark || flash.error),
    });
  };

  return (
    <article
      onClick={handleMove}
      className={clsx([
        'p-8 space-y-10 border-black border flex-1 flex-shrink-0 bg-white hover:bg-yellow-50 transition duration-300 cursor-pointer rounded-lg',
        { [className]: className },
      ])}
    >
      <div className="flex items-center justify-between">
        <p className="inline-flex items-center gap-2 text-sm">
          <Clock size={18} weight="bold" />
          {magazine.published_at}
        </p>
        {magazine.category?.slug ? (
          <Link href={`/categories/${magazine.category.slug}`} data-ignore>
            <Badge text={magazine.category?.name} />
          </Link>
        ) : (
          <Badge text={magazine.category?.name} />
        )}
      </div>
      <div className="overflow-hidden rounded-lg aspect-video">
        <img
          className="object-cover w-full h-full"
          src={magazine.thumbnail}
          alt={magazine.title}
        />
      </div>
      <div className="space-y-4">
        {!!magazine.important && (
          <div className="inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold text-white bg-orange-700 rounded-lg">
            <Siren weight="bold" size={18} /> <span>Penting</span>
          </div>
        )}
        <h3 className="text-2xl font-bold">{magazine.title}</h3>
        <p className="leading-relaxed tracking-wide">{magazine.description}</p>
      </div>
      <div className="flex items-center justify-between">
        {isPreview ? (
          <p data-ignore className="inline-flex items-center gap-2">
            <UserCircle size={20} weight="bold" /> @{magazine.author.username}
          </p>
        ) : (
          <Link
            href={route('author.view', magazine.author.username)}
            data-ignore
            className="inline-flex items-center gap-2"
          >
            <UserCircle size={20} weight="bold" /> @{magazine.author.username}
          </Link>
        )}
        {!isPreview && user?.role === 'siswa' && (
          <button
            data-ignore
            className="transition group"
            onClick={!!unbookmark ? handleUnbookmark : handleBookmark}
          >
            <Bookmark
              size={28}
              weight={!!unbookmark ? 'fill' : 'regular'}
              className={clsx([
                'duration-150 pointer-events-none',
                {
                  'group-hover:text-orange-700': !unbookmark,
                  'text-orange-700': !!unbookmark,
                },
              ])}
            />
          </button>
        )}
      </div>
    </article>
  );
}
