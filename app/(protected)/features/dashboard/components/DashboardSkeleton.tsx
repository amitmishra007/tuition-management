"use client";

import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <Skeleton width={180} height={32} />
        <div className="mt-2">
          <Skeleton width={240} height={18} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border bg-white p-4 shadow-sm">
            <Skeleton circle width={42} height={42} />
            <div className="mt-4">
              <Skeleton height={18} />
            </div>
          </div>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border bg-white p-5 shadow-sm">
            <Skeleton width={110} height={18} />

            <div className="mt-4">
              <Skeleton width={90} height={34} />
            </div>

            <div className="mt-4">
              <Skeleton height={10} />
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <Skeleton width={170} height={22} />

        <div className="mt-6">
          <Skeleton height={260} />
        </div>
      </div>

      {/* Recent Students */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <Skeleton width={180} height={22} />

        <div className="mt-5 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton circle width={50} height={50} />

              <div className="flex-1">
                <Skeleton width="60%" height={18} />

                <div className="mt-2">
                  <Skeleton width="35%" height={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
