import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/form/Input';
import { SortDescending } from '@phosphor-icons/react';
import clsx from 'clsx';

export default function Filter({ categoryTitle = 'CATEGORIES', className }) {
  return (
    <section className={clsx(['space-y-8', { [className]: className }])}>
      <div className="flex items-center justify-between">
        <p className="font-bold">{categoryTitle}</p>
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
  );
}
