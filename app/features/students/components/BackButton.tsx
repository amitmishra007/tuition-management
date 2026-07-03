"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push("/features/students");
        }
      }}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Previous
    </Button>
  );
}
