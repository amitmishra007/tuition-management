import { supabase } from "@/lib/supabase/client";

export async function markHoliday(
  date: string,
  title: string,
  description?: string,
) {
  const { error } = await supabase.from("holidays").upsert(
    {
      holiday_date: date,
      title,
      description: description || null,
    },
    {
      onConflict: "holiday_date",
    },
  );

  if (error) throw error;

  return true;
}

export async function removeHoliday(date: string) {
  const { error } = await supabase
    .from("holidays")
    .delete()
    .eq("holiday_date", date);

  if (error) throw error;

  return true;
}
