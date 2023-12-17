import DashboardLayout from '@/components/layouts/DashboardLayout';
import OverviewCard from '@/components/ui/card/OverviewCard';
import Select from '@/components/ui/form/Select';
import { router, usePage } from '@inertiajs/react';
import { Article, Eye, Hourglass, Users } from '@phosphor-icons/react';
import {
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

export default function Dashboard({ user, analytics }) {
  const { url } = usePage();
  const queryParams = new URLSearchParams(url.split('?')[1]);

  const handleChange = (e) => {
    const { value } = e.target;
    queryParams.set('range', value);
    router.visit(`?${queryParams.toString()}`, { preserveScroll: true });
  };

  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold">Dashboard</h1>

      <section className="relative flex items-center justify-between py-20 mt-10 space-y-2 shadow-sm px-36 bg-yellow-50 rounded-xl">
        <div>
          <h3 className="text-2xl ">
            <span className="font-semibold">Selamat datang</span>{' '}
            <span className="font-bold">{user.name}</span> 👋
          </h3>
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

      <section className="grid grid-flow-col gap-5 mt-10">
        <OverviewCard
          title="Total Mading"
          icon={Article}
          value={analytics.total_magazines}
        />
        <OverviewCard
          title="Total Mading Pending"
          icon={Hourglass}
          value={analytics.total_pending_magazines}
        />
        {user.role === 'admin' && (
          <OverviewCard
            title="Total Users"
            icon={Users}
            value={analytics.total_users}
          />
        )}
      </section>
      <section className="box-border flex items-start max-w-full gap-5 mt-5">
        <div className="w-full p-20 bg-white shadow rounded-xl">
          <Line
            className="w-full"
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
              plugins: {
                title: {
                  display: true,
                },
              },
            }}
            data={{
              labels: analytics.analytics_data.map((data) => data.display_date),
              datasets: [
                {
                  label: 'Pengunjung',
                  data: analytics.analytics_data.map((data) => data.views),
                  fill: false,
                  backgroundColor: '#000',
                  borderColor: '#C2410C',
                  tension: 0.3,
                  hoverOffset: 4,
                },
              ],
            }}
          />
        </div>
        <div className="space-y-5">
          <Select
            value={queryParams.get('range') || '7d'}
            onChange={handleChange}
          >
            <option value="today">Hari ini</option>
            <option value="yesterday">Kemarin</option>
            <option value="7d">7 hari terakhir</option>
            <option value="14d">14 hari terakhir</option>
            <option value="1m">1 bulan terakhir</option>
            <option value="3m">3 bulan terakhir</option>
            <option value="6m">6 bulan terakhir</option>
            <option value="1y">1 tahun terakhir</option>
          </Select>
          <OverviewCard
            title="Total Pengunjung"
            icon={Eye}
            value={analytics.total_views}
          />
        </div>
      </section>
    </DashboardLayout>
  );
}
