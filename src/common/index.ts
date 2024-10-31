import { turnToLastSunday } from "@/components/ui/datepicker/matriz";

export const getWeekInMonthSelected = (day: Date): Date[] => {
  if (day.getDay() != 0) {
    day.setDate(turnToLastSunday(day));
  }
  const start = day;
  const week: Date[] = [];

  for (let i = 0; i < 7; i++) {
    week.push(new Date(start));
    start.setDate(start.getDate() + 1);
  }

  return week;
};
