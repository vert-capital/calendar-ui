import { useState } from "react";
import { getWeeksInMonth, turnToLastSunday } from "./matriz";

// Função para formatar a data no formato desejado (exemplo: 'dd/MM')
const formatDate = (date: Date): string => {
  return (
    date.getDate().toString().padStart(2, "0") +
    "/" +
    (date.getMonth() + 1).toString().padStart(2, "0")
  );
};

export const formatDateToDDdeMM = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0"); // Obter o dia
  const month = date.toLocaleString("default", { month: "long" }); // Obter o nome completo do mês
  return `${day} de ${month}`; // Formatar como 'DD de mês'
};

export const getStartEndDay = (date: Date): Date[] => {
  const start = getWeekInMonthSelected(date)[0];
  const end = getWeekInMonthSelected(date)[6];
  return [start, end];
};

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

interface IProps {
  week?: Date;
  valueSelect: (n: any) => void;
  selectedWeek: Date[] | null;
  setSelectedWeek: React.Dispatch<React.SetStateAction<Date[] | null>>;
}

// Componente principal
const DatePicker = ({
  week = new Date(),
  valueSelect,
  selectedWeek,
  setSelectedWeek,
}: IProps) => {
  week = new Date(new Date(week).setHours(0, 0, 0, 0));
  const [currentMonth, setCurrentMonth] = useState(week);
  // const [selectedWeek, setSelectedWeek] = useState<Date[] | null>(
  //   getWeekInMonthSelected(week),
  // );

  // Função para gerar as semanas do mês atual
  const weeks = getWeeksInMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );

  // Navegar para o mês anterior
  const handlePreviousMonth = () => {
    const prevMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1
    );
    setCurrentMonth(prevMonth);
  };

  // Navegar para o próximo mês
  const handleNextMonth = () => {
    const nextMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1
    );
    setCurrentMonth(nextMonth);
  };

  // Função para selecionar uma semana
  const handleWeekClick = (week: Date[]) => {
    console.log("🚀 ~ handleWeekClick ~ week:", week);
    setSelectedWeek(week);
    valueSelect([week[0], week[6]]);
  };

  const nameMonth = currentMonth.toLocaleString("default", { month: "long" });

  const today = new Date();

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  return (
    <div className='w-fit absolute rounded shadow bg-white px-4 py-2 border-stone-200 border'>
      {/* Cabeçalho com navegação entre meses */}
      <div className='flex items-center justify-between mb-2'>
        <button className='p-1' onClick={handlePreviousMonth}>{`<`}</button>
        <span className='text-sm text-stone-500'>
          {currentMonth.getFullYear()}
          {"  "}
          {/* deixar a primeira lerta do mes upercase */}
          {nameMonth[0].toUpperCase() + nameMonth.slice(1)}
        </span>
        <button className='p-1' onClick={handleNextMonth}>{`>`}</button>
      </div>

      {/* Renderizando as semanas */}
      <div>
        <div className='flex justify-between gap-3 my-3'>
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
        <hr className='my-1' />
        {weeks.map((week, index) => (
          <div
            key={index}
            onClick={() => handleWeekClick(week)}
            className={` my-4 rounded-full flex cursor-pointer text-stone-500 hover:bg-stone-50 justify-between gap-3 ${
              selectedWeek && selectedWeek[0].getTime() === week[0].getTime()
                ? "bg-stone-100"
                : ""
            }`}
          >
            {selectedWeek && selectedWeek[0].getTime() === week[0].getTime()}
            {week.map((day, index) => (
              <div
                key={day.toString()}
                className={`text-xs rounded-full ${
                  day.getMonth() === currentMonth.getMonth() ? "" : "opacity-50"
                }
                    ${
                      selectedWeek &&
                      selectedWeek[0].getTime() === week[0].getTime() &&
                      (index === 0 || index === 6)
                        ? "bg-cyan-800 text-white"
                        : ""
                    }
                    ${
                      today.getDate() === day.getDate() &&
                      today.getMonth() === day.getMonth()
                        ? "text-cyan-800 font-bold"
                        : ""
                    }`}
                style={{
                  width: "22px",
                  height: "21px",
                  padding: "2px",
                  textAlign: "center",
                }}
              >
                {day.getDate()}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Exibindo a semana selecionada */}
      {selectedWeek && (
        <div style={{ marginTop: "10px" }}>
          {`${formatDate(selectedWeek[0])} - ${formatDate(selectedWeek[6])}`}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
