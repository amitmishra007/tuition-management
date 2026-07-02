import { format, differenceInYears, differenceInDays, isValid } from "date-fns";

function parseDate(date?: string | null) {
  if (!date) return null;

  const parsed = new Date(date);

  return isValid(parsed) ? parsed : null;
}

export function formatDate(date?: string | null) {
  const parsed = parseDate(date);

  if (!parsed) return "-";

  return format(parsed, "EEEE, dd MMM yyyy");
}

export function getAge(date?: string | null) {
  const parsed = parseDate(date);

  if (!parsed) return "-";

  return differenceInYears(new Date(), parsed);
}

export function getDaysJoined(date?: string | null) {
  const parsed = parseDate(date);

  if (!parsed) return "-";

  return differenceInDays(new Date(), parsed);
}
