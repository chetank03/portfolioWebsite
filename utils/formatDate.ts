/**
 * Formats a "YYYY-MM-DD" string as "May 2026".
 *
 * Parsed by hand rather than via `new Date(str)` because the ISO form is treated
 * as UTC, which shifts the month backwards for anyone west of Greenwich.
 */
export function formatMonthYear(date: string) {
  const [year, month] = date.split("-");
  return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}
