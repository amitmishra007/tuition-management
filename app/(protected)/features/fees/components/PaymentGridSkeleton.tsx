"use client";

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-xl
        bg-slate-200/80
        animate-pulse
        ${className}
      `}
    >
      <div
        className="
          absolute
          inset-0
          -translate-x-full
          animate-[shimmer_2s_infinite]
          bg-linear-to-r
          from-transparent
          via-white/60
          to-transparent
        "
      />
    </div>
  );
}

function AnalyticsSkeletonCard() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <Skeleton className="h-5 w-28" />

      <Skeleton className="mt-5 h-10 w-20 rounded-2xl" />

      <Skeleton className="mt-4 h-3 w-36" />
    </div>
  );
}

function PaymentCardSkeleton() {
  return (
    <div
      className="
        overflow-hidden
        rounded-[30px]
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* Header */}

      <div className="p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-2xl" />

          <div className="flex-1 space-y-3">
            <Skeleton className="h-5 w-40" />

            <Skeleton className="h-4 w-28" />

            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Stats */}

        <div className="mt-6 grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="
                rounded-2xl
                border
                border-slate-100
                p-3
              "
            >
              <Skeleton className="h-3 w-14" />

              <Skeleton className="mt-3 h-5 w-20" />
            </div>
          ))}
        </div>

        {/* Timeline */}

        <div className="mt-6 flex gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton
              key={i}
              className="
                h-10
                flex-1
                rounded-xl
              "
            />
          ))}
        </div>

        {/* Buttons */}

        <div className="mt-6 flex gap-3">
          <Skeleton className="h-12 flex-1 rounded-2xl" />

          <Skeleton className="h-12 flex-1 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export default function PaymentGridSkeleton() {
  return (
    <div className="space-y-6">
      {/* Analytics */}

      <div
        className="
          grid
          gap-5
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <AnalyticsSkeletonCard key={i} />
        ))}
      </div>

      {/* Search */}

      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
        "
      >
        <Skeleton className="h-12 w-full rounded-2xl" />
      </div>

      {/* Cards */}

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <PaymentCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
