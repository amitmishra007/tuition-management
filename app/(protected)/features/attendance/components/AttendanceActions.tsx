"use client";

import {
  CalendarPlus,
  CheckCircle2,
  Loader2,
  Save,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { startTransition } from "react";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;

  batch: string;
  onBatchChange: (value: string) => void;

  batches: string[];

  saving: boolean;
  hasChanges: boolean;
  isHoliday: boolean;

  onMarkAllPresent: () => void;
  onHoliday: () => void;
  onSave: () => void;
};

export default function AttendanceActions({
  search,
  onSearchChange,
  batch,
  onBatchChange,
  batches,
  saving,
  hasChanges,
  isHoliday,
  onMarkAllPresent,
  onHoliday,
  onSave,
}: Props) {
  const disabled = saving || isHoliday;

  const [activeAction, setActiveAction] = useState<
    "present" | "holiday" | "save" | null
  >(null);

  const runAction = (
    action: "present" | "holiday" | "save",
    callback: () => void,
  ) => {
    setActiveAction(action);

    startTransition(() => {
      callback();

      // allow parent state/navigation to begin
      setTimeout(() => setActiveAction(null), 500);
    });
  };

  return (
    <div
      className={`rounded-3xl border bg-white p-6 shadow-sm transition-all duration-200 ${
        activeAction ? "pointer-events-none opacity-60" : ""
      }`}
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        {/* Filters */}
        <div className="flex flex-1 flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              placeholder="Search by name or admission number..."
              onChange={(e) => onSearchChange(e.target.value)}
              className="cursor-text pl-10"
            />
          </div>

          <Select value={batch} onValueChange={onBatchChange}>
            <SelectTrigger className="w-full cursor-pointer md:w-56">
              <SelectValue placeholder="All Batches" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Batches</SelectItem>

              {batches.map((batchName) => (
                <SelectItem key={batchName} value={batchName}>
                  {batchName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={disabled || activeAction !== null}
            className="cursor-pointer"
            onClick={() => runAction("present", onMarkAllPresent)}
          >
            <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
            Mark All Present
          </Button>

          <Button
            type="button"
            variant="outline"
            disabled={saving || isHoliday || activeAction !== null}
            className="cursor-pointer"
            onClick={() => runAction("holiday", onHoliday)}
          >
            <CalendarPlus className="mr-2 h-4 w-4" />
            Mark Holiday
          </Button>

          <Button
            type="button"
            disabled={
              disabled ||
              activeAction !== null ||
              (!hasChanges && status !== "NOT_RECORDED")
            }
            className="cursor-pointer"
            onClick={() => runAction("save", onSave)}
          >
            {saving || activeAction === "save" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Attendance
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
