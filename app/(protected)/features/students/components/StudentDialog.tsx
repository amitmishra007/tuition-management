"use client";

import { useMemo, useState } from "react";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";

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
  const [dob, setDob] = useState<Date>();
  const [joiningDate, setJoiningDate] = useState<Date>();

  const title = useMemo(() => {
    if (mode === "add") return "Add Student";
    if (mode === "edit") return "Edit Student";
    return "Student Details";
  }, [mode]);

  const readOnly = mode === "view";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="mt-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic</TabsTrigger>

            <TabsTrigger value="parent">Parent</TabsTrigger>

            <TabsTrigger value="academic">Academic</TabsTrigger>

            <TabsTrigger value="fee">Fee</TabsTrigger>

            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>

          {/* ================= BASIC ================= */}

          <TabsContent value="basic" className="mt-6">
            <div className="space-y-8">
              {/* Profile */}

              <div className="flex justify-center">
                <div className="flex h-36 w-36 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-slate-50 transition hover:bg-slate-100">
                  <Upload className="h-8 w-8 text-gray-400" />

                  <span className="mt-2 text-sm text-gray-500">
                    Upload Photo
                  </span>
                </div>
              </div>

              {/* Grid */}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* First Name */}

                <div className="space-y-2">
                  <Label>First Name</Label>

                  <Input placeholder="Rahul" disabled={readOnly} />
                </div>

                {/* Last Name */}

                <div className="space-y-2">
                  <Label>Last Name</Label>

                  <Input placeholder="Sharma" disabled={readOnly} />
                </div>

                {/* Admission */}

                <div className="space-y-2">
                  <Label>Admission No.</Label>

                  <Input placeholder="ADM001" disabled={readOnly} />
                </div>

                {/* Gender */}

                <div className="space-y-2">
                  <Label>Gender</Label>

                  <RadioGroup
                    defaultValue="Male"
                    disabled={readOnly}
                    className="flex gap-6 pt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Male" id="male" />

                      <Label htmlFor="male">Male</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Female" id="female" />

                      <Label htmlFor="female">Female</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Other" id="other" />

                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* DOB */}

                <div className="space-y-2">
                  <Label>Date of Birth</Label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={readOnly}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dob && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />

                        {dob ? format(dob, "PPP") : "Select Date"}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dob}
                        onSelect={setDob}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Joining */}

                <div className="space-y-2">
                  <Label>Joining Date</Label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={readOnly}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !joiningDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />

                        {joiningDate
                          ? format(joiningDate, "PPP")
                          : "Select Date"}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={joiningDate}
                        onSelect={setJoiningDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Remaining tabs in Part 2 */}

          <TabsContent value="parent">
            <div className="py-12 text-center text-muted-foreground">
              Parent Information
            </div>
          </TabsContent>

          <TabsContent value="academic">
            <div className="py-12 text-center text-muted-foreground">
              Academic Information
            </div>
          </TabsContent>

          <TabsContent value="fee">
            <div className="py-12 text-center text-muted-foreground">
              Fee Information
            </div>
          </TabsContent>

          <TabsContent value="other">
            <div className="py-12 text-center text-muted-foreground">
              Other Information
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
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
