"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import HolidayDialog from "./components/HolidayDialog";
import AttendanceActions from "./components/AttendanceActions";
import AttendanceHeader from "./components/AttendanceHeader";
import AttendanceSummary from "./components/AttendanceSummary";
import AttendanceTable from "./components/AttendanceTable";
import type { AttendanceSheetRow } from "./types";
import AttendanceToolbar from "./components/AttendanceToolbar";
import { saveAttendance } from "./lib/attendanceMutations";
import { getAttendanceSheet, type HolidayRow } from "./lib/attendanceService";
import { removeHoliday } from "./lib/holidayMutations";
import { Button } from "@/components/ui/button";
import RemoveHolidayDialog from "./components/RemoveHolidayDialog";

export default function AttendancePage() {
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );
  const [saving, setSaving] = useState(false);
  const [holidayDialogOpen, setHolidayDialogOpen] = useState(false);
  const [rows, setRows] = useState<AttendanceSheetRow[]>([]);
  const [status, setStatus] = useState<"RECORDED" | "NOT_RECORDED" | "HOLIDAY">(
    "NOT_RECORDED",
  );

  const [holiday, setHoliday] = useState<HolidayRow | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [batch, setBatch] = useState("all");

  const [removeHolidayOpen, setRemoveHolidayOpen] = useState(false);
  const [removingHoliday, setRemovingHoliday] = useState(false);

  const handleRemoveHoliday = async () => {
    try {
      setRemovingHoliday(true);

      await removeHoliday(date);

      setRemoveHolidayOpen(false);

      const result = await loadAttendance();

      if (result.status === "HOLIDAY") {
        setHoliday(result.holiday);
        setStatus("HOLIDAY");
        setRows([]);
      } else {
        setHoliday(null);
        setStatus(result.status);
        setRows(result.sheet);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRemovingHoliday(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await saveAttendance(
        date,
        rows.map((row) => ({
          student_id: row.student.id,
          status: row.status,
        })),
      );

      setStatus("RECORDED");
    } catch (error) {
      console.error(error);
      alert("Failed to save attendance.");
    } finally {
      setSaving(false);
    }
  };

  const loadAttendance = useCallback(async () => {
    setError(null);

    return await getAttendanceSheet(date);
  }, [date]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);

      try {
        const result = await loadAttendance();

        if (cancelled) return;

        if (result.status === "HOLIDAY") {
          setStatus("HOLIDAY");
          setHoliday(result.holiday);
          setRows([]);
        } else {
          setHoliday(null);
          setStatus(result.status);
          setRows(result.sheet);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError("Failed to load attendance.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [loadAttendance]);

  const batches = useMemo(() => {
    return [
      ...new Set(
        rows
          .map((row) => row.student.batch)
          .filter(
            (batch): batch is string =>
              typeof batch === "string" && batch.trim().length > 0,
          ),
      ),
    ].sort((a, b) => a.localeCompare(b));
  }, [rows]);

  const summary = useMemo(() => {
    const present = rows.filter((r) => r.status === "Present").length;
    const absent = rows.filter((r) => r.status === "Absent").length;

    return {
      present,
      absent,
      total: rows.length,
    };
  }, [rows]);

  const handleMarkAllPresent = () => {
    setRows((prev) =>
      prev.map((row) => ({
        ...row,
        status: "Present",
      })),
    );
  };

  return (
    <div className="space-y-6">
      <AttendanceHeader />

      <AttendanceToolbar date={date} onDateChange={setDate} />

      <AttendanceSummary
        present={summary.present}
        absent={summary.absent}
        total={summary.total}
        status={status}
      />

      <AttendanceActions
        search={search}
        onSearchChange={setSearch}
        batch={batch}
        onBatchChange={setBatch}
        batches={batches}
        saving={saving}
        isHoliday={status === "HOLIDAY"}
        onMarkAllPresent={handleMarkAllPresent}
        onHoliday={() => setHolidayDialogOpen(true)}
        onSave={handleSave}
      />

      {loading && (
        <div className="rounded-3xl border bg-white p-10 text-center shadow-sm">
          Loading attendance...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && status === "HOLIDAY" && (
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 shadow-sm">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">🎉 Holiday</h2>

            <p>
              <span className="font-semibold">Title:</span> {holiday?.title}
            </p>

            {holiday?.description && (
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {holiday.description}
              </p>
            )}

            <p className="text-sm text-muted-foreground">
              Attendance is disabled for this day.
            </p>

            <div className="pt-2">
              <Button
                variant="destructive"
                onClick={() => setRemoveHolidayOpen(true)}
                disabled={loading}
              >
                Remove Holiday
              </Button>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && status !== "HOLIDAY" && rows.length > 0 && (
        <AttendanceTable
          rows={rows}
          search={search}
          batch={batch}
          onRowsChange={setRows}
        />
      )}
      <HolidayDialog
        open={holidayDialogOpen}
        date={date}
        onOpenChange={setHolidayDialogOpen}
        onSuccess={async () => {
          const result = await loadAttendance();

          if (result.status === "HOLIDAY") {
            setStatus("HOLIDAY");
            setHoliday(result.holiday);
            setRows([]);
          } else {
            setHoliday(null);
            setStatus(result.status);
            setRows(result.sheet);
          }
        }}
      />
      <RemoveHolidayDialog
        open={removeHolidayOpen}
        onOpenChange={setRemoveHolidayOpen}
        loading={removingHoliday}
        onConfirm={handleRemoveHoliday}
      />
    </div>
  );
}
