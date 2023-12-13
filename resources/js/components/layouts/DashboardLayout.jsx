import Sidebar from '../partials/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 h-screen p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
