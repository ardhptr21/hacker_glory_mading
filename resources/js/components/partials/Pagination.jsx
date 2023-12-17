import Button from '@/components/ui/Button';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import clsx from 'clsx';

export default function Pagination({
  className,
  total,
  from,
  to,
  links,
  prevPageUrl,
  nextPageUrl,
  withInfo = true,
}) {
  return (
    <div
      className={clsx([
        'flex items-center justify-between',
        { [className]: className },
      ])}
    >
      {withInfo && (
        <div>
          <p>
            Menampilkan <span className="font-semibold">{from}</span> sampai{' '}
            <span className="font-semibold">{to}</span> dari{' '}
            <span className="font-semibold">{total}</span> data.
          </p>
        </div>
      )}
      <div className="flex gap-3">
        {prevPageUrl && (
          <Button
            as={Link}
            href={prevPageUrl}
            size="box"
            variant="outline"
            className="w-10 h-10"
          >
            <ArrowLeft />
          </Button>
        )}
        {links.length > 3 &&
          links.slice(1, -1).map((link) => (
            <Button
              as={Link}
              key={link.label}
              href={link.url}
              size="box"
              variant={link.active ? 'default' : 'outline'}
              className="w-10 h-10"
            >
              {link.label}
            </Button>
          ))}
        {nextPageUrl && (
          <Button
            as={Link}
            href={nextPageUrl}
            size="box"
            variant="outline"
            className="w-10 h-10"
          >
            <ArrowRight />
          </Button>
        )}
      </div>
    </div>
  );
}
