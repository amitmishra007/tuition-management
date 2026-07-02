import { format, differenceInYears, differenceInDays } from "date-fns";

export function formatDate(date: string) {
  return format(new Date(date), "EEEE, dd MMM yyyy");
}

export function getAge(date: string) {
  return differenceInYears(new Date(), new Date(date));
}

export function getDaysJoined(date: string) {
  return differenceInDays(new Date(), new Date(date));
}
