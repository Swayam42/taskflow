import Card from "./Card.jsx";

export default function StatCard({ icon: Icon, label, value }) {
  return (
    <Card className="p-5 transition duration-150 hover:border-neutral-300 hover:bg-neutral-50">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-neutral-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-neutral-950">{value}</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-950">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </Card>
  );
}
