import { useEffect, useState } from "react";
import { DatePickerWeek, FilterEvents, TableWeek } from ".";

interface IProps {
  searchParams: URLSearchParams;
  setSearchParams: Function;
  res: any;
  startDate?: string;
  access: {
    ops: string;
    obligation: string;
    calendar_event: string;
    token: string;
  };
}

export const CalendarEventsWeek = ({
  searchParams,
  setSearchParams,
  res,
  startDate,
  access,
}: IProps) => {
  const [valueDatePikerWeek, setValueDatePikerWeek] = useState<{
    start: string;
    end: string;
  }>({ start: "", end: "" });

  const [dataCalendar, setDataCalendar] = useState<any>([]);

  useEffect(() => {
    setDataCalendar(res);
  }, []);

  return (
    <>
      <div className='grid grid-cols-5 gap-4'>
        <div className='xl:col-span-1 col-span-5'>
          <FilterEvents
            eventList={dataCalendar.results}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
        <section className='xl:col-span-4 col-span-5'>
          <div className='mb-4'>
            <DatePickerWeek
              valueSelect={(value) => setValueDatePikerWeek(value)}
              startDate={startDate}
            ></DatePickerWeek>
          </div>
          <TableWeek
            start={valueDatePikerWeek.start}
            data={dataCalendar}
            access={access}
          />
        </section>
      </div>
      <span className='mb-4'>
        valor datePicker: {valueDatePikerWeek.start} - {valueDatePikerWeek.end}
      </span>
    </>
  );
};
