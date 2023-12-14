export default function OverviewCard({ title, icon: Icon, value }) {
  return (
    <div className="flex items-center justify-center gap-5 px-16 py-10 bg-white shadow-sm rounded-xl">
      <div className="p-5 rounded-full bg-yellow-50">
        <Icon size={48} />
      </div>
      <div className="space-y-2">
        <h4 className="text-4xl font-bold">{value}</h4>
        <p>{title}</p>
      </div>
    </div>
  );
}
