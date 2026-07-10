"use client";
import Link from "next/link";
import Image from "next/image";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const requiredFields: (keyof Student)[] = [
    "firstName",
    "lastName",
    "gender",
    "status",
    "dob",
    "joiningDate",
    "fatherName",
    "motherName",
    "phone",
    "email",
    "admissionNo",
    "studentClass",
    "school",
    "monthlyFee",
    "feeStatus",
    "lastFeePaid",
    "nextDueDate",
    "address",
    "city",
    "state",
    "pincode",
  ];
  const [profileUrl, setProfileUrl] = useState(student.profilePhoto ?? "");

  const [profilePreview, setProfilePreview] = useState(
    student.profilePhoto ?? "/images/default-avatar.png",
  );
  const [uploading, setUploading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Student>({
    defaultValues: student,
    shouldFocusError: true,
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
    for (const field of requiredFields) {
      const value = values[field];

      if (
        value === undefined ||
        value === null ||
        value === "" ||
        (typeof value === "number" && Number.isNaN(value))
      ) {
        toast.error("Please fill all the required fields.");
        return;
      }
    }

    setLoading(true);

    try {
      const finalData = {
        ...values,
        profilePhoto: profileUrl,
      };

      if (mode === "edit") {
        await updateStudent(student.id, finalData);

        toast.success(
          `Details of ${finalData.firstName} ${finalData.lastName} ${
            finalData.gender === "Male"
              ? "S/o"
              : finalData.gender === "Female"
                ? "D/o"
                : "Child of"
          } Sh. ${finalData.fatherName} & Smt. ${finalData.motherName} updated successfully.`,
        );
      } else {
        const created = await createStudent({
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
        });

        toast.success(
          `${finalData.firstName} ${finalData.lastName} ${
            finalData.gender === "Male" ? "S/o" : "D/o"
          } Sh. ${finalData.fatherName} & Smt. ${finalData.motherName} added successfully`,
        );

        router.push(`/features/students/${created.id}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
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
          <Link
            href={
              mode === "edit"
                ? `/features/students/${student.id}/edit`
                : "/features/students"
            }
          >
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
              <Label>
                First Name <span className="text-red-500">*</span>
              </Label>

              <Input
                className={`mt-2 w-full ${
                  errors.firstName
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />

              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="min-w-0">
              <Label>
                Last Name <span className="text-red-500">*</span>
              </Label>

              <Input
                className={`mt-2 w-full ${
                  errors.lastName
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                {...register("lastName", {
                  required: "Last Name is required",
                })}
              />

              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="min-w-0">
              <Label className="mb-3 flex items-center gap-2">
                <UserRound className="h-4 w-4 text-blue-600" />
                Gender
              </Label>

              <Controller
                control={control}
                name="gender"
                rules={{
                  required: "Gender is required",
                }}
                render={({ field }) => (
                  <>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className={`flex flex-wrap gap-4 rounded-xl p-3 ${
                        errors.gender ? "border border-red-500" : ""
                      }`}
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
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>

                    {errors.gender && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.gender.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div className="min-w-0">
              <Label>Status</Label>

              <Controller
                control={control}
                name="status"
                rules={{
                  required: "Status is required",
                }}
                render={({ field }) => (
                  <>
                    <Select
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        className={`mt-2 w-full ${
                          errors.status
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                      >
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>

                    {errors.status && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.status.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div className="min-w-0">
              <Label>Date of Birth</Label>

              <Controller
                control={control}
                name="dob"
                rules={{
                  required: "Date of Birth is required",
                }}
                render={({ field }) => (
                  <>
                    <Input
                      type="date"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      className={`mt-2 w-full ${
                        errors.dob
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />

                    {errors.dob && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.dob.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div className="min-w-0">
              <Label>Joining Date</Label>
              <Controller
                control={control}
                name="joiningDate"
                rules={{
                  required: "Joining Date is required",
                }}
                render={({ field }) => (
                  <>
                    <Input
                      type="date"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      className={`mt-2 w-full ${
                        errors.joiningDate
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />

                    {errors.joiningDate && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.joiningDate.message}
                      </p>
                    )}
                  </>
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
              <Label>
                Father&apos;s Name <span className="text-red-500">*</span>
              </Label>

              <Input
                className={`mt-2 ${
                  errors.fatherName
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                {...register("fatherName", {
                  required: "Father's Name is required",
                })}
              />

              {errors.fatherName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.fatherName.message}
                </p>
              )}
            </div>

            <div>
              <Label>
                Mother&apos;s Name <span className="text-red-500">*</span>
              </Label>

              <Input
                className={`mt-2 ${
                  errors.motherName
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                {...register("motherName", {
                  required: "Mother's Name is required",
                })}
              />

              {errors.motherName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.motherName.message}
                </p>
              )}
            </div>

            <div>
              <Label>
                Phone Number <span className="text-red-500">*</span>
              </Label>

              <Input
                type="tel"
                className={`mt-2 ${
                  errors.phone
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                {...register("phone", {
                  required: "Phone Number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone Number must be exactly 10 digits",
                  },
                })}
              />

              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <Label>Alternate Phone</Label>

              <Input
                type="tel"
                className={`mt-2 ${
                  errors.alternatePhone
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                {...register("alternatePhone", {
                  pattern: {
                    value: /^$|^[0-9]{10}$/,
                    message: "Alternate Phone must be exactly 10 digits",
                  },
                })}
              />

              {errors.alternatePhone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.alternatePhone.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label>
                Email Address <span className="text-red-500">*</span>
              </Label>

              <Input
                type="email"
                className={`mt-2 ${
                  errors.email
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                {...register("email", {
                  required: "Email Address is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
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

          {/* Admission Number */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Admission Number */}
            <div>
              <Label>
                Admission Number <span className="text-red-500">*</span>
              </Label>

              <Input
                className={`mt-2 ${
                  errors.admissionNo
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                {...register("admissionNo", {
                  required: "Admission Number is required",
                })}
              />

              {errors.admissionNo && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.admissionNo.message}
                </p>
              )}
            </div>

            {/* Class */}
            <div>
              <Label>
                Class <span className="text-red-500">*</span>
              </Label>

              <Input
                className={`mt-2 ${
                  errors.studentClass
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                {...register("studentClass", {
                  required: "Class is required",
                })}
              />

              {errors.studentClass && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.studentClass.message}
                </p>
              )}
            </div>

            {/* School */}
            <div className="md:col-span-2">
              <Label>
                School Name <span className="text-red-500">*</span>
              </Label>

              <Input
                className={`mt-2 ${
                  errors.school
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                {...register("school", {
                  required: "School Name is required",
                })}
              />

              {errors.school && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.school.message}
                </p>
              )}
            </div>

            {/* Batch (Optional) */}

            <div className="md:col-span-2">
              <Label>Batch</Label>

              <Controller
                control={control}
                name="batch"
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select Batch (Optional)" />
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
        <Link
          href={
            mode === "edit"
              ? `/features/students/${student.id}/edit`
              : "/features/students"
          }
        >
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
