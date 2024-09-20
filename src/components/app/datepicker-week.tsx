import { useEffect, useState } from "react";
import DatePicker, {
  formatDateToDDdeMM,
  getWeekInMonthSelected,
} from "../ui/datepicker/date";
import { formatToYYYYMMDD } from "../ui/datepicker/matriz";

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
    setSelectedWeek(getWeekInMonthSelected(new Date()));
  };

  useEffect(() => {
    if (selectedWeek)
      valueSelect({
        start: formatToYYYYMMDD(selectedWeek[0]),
        end: formatToYYYYMMDD(selectedWeek[6]),
      });
  }, [selectedWeek]);

  return (
    <div className='flex items-center gap-4'>
      <div>
        <button
          className='h-auto font-bold text-sm relative transition text-cyan-800 hover:text-white hover:bg-cyan-800  rounded-full px-8 py-2 border border-cyan-800'
          onClick={setToday}
        >
          <span>Hoje</span>
        </button>
      </div>
      <div className='h-auto'>
        <button
          className='px-4 font-bold text-cyan-800 cursor-pointer hover:opacity-70'
          onClick={prevWeek}
        >
          {"<"}
        </button>
        <button
          className='px-4 font-bold text-cyan-800 cursor-pointer hover:opacity-70'
          onClick={nextWeek}
        >
          {">"}
        </button>
        <button
          className='font-bold relative hover:opacity-70'
          onClick={() => setIsShow(!isShow)}
        >
          <span className='mr-4'>{textDate()} </span>
          <span className=' font-bold text-cyan-800 cursor-pointer rotate-90 absolute'>
            {">"}
          </span>
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
