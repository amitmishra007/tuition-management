"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { markHoliday } from "../lib/holidayMutations";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  open: boolean;
  date: string;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => Promise<void> | void;
};

export default function HolidayDialog({
  open,
  date,
  onOpenChange,
  onSuccess,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
  };

  const handleSave = async () => {
    if (!title.trim()) return;

    try {
      setSaving(true);

      await markHoliday(date, title.trim(), description.trim());

      await onSuccess();

      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      alert("Unable to mark holiday.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          resetForm();
        }
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Mark Holiday</DialogTitle>

          <DialogDescription>
            Attendance cannot be marked for this date.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Date</label>

            <Input value={date} disabled />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Holiday Title
            </label>

            <Input
              placeholder="Example: Independence Day"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <Textarea
              rows={4}
              placeholder="Optional"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              resetForm();
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>

          <Button disabled={saving || !title.trim()} onClick={handleSave}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Holiday"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
