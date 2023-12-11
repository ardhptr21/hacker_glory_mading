import DashboardLayout from '@/components/layouts/DashboardLayout';
import OverviewCard from '@/components/ui/card/OverviewCard';
import { Article, Eye, Hourglass, Users } from '@phosphor-icons/react';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold">Dashboard</h1>

      <section className="relative flex items-center justify-between py-20 mt-10 space-y-2 shadow-sm px-36 bg-yellow-50 rounded-xl">
        <div>
          <h3 className="text-2xl font-bold">Selamat datang Ardhi 👋</h3>
          <p>
            Ayo mulai kelola setiap hal yang ada, dan jangan lupa untuk selalu
            jaga kesehatan!
          </p>
        </div>
        <div className="absolute bottom-0 right-36">
          <img
            src="/illustrations/absurd-paint.png"
            className="object-cover"
            width={300}
            alt="Painting Manage"
            data-credit="https://absurd.design/"
          />
        </div>
      </section>

      <section className="grid grid-cols-4 gap-5 mt-10">
        <OverviewCard title="Total Pengunjung" icon={Eye} value={1039} />
        <OverviewCard title="Total Majalah" icon={Article} value={18} />
        <OverviewCard
          title="Total Majalah Pending"
          icon={Hourglass}
          value={2}
        />
        <OverviewCard title="Total Users" icon={Users} value={201} />
      </section>
    </DashboardLayout>
  );
}
