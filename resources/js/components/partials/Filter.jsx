import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/form/Input';
import { Link, router, usePage } from '@inertiajs/react';
import { SortAscending, SortDescending } from '@phosphor-icons/react';
import clsx from 'clsx';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Filter({
  className,
  withCategory = true,
  categoryInParam = false,
  categoryTitle = 'CATEGORIES',
}) {
  const {
    url,
    props: { provide_categories },
  } = usePage();

  const queryParams = new URLSearchParams(url.split('?')[1]);
  const [q, setQ] = useState(queryParams.get('q') || '');
  const [sort, setSort] = useState(queryParams.get('sort') || 'desc');

  const handleSearch = useDebouncedCallback(() => {
    if (!q) {
      queryParams.delete('q');
    } else {
      queryParams.set('q', q);
    }
    router.visit(`?${queryParams.toString()}`, {
      preserveScroll: true,
    });
  }, 500);

  const handleSearchChange = (e) => {
    setQ(e.target.value);
    handleSearch();
  };

  const handleToggleOrder = () => {
    if (sort === 'desc') {
      setSort('asc');
      queryParams.set('sort', 'asc');
    } else {
      setSort('desc');
      queryParams.set('sort', 'desc');
    }
    router.visit(`?${queryParams.toString()}`, {
      preserveScroll: true,
    });
  };

  const handleCategoryParam = (category_id) => {
    if (categoryInParam) {
      if (queryParams.get('category') === category_id.toString()) {
        queryParams.delete('category');
      } else {
        queryParams.set('category', category_id);
      }
    }
    router.visit(`?${queryParams.toString()}`, {
      preserveScroll: true,
    });
  };

  return (
    <section className={clsx(['space-y-8', { [className]: className }])}>
      {withCategory && (
        <div className="flex items-center justify-between">
          <p className="font-bold">{categoryTitle}</p>
          <div className="flex items-center justify-center gap-2">
            {provide_categories.map((category) =>
              categoryInParam ? (
                <Badge
                  className={clsx([
                    'cursor-pointer',
                    {
                      'text-orange-700 border-orange-700':
                        queryParams.get('category') === category.id.toString(),
                    },
                  ])}
                  onClick={() => handleCategoryParam(category.id)}
                  text={category.name}
                  key={category.slug}
                />
              ) : (
                <Link
                  href={route('category.view', category.slug)}
                  key={category.slug}
                >
                  <Badge text={category.name} key={category.slug} />
                </Link>
              )
            )}
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <Input
          type="search"
          placeholder="Search"
          className="border border-l border-black w-[500px]"
          value={q}
          onChange={handleSearchChange}
        />
        <div>
          <Button onClick={handleToggleOrder}>
            {sort === 'desc' && (
              <>
                Terbaru <SortDescending size={20} />
              </>
            )}
            {sort === 'asc' && (
              <>
                Terlama <SortAscending size={20} />
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
