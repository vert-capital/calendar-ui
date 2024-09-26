import { CardEvent } from ".";
import { getWeekInMonthSelected } from "../ui/datepicker/date";
import { formatToYYYYMMDD } from "../ui/datepicker/matriz";

interface IProps {
  data: any;
  start: string;
}

export const TableWeek = ({ data, start }: IProps) => {
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
        i.getDate();
      days.push(x);
    });
    return days;
  };

  const weekDaysString = getWeekDaysString();

  const getDay = (date: string): string => date.split("-")[2];

  return (
    <div className='overflow-x-auto overflow-y-hidden'>
      <div className='grid grid-cols-7 min-w-[920px] min-h-[590px]'>
        {weekDaysString.map((day: any, index) => (
          <div>
            <div className='font-bold text-xs text-brand text-left bg-brand-extra_light border-2 border-brand-extra_light p-2'>
              {getDay(day) + " " + WeekDays[index]}
            </div>
            <div
              className='border border-stone-300 p-2 flex flex-col gap-2'
              style={{ height: "calc(100% - 36px)" }}
            >
              {data.data[day]?.events &&
                data.data[day]?.events.map((event: any, i: number) => (
                  <CardEvent
                    key={i}
                    title={event.event_title}
                    subtitle={
                      event.emission?._emission_code_name
                        ? event.emission?._emission_code_name
                        : ""
                    }
                    color='#f0f'
                    openModal={() => console.log(formatToYYYYMMDD(day))}
                  ></CardEvent>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
