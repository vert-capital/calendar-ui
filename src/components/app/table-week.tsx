import { cn } from "@/lib";
import { CardEvent, EventDetails } from ".";
import { getWeekInMonthSelected } from "../ui/datepicker/date";
import { Icons } from "@vert-capital/design-system-ui";
import { useState } from "react";

interface IProps {
  data: any;
  start: string;
  access: {
    ops: string;
    obligation: string;
    calendar_event: string;
    token: string;
  };
  isLoading?: boolean;
}

export const TableWeek = ({
  data,
  start,
  isLoading = false,
  access,
}: IProps) => {
  enum WeekDays {
    "Dom." = 0,
    "Seg." = 1,
    "Ter." = 2,
    "Qua." = 3,
    "Qui." = 4,
    "Sex." = 5,
    "Sab." = 6,
  }

  const getWeekDaysString = () => {
    const days: any[] = [];
    const weekDaysData = getWeekInMonthSelected(new Date(start + " 00:00:00"));

    weekDaysData.forEach((i: Date) => {
      const x =
        i.getFullYear() +
        "-" +
        (i.getMonth() < 9 ? "0" + (i.getMonth() + 1) : i.getMonth() + 1) +
        "-" +
        (i.getDate() < 9 ? "0" + i.getDate() : i.getDate());
      days.push(x);
    });
    return days;
  };

  const weekDaysString = getWeekDaysString();

  const getDay = (date: string): string => date.split("-")[2];
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataDetails, setDataDetails] = useState<any>({});

  const showModal = (data: any) => {
    setDataDetails(data);
    setIsOpenModal(true);
  };

  return (
    <>
      <div className='overflow-x-auto overflow-y-hidden'>
        <div className='grid grid-cols-7 min-w-[920px] min-h-[590px]  border-b-2 border-stone-200'>
          {weekDaysString.map((day: any, index) => (
            <div
              key={`column_week_${index}`}
              style={{ backgroundColor: `${index % 2 === 0 && "#fafafa"}` }}
            >
              <div className='font-bold text-xs text-brand text-left bg-brand-extra_light border-2 border-brand-extra_light p-2'>
                {getDay(day) + " " + WeekDays[index]}
              </div>
              {data.data && !isLoading ? (
                <div
                  className='p-2 flex flex-col gap-2'
                  style={{ height: "calc(100% - 36px)" }}
                >
                  {data.data[day]?.events &&
                    data.data[day]?.events.map(
                      (event: any, index_event: number) => (
                        <CardEvent
                          key={`card_event_${index_event}_${index}`}
                          title={event.event_title}
                          subtitle={
                            event.emission?._emission_code_name
                              ? event.emission?._emission_code_name
                              : ""
                          }
                          color={event.event_type?.color}
                          openModal={() => showModal(event)}
                        ></CardEvent>
                      )
                    )}
                  {data.data[day]?.quantity_left > 0 && (
                    <a
                      href='#'
                      target='_blank'
                      className='font-bold text-xs text-brand transition-opacity hover:opacity-50'
                    >
                      {data.data[day]?.quantity_left} mais...
                    </a>
                  )}
                </div>
              ) : (
                <div
                  className={cn(
                    "w-auto box-border  animate-pulse flex items-center justify-center",
                    index % 2 === 0 ? "bg-stone-100" : ""
                  )}
                  style={{ height: "calc(100% - 36px)" }}
                >
                  <Icons.Loader2 className='w-4 ml-2 animate-spin opacity-40' />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <EventDetails
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        data={dataDetails}
        urls={access}
      />
    </>
  );
};
