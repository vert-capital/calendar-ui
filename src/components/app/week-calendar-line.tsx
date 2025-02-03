import { getWeekInMonthSelected } from "@/common";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { weekDays } from "../ui/datepicker/date";

interface IPropsWeekCalendarLine {
  daySelected: Date;
  setDaySelected: React.Dispatch<React.SetStateAction<Date>>;
}

export const WeekCalendarLine = forwardRef(
  (
    { daySelected, setDaySelected }: IPropsWeekCalendarLine,
    ref
  ): JSX.Element => {
    const [weekSelected, setWeekSelected] = useState<Date[]>([]);

    useImperativeHandle(ref, () => ({
      updateWeekCalendarLine(e: Date) {
        setDaySelected(e);
        buildWeek(e, false);
      },
    }));

    const buildWeek = (date: Date, isSetDay = true): void => {
      const week: Date[] = [];
      const start = getWeekInMonthSelected(new Date(date))[0];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(start));
        start.setDate(start.getDate() + 1);
      }
      setWeekSelected(week);
      if (isSetDay) setDaySelected(week[0]);
    };

    useEffect(() => {
      buildWeek(new Date(), false);
    }, []);

    const prevWeek = () => {
      const prev = getWeekInMonthSelected(daySelected)[0];
      prev.setDate(prev.getDate() - 7);
      buildWeek(prev);
    };
    const nextWeek = () => {
      const next = getWeekInMonthSelected(daySelected)[6];
      next.setDate(next.getDate() + 1);
      buildWeek(next);
    };

    return (
      <>
        <div className='my-3 w-full flex justify-between'>
          <div onClick={() => prevWeek()}>left</div>
          <div onClick={() => nextWeek()}>rigth</div>
        </div>
        <div className='flex justify-between mt-3'>
          {weekDays.map((day, index) => (
            <div
              key={index}
              className='text-xs text-stone-500'
              style={{
                width: "22px",
                height: "21px",
                padding: "2px",
                textAlign: "center",
              }}
            >
              {day}
            </div>
          ))}
        </div>
        <div className='flex justify-between text-gray-400'>
          {weekSelected.map((day) => (
            <div
              className={` ${
                daySelected.getDate() === day.getDate()
                  ? "font-bold text-stone-600"
                  : ""
              } w-[22px] text-center text-sm transition hover:opacity-70 cursor-pointer`}
              key={day.toString()}
              onClick={() => {
                setDaySelected(day);
              }}
            >
              {day.getDate()}
            </div>
          ))}
        </div>
        <div className='font-bold text-stone-600 text-sm mt-3'>
          {DateToString(daySelected)}
        </div>
      </>
    );
  }
);

const DateToString = (date: Date): string => {
  const isToday = new Date().toDateString() === date.toDateString();
  return `${isToday ? "Hoje -" : ""} ${
    weekDays[date.getDay()]
  }. ${date.getDate()} de ${nameMonth[date.getMonth()].short}.`;
};

export const nameMonth = [
  { value: 0, label: "janeiro", short: "jan" },
  { value: 1, label: "fevereiro", short: "fev" },
  { value: 2, label: "março", short: "mar" },
  { value: 3, label: "abril", short: "abr" },
  { value: 4, label: "maio", short: "mai" },
  { value: 5, label: "junho", short: "jun" },
  { value: 6, label: "julho", short: "jul" },
  { value: 7, label: "agosto", short: "ago" },
  { value: 8, label: "setembro", short: "set" },
  { value: 9, label: "outubro", short: "out" },
  { value: 10, label: "novembro", short: "nov" },
  { value: 11, label: "dezembro", short: "dez" },
];
