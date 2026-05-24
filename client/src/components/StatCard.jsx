import Card from "./Card.jsx";

export default function StatCard({ icon: Icon, label, value }) {
  return (
    <Card className="p-5 transition duration-150 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_24px_rgba(15,23,42,0.1)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-neutral-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-neutral-950">{value}</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/70 bg-white/80 text-neutral-950 shadow-sm">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </Card>
  );
}
