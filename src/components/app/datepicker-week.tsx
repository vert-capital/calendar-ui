import { useState } from "react";
import DatePicker, { formatDateToDDdeMM } from "../ui/datepicker/date";
import { Button, Icons } from "@vert-capital/design-system-ui";
import { getWeekInMonthSelected } from "@/common/index";
import { dateOutput } from "@vert-capital/common";

interface IProps {
  valueSelect: (n: any) => void;
  startDate?: string;
}

export const DatePickerWeek = ({
  valueSelect,
  startDate = new Date().toISOString().split("T")[0],
}: IProps) => {
  const [isShow, setIsShow] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<Date[] | null>(
    getWeekInMonthSelected(new Date(startDate + "T00:00:00"))
  );

  const textDate = () => {
    if (selectedWeek) {
      if (selectedWeek[0].getMonth() !== selectedWeek[6].getMonth()) {
        return `${formatDateToDDdeMM(selectedWeek[0])} - ${formatDateToDDdeMM(
          selectedWeek[6]
        )}`;
      } else {
        return `${selectedWeek[0].getDate()} - ${formatDateToDDdeMM(
          selectedWeek[6]
        )}`;
      }
    }
  };

  const nextWeek = () => {
    if (selectedWeek) {
      const next = new Date(new Date(selectedWeek[6]).setHours(0, 0, 0, 0));
      next.setDate(next.getDate() + 1);
      const week = getWeekInMonthSelected(next);
      setValueSelect(week);
    }
  };

  const prevWeek = () => {
    if (selectedWeek) {
      const prev = new Date(new Date(selectedWeek[0]).setHours(0, 0, 0, 0));
      prev.setDate(prev.getDate() - 1);
      const week = getWeekInMonthSelected(prev);
      setValueSelect(week);
    }
  };

  const setToday = () => {
    const week = getWeekInMonthSelected(
      new Date(new Date().setHours(0, 0, 0, 0))
    );
    setValueSelect(week);
  };

  const setValueSelect = (week: Date[]) => {
    setSelectedWeek(week);
    valueSelect({
      eventDataAfter: dateOutput(week[0]),
      eventDataBefore: dateOutput(week[6]),
    });
  };

  return (
    <div className='flex items-center gap-4'>
      <div>
        <Button variant={"outline"} onClick={setToday} type='button'>
          Hoje
        </Button>
      </div>
      <div className='h-auto flex items-center relative'>
        <button
          className='px-4 font-bold text-brand cursor-pointer hover:opacity-70'
          onClick={prevWeek}
          type='button'
        >
          <Icons.ChevronLeft className='w-4' />
        </button>
        <button
          className='px-4 font-bold text-brand cursor-pointer hover:opacity-70'
          onClick={nextWeek}
          type='button'
        >
          <Icons.ChevronRight className='w-4' />
        </button>
        <button
          className='font-bold relative hover:opacity-70 flex items-center'
          onClick={() => setIsShow(!isShow)}
          type='button'
        >
          <span className='mr-3'>{textDate()} </span>
          <Icons.ChevronDown className='text-brand w-4' />
        </button>
        {isShow && (
          <>
            <button
              className='fixed w-screen h-full top-0 left-0'
              onClick={() => setIsShow(!isShow)}
              type='button'
            ></button>
            <DatePicker
              week={new Date(startDate)}
              valueSelect={(n) =>
                valueSelect({
                  event_data_after: dateOutput(n[0]),
                  event_data_before: dateOutput(n[1]),
                })
              }
              selectedWeek={selectedWeek}
              setSelectedWeek={setSelectedWeek}
            />
          </>
        )}
      </div>
    </div>
  );
};
