import { useEffect, useState } from "react";
import DatePicker, {
  formatDateToDDdeMM,
  getWeekInMonthSelected,
} from "../ui/datepicker/date";
import { formatToYYYYMMDD } from "../ui/datepicker/matriz";
import { Button, Icons } from "@vert-capital/design-system-ui";

interface IProps {
  valueSelect: (n: any) => void;
  setSearchParams: Function;
  searchParams: URLSearchParams;
  startDate?: string;
}

export const DatePickerWeek = ({
  valueSelect,
  setSearchParams,
  searchParams,
  startDate = new Date().toISOString().split("T")[0],
}: IProps) => {
  const [isShow, setIsShow] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<Date[] | null>(
    getWeekInMonthSelected(new Date(startDate))
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
      const next = new Date(selectedWeek[6]);
      next.setDate(next.getDate() + 1);
      setSelectedWeek(getWeekInMonthSelected(next));
    }
  };

  const prevWeek = () => {
    if (selectedWeek) {
      const prev = new Date(selectedWeek[0]);
      prev.setDate(prev.getDate() - 1);
      setSelectedWeek(getWeekInMonthSelected(prev));
    }
  };

  const setToday = () => {
    setSelectedWeek(
      getWeekInMonthSelected(new Date(new Date().setHours(0, 0, 0, 0)))
    );
  };

  const applyFilter = () => {
    const newSearchParams = new URLSearchParams();
    for (const [key, value] of searchParams.entries()) {
      newSearchParams.set(key, value);
      if (key === "event_data_before" || key === "event_data_after") {
        newSearchParams.delete(key);
      }
    }
    if (selectedWeek) {
      newSearchParams.set(
        "event_data_before",
        formatToYYYYMMDD(selectedWeek[6])
      );
      newSearchParams.set(
        "event_data_after",
        formatToYYYYMMDD(selectedWeek[0])
      );
    }
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    if (selectedWeek)
      valueSelect({
        start: formatToYYYYMMDD(selectedWeek[0]),
        end: formatToYYYYMMDD(selectedWeek[6]),
      });
    applyFilter();
  }, [selectedWeek]);

  return (
    <div className='flex items-center gap-4'>
      <div>
        <Button variant={"outline"} onClick={setToday}>
          Hoje
        </Button>
      </div>
      <div className='h-auto flex items-center'>
        <button
          className='px-4 font-bold text-brand cursor-pointer hover:opacity-70'
          onClick={prevWeek}
        >
          <Icons.ChevronLeft className='w-4' />
        </button>
        <button
          className='px-4 font-bold text-brand cursor-pointer hover:opacity-70'
          onClick={nextWeek}
        >
          <Icons.ChevronRight className='w-4' />
        </button>
        <button
          className='font-bold relative hover:opacity-70 flex items-center'
          onClick={() => setIsShow(!isShow)}
        >
          <span className='mr-3'>{textDate()} </span>
          <Icons.ChevronDown className='text-brand w-4' />
        </button>
        {isShow && (
          <>
            <div
              className='fixed w-screen h-full top-0 left-0'
              onClick={() => setIsShow(!isShow)}
            ></div>
            <DatePicker
              week={new Date(startDate)}
              valueSelect={(n) => console.log(n)}
              selectedWeek={selectedWeek}
              setSelectedWeek={setSelectedWeek}
            />
          </>
        )}
      </div>
    </div>
  );
};
