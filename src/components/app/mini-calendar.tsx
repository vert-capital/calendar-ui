import { useRef, useState } from "react";
import { WeekCalendarLine } from "./week-calendar-line";
import { SelectGroupDate } from "./select-group-date";

export const MiniCalendar = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [daySelected, setDaySelected] = useState<Date>(new Date());
  const childFunctionRef = useRef<{
    updateWeekCalendarLine: (e: Date) => void;
  } | null>(null);

  const handleTrigger = (e: Date) => {
    if (childFunctionRef.current) {
      childFunctionRef.current.updateWeekCalendarLine(e);
    }
  };

  return (
    <div className='relative'>
      <div className='cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
        clique aqui
      </div>
      <div className={isOpen ? "absolute w-[320px] z-[15]" : "hidden"}>
        <Box>
          <div>
            <div className='font-bold'>Calendário de eventos</div>
            <div
              className='absolute top-0 right-0 px-4 py-2 cursor-pointer'
              onClick={() => setIsOpen(!isOpen)}
            >
              x
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
          </div>
          <IsEmpity />
          {daySelected.toDateString()}
          <div className='text-center'>
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
