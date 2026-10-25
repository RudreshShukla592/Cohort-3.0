import { CheckCircle2 } from "lucide-react";

export default function StatCard({ label, value, progress }) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-2xl font-bold tracking-tight text-slate-900">
        {value}
      </p>

      <p className="mt-0.5 text-sm text-slate-500">{label}</p>

      {progress !== undefined && (
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-emerald-600"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}