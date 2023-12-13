import Button from '@/components/ui/Button';
import Input from '@/components/ui/form/Input';
import Select from '@/components/ui/form/Select';
import { router, usePage } from '@inertiajs/react';
import { SortAscending, SortDescending } from '@phosphor-icons/react';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function FilterDashboard({ filters }) {
  const { url } = usePage();
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

  return (
    <div className="flex items-center gap-5">
      <Input
        placeholder="Search"
        type="search"
        onChange={handleSearchChange}
        value={q}
      />
      {filters?.length > 0 &&
        filters.map((filter) => (
          <Select
            key={filter.key}
            className="w-[200px]"
            value={queryParams.get(filter.key) || ''}
            placeholder={filter.label}
            options={filter.options}
            onChange={(e) => {
              if (!e.target.value) {
                queryParams.delete(filter.key);
              } else {
                queryParams.set(filter.key, e.target.value);
              }
              router.visit(`?${queryParams.toString()}`, {
                preserveScroll: true,
              });
            }}
          >
            <option value="" disabled hidden>
              {filter.label}
            </option>
            <option value="">Semua</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        ))}
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
  );
}
