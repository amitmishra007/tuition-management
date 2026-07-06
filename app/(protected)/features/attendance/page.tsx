"use client";

import { useEffect, useState } from "react";
import { getAttendanceSheet } from "./lib/attendanceService";
import AttendanceTable from "./components/AttendanceTable";
import type { DayData } from "./lib/attendanceService";

export default function AttendancePage() {
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );

  const [data, setData] = useState<DayData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setLoading(true);

      try {
        const res = await getAttendanceSheet(date);

        if (!ignore) {
          setData(res);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [date]);

  return (
    <div className="p-6 space-y-4">
      {/* DATE PICKER */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* HOLIDAY */}
      {!loading && data?.status === "HOLIDAY" && (
        <h2>🎉 Holiday: {data.holiday.title}</h2>
      )}

      {/* ATTENDANCE TABLE */}
      {!loading &&
        data?.status !== "HOLIDAY" &&
        data?.status === "RECORDED" && (
          <AttendanceTable
            date={date}
            data={data.sheet}
            onRefresh={() => setDate((d) => d)}
          />
        )}
    </div>
  );
}
