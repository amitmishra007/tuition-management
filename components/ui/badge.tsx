import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors border",
  {
    variants: {
      variant: {
        default:
          "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200",

        success:
          "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",

        warning:
          "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",

        danger: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",

        info: "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100",

        neutral: "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
