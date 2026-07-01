"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit" | "view";
}

export default function StudentDialog({
  open,
  onOpenChange,
  mode,
}: StudentDialogProps) {
  const title =
    mode === "add"
      ? "Add New Student"
      : mode === "edit"
        ? "Edit Student"
        : "Student Details";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="mt-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic</TabsTrigger>

            <TabsTrigger value="parent">Parent</TabsTrigger>

            <TabsTrigger value="academic">Academic</TabsTrigger>

            <TabsTrigger value="fee">Fee</TabsTrigger>

            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <div className="rounded-lg border p-8 text-center text-muted-foreground">
              Basic Information
            </div>
          </TabsContent>

          <TabsContent value="parent">
            <div className="rounded-lg border p-8 text-center text-muted-foreground">
              Parent Information
            </div>
          </TabsContent>

          <TabsContent value="academic">
            <div className="rounded-lg border p-8 text-center text-muted-foreground">
              Academic Information
            </div>
          </TabsContent>

          <TabsContent value="fee">
            <div className="rounded-lg border p-8 text-center text-muted-foreground">
              Fee Information
            </div>
          </TabsContent>

          <TabsContent value="other">
            <div className="rounded-lg border p-8 text-center text-muted-foreground">
              Other Information
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          {mode !== "view" && (
            <Button>
              {mode === "add" ? "Save Student" : "Update Student"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
