import { useRef, useState } from "react";
import { WeekCalendarLine } from "./week-calendar-line";
import { SelectGroupDate } from "./select-group-date";
import { EventMiniCalendar } from "@/model/Events";

// MOCK
import mockMiniCalendar from "@/components/app/mock-mini-calendar.json";
import { CardEventMiniCalendar } from "./card-event-mini-calendar";
import { Icons } from "@vert-capital/design-system-ui";

export const MiniCalendar = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [daySelected, setDaySelected] = useState<Date>(new Date());
  const [search, setSearch] = useState<string>("");
  const childFunctionRef = useRef<{
    updateWeekCalendarLine: (e: Date) => void;
  } | null>(null);

  const handleTrigger = (e: Date) => {
    if (childFunctionRef.current) {
      childFunctionRef.current.updateWeekCalendarLine(e);
    }
  };

  // MOCK
  const mock = mockMiniCalendar.results;

  return (
    <div className='relative'>
      <div className='cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
        <Icons.CalendarCheck className='w-6 h-6 text-gray-400' />
      </div>
      <div className={isOpen ? "absolute w-[370px] z-[15]" : "hidden"}>
        <Box>
          <div>
            <div className='font-bold'>Calendário de eventos</div>
            <div
              className='absolute top-2 right-0 px-4 py-2 cursor-pointer'
              onClick={() => setIsOpen(!isOpen)}
            >
              <Icons.X className='w-4 h-4' />
            </div>

            <div className='flex justify-between'>
              <SelectGroupDate
                id='month-select'
                label='Escolha um mês:'
                value={daySelected}
                updateWeekCalendarLine={handleTrigger}
              />
            </div>
            <WeekCalendarLine
              daySelected={daySelected}
              setDaySelected={setDaySelected}
              ref={childFunctionRef}
            />
            <InputSearch search={search} setSearch={setSearch} />
          </div>
          {mock.length > 0 ? (
            <div className='h-full max-h-[60vh] overflow-auto mt-3 flex flex-col gap-3'>
              {mock.map((event) => (
                <CardEventMiniCalendar
                  key={event.id}
                  data={new EventMiniCalendar(event)}
                />
              ))}
            </div>
          ) : (
            <IsEmpity />
          )}
          {/* {daySelected.toDateString()} */}
          <div className='text-center pt-3'>
            <a
              href='#'
              target='_blank'
              className='font-bold text-brand text-sm transition hover:opacity-70'
            >
              Ir para versão completa
            </a>
          </div>
        </Box>
      </div>
    </div>
  );
};

const Box = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className='w-full h-[90vh] flex flex-col justify-between relative bg-white border rounded box-border px-3 pb-3 pt-4 shadow-md'>
      {children}
    </div>
  );
};

const IsEmpity = (): JSX.Element => {
  return (
    <div className='text-center'>
      <div className='font-bold text-gray-400 text-sm'>
        Você não possui eventos na data selecionada, verifique a visão completa
      </div>
    </div>
  );
};

const InputSearch = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (e: string) => void;
}): JSX.Element => {
  return (
    <div className='w-full mt-3 flex rounded-lg border items-center focus-visible:outline-none focus-within:border-stone-500'>
      <input
        type='text'
        placeholder='Buscar...'
        className='w-full py-2 px-3 border-0 rounded-lg focus-visible:outline-none'
        onChange={(e) => setSearch(e.target.value)}
      />
      <Icons.Search
        onClick={() => setSearch(search)}
        className='w-9 h-6 text-gray-400 px-2 cursor-pointer'
      />
    </div>
  );
};
