export default function DashboardLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-sky-100 bg-white px-10 py-8 shadow-lg">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-sky-100" />

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-sky-600 border-r-indigo-500" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 animate-pulse rounded-full bg-sky-500" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-slate-700">
            Loading Student ERP
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Fetching records securely...
          </p>
        </div>

        <div className="h-2 w-48 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/2 animate-pulse bg-linear-to-r from-sky-300 via-indigo-300 to-sky-300" />
        </div>
      </div>
    </div>
  );
}
