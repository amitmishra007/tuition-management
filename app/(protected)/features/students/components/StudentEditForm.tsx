"use client";
import Link from "next/link";
import Image from "next/image";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  ArrowLeft,
  Camera,
  Save,
  X,
  User,
  UserRound,
  Venus,
  Mars,
  BadgeCheck,
} from "lucide-react";

import type { Student } from "../types/student";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createStudent, updateStudent } from "../action";
import { uploadToCloudinary } from "../lib/uploadToCloudinary";
import BackButton from "./BackButton";

interface Props {
  student: Student;
  mode?: "create" | "edit";
}

export default function StudentEditForm({ student, mode = "edit" }: Props) {
  const [profileUrl, setProfileUrl] = useState(student.profilePhoto ?? "");

  const [profilePreview, setProfilePreview] = useState(
    student.profilePhoto ?? "/images/default-avatar.png",
  );
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, control } = useForm<Student>({
    defaultValues: student,
  });

  const firstName = useWatch({
    control,
    name: "firstName",
  });

  const lastName = useWatch({
    control,
    name: "lastName",
  });

  const status = useWatch({
    control,
    name: "status",
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: Student) => {
    setLoading(true);

    try {
      const finalData = {
        ...values,
        profilePhoto: profileUrl,
      };

      if (mode === "edit") {
        await updateStudent(student.id, finalData);
      } else {
        const newStudent = {
          admissionNo: finalData.admissionNo,
          firstName: finalData.firstName,
          lastName: finalData.lastName,
          gender: finalData.gender,
          dob: finalData.dob,
          joiningDate: finalData.joiningDate,
          fatherName: finalData.fatherName,
          motherName: finalData.motherName,
          phone: finalData.phone,
          alternatePhone: finalData.alternatePhone,
          email: finalData.email,
          address: finalData.address,
          city: finalData.city,
          state: finalData.state,
          pincode: finalData.pincode,
          school: finalData.school,
          studentClass: finalData.studentClass,
          batch: finalData.batch,
          monthlyFee: finalData.monthlyFee,
          feeStatus: finalData.feeStatus,
          lastFeePaid: finalData.lastFeePaid,
          nextDueDate: finalData.nextDueDate,
          profilePhoto: finalData.profilePhoto,
          remarks: finalData.remarks,
          status: finalData.status,
        };

        await createStudent(newStudent);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      setUploading(true);

      // instant preview
      setProfilePreview(URL.createObjectURL(file));

      // upload to cloudinary
      const url = await uploadToCloudinary(file);

      // store final URL
      setProfileUrl(url);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxSize: 2 * 1024 * 1024,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 rounded-3xl border bg-white p-6 shadow-md lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <BackButton />
          <Link href="/">
            <Button variant="default" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>

          <h1 className="text-3xl font-bold">
            {mode === "edit" ? "Edit Student" : "Add Student"}
          </h1>

          <p className="text-muted-foreground">
            {mode === "edit"
              ? "Update student information."
              : "Fill in the student's information."}
          </p>
        </div>

        <div className="flex gap-3">
          <Link href={`/students/${student.id}`}>
            <Button variant="outline">
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </Link>

          <Button type="submit" size="lg" disabled={loading || uploading}>
            {uploading || loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {uploading
              ? "Uploading Photo..."
              : loading
                ? mode === "edit"
                  ? "Saving..."
                  : "Adding..."
                : mode === "edit"
                  ? "Save Changes"
                  : "Add Student"}
          </Button>
        </div>
      </div>
      {/* Profile */}
      <Card className="rounded-3xl">
        <CardContent className="flex flex-col items-center gap-6 p-8 md:flex-row">
          <div className="flex flex-col items-center gap-3">
            <div
              {...getRootProps()}
              className={`group relative cursor-pointer overflow-hidden rounded-full border-4 transition-all ${
                uploading
                  ? "pointer-events-none opacity-70"
                  : isDragActive
                    ? "border-primary ring-4 ring-primary/20"
                    : "border-slate-200 hover:border-primary"
              }`}
            >
              <input {...getInputProps()} />

              <Image
                src={profilePreview}
                alt={firstName}
                width={130}
                height={130}
                className="h-32.5 w-32.5 object-cover transition duration-300 group-hover:scale-105"
              />
              {uploading && (
                <div
                  className="
      absolute inset-0
      flex flex-col items-center justify-center
      bg-black/60
      backdrop-blur-sm
      text-white
    "
                >
                  <Loader2 className="mb-3 h-8 w-8 animate-spin" />

                  <p className="text-sm font-semibold">Uploading Photo...</p>

                  <p className="mt-1 px-4 text-center text-xs text-white/80">
                    Please wait a few seconds
                  </p>
                </div>
              )}

              {!uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                  <Camera className="h-7 w-7 text-white" />
                </div>
              )}
            </div>

            <p className="text-center text-xs text-muted-foreground">
              {uploading ? (
                <>
                  Uploading image...
                  <br />
                  Please wait.
                </>
              ) : (
                <>
                  Click or drag a photo here
                  <br />
                  JPG • PNG • WEBP (Max 2 MB)
                </>
              )}
            </p>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold">
              {firstName} {lastName}
            </h2>

            <p className="mt-1 text-muted-foreground">
              Admission No. {student.admissionNo}
            </p>

            <Badge
              className={
                status === "Active"
                  ? "mt-4 bg-green-100 text-green-700"
                  : "mt-4 bg-red-100 text-red-700"
              }
            >
              {status}
            </Badge>
          </div>
        </CardContent>
      </Card>
      {/* Personal Details */}
      {/* Personal Details */}
      <Card className="rounded-3xl border-blue-200">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-8 flex items-center gap-2 border-b border-blue-100 pb-4 text-xl font-bold text-blue-700">
            <User className="h-5 w-5" />
            Personal Details
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="min-w-0">
              <Label>First Name</Label>
              <Input {...register("firstName")} className="mt-2 w-full" />
            </div>

            <div className="min-w-0">
              <Label>Last Name</Label>
              <Input {...register("lastName")} className="mt-2 w-full" />
            </div>

            <div className="min-w-0">
              <Label className="mb-3 flex items-center gap-2">
                <UserRound className="h-4 w-4 text-blue-600" />
                Gender
              </Label>

              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="Male" id="male" />
                      <Label
                        htmlFor="male"
                        className="flex cursor-pointer items-center gap-1"
                      >
                        <Mars className="h-4 w-4 text-blue-600" />
                        Male
                      </Label>
                    </div>

                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="Female" id="female" />
                      <Label
                        htmlFor="female"
                        className="flex cursor-pointer items-center gap-1"
                      >
                        <Venus className="h-4 w-4 text-pink-600" />
                        Female
                      </Label>
                    </div>

                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="Other" id="other" />
                      <Label htmlFor="other" className="cursor-pointer">
                        Other
                      </Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>

            <div className="min-w-0">
              <Label>Status</Label>

              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="mt-2 w-full">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="min-w-0">
              <Label>Date of Birth</Label>

              <Controller
                control={control}
                name="dob"
                render={({ field }) => (
                  <Input
                    type="date"
                    value={field.value ? field.value.slice(0, 10) : ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="mt-2 w-full"
                  />
                )}
              />
            </div>

            <div className="min-w-0">
              <Label>Joining Date</Label>

              <Controller
                control={control}
                name="joiningDate"
                render={({ field }) => (
                  <Input
                    type="date"
                    value={field.value ? field.value.slice(0, 10) : ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="mt-2 w-full"
                  />
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Parent Details */}
      <Card className="rounded-3xl border-purple-200">
        <CardContent className="p-8">
          <h2 className="mb-8 flex items-center gap-2 border-b border-purple-100 pb-4 text-xl font-bold text-purple-700">
            <UserRound className="h-5 w-5" />
            Parent Details
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label>Father&apos;s Name</Label>
              <Input className="mt-2" {...register("fatherName")} />
            </div>

            <div>
              <Label>Mother&apos;s Name</Label>
              <Input className="mt-2" {...register("motherName")} />
            </div>

            <div>
              <Label>Phone Number</Label>
              <Input type="tel" className="mt-2" {...register("phone")} />
            </div>

            <div>
              <Label>Alternate Phone</Label>
              <Input
                type="tel"
                className="mt-2"
                {...register("alternatePhone")}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Email Address</Label>
              <Input type="email" className="mt-2" {...register("email")} />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Academic Details */}
      <Card className="rounded-3xl border-indigo-200">
        <CardContent className="p-8">
          <h2 className="mb-8 flex items-center gap-2 border-b border-indigo-100 pb-4 text-xl font-bold text-indigo-700">
            <BadgeCheck className="h-5 w-5" />
            Academic Details
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label>Admission Number</Label>
              <Input className="mt-2" {...register("admissionNo")} />
            </div>

            <div>
              <Label>Class</Label>
              <Input className="mt-2" {...register("studentClass")} />
            </div>

            <div className="md:col-span-2">
              <Label>School Name</Label>
              <Input className="mt-2" {...register("school")} />
            </div>

            <div className="md:col-span-2">
              <Label>Batch</Label>

              <Controller
                control={control}
                name="batch"
                render={({ field }) => (
                  <Select
                    value={field.value ?? undefined}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Morning (7 AM - 9 AM)">
                        Morning (7 AM - 9 AM)
                      </SelectItem>

                      <SelectItem value="Morning (9 AM - 11 AM)">
                        Morning (9 AM - 11 AM)
                      </SelectItem>

                      <SelectItem value="Afternoon (2 PM - 4 PM)">
                        Afternoon (2 PM - 4 PM)
                      </SelectItem>

                      <SelectItem value="Evening (5 PM - 7 PM)">
                        Evening (5 PM - 7 PM)
                      </SelectItem>

                      <SelectItem value="Evening (6 PM - 8 PM)">
                        Evening (6 PM - 8 PM)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Fee Details */}
      <Card className="rounded-3xl border-emerald-200">
        <CardContent className="p-8">
          <h2 className="mb-8 flex items-center gap-2 border-b border-emerald-100 pb-4 text-xl font-bold text-emerald-700">
            <BadgeCheck className="h-5 w-5" />
            Fee Details
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label>Monthly Fee (₹)</Label>
              <Input
                type="number"
                className="mt-2"
                {...register("monthlyFee", {
                  valueAsNumber: true,
                })}
              />
            </div>

            <div>
              <Label>Fee Status</Label>

              <Controller
                control={control}
                name="feeStatus"
                render={({ field }) => (
                  <Select
                    value={field.value ?? undefined}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select Fee Status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <Label>Last Fee Paid</Label>

              <Controller
                control={control}
                name="lastFeePaid"
                render={({ field }) => (
                  <Input
                    type="date"
                    value={field.value ? field.value.slice(0, 10) : ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="mt-2 w-full"
                  />
                )}
              />
            </div>

            <div>
              <Label>Next Due Date</Label>

              <Controller
                control={control}
                name="nextDueDate"
                render={({ field }) => (
                  <Input
                    type="date"
                    value={field.value ? field.value.slice(0, 10) : ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="mt-2 w-full"
                  />
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>{" "}
      {/* Address */}
      <Card className="rounded-3xl border-orange-200">
        <CardContent className="p-8">
          <h2 className="mb-8 flex items-center gap-2 border-b border-orange-100 pb-4 text-xl font-bold text-orange-700">
            Address
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label>Address</Label>
              <Input className="mt-2" {...register("address")} />
            </div>

            <div>
              <Label>City</Label>
              <Input className="mt-2" {...register("city")} />
            </div>

            <div>
              <Label>State</Label>
              <Input className="mt-2" {...register("state")} />
            </div>

            <div>
              <Label>Pincode</Label>
              <Input className="mt-2" {...register("pincode")} />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Remarks */}
      <Card className="rounded-3xl border-slate-200">
        <CardContent className="p-8">
          <h2 className="mb-8 border-b border-slate-200 pb-4 text-xl font-bold text-slate-700">
            Remarks
          </h2>

          <textarea
            rows={5}
            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
            {...register("remarks")}
          />
        </CardContent>
      </Card>
      {/* Footer Buttons */}
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
        <Link href={`/students/${student.id}`}>
          <Button variant="outline" size="lg">
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </Link>

        <Button type="submit" size="lg" disabled={loading || uploading}>
          {uploading || loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {uploading
            ? "Uploading Photo..."
            : loading
              ? mode === "edit"
                ? "Saving..."
                : "Adding..."
              : mode === "edit"
                ? "Save Changes"
                : "Add Student"}
        </Button>
      </div>
    </form>
  );
}
