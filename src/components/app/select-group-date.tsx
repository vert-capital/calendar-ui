import { nameMonth } from "./week-calendar-line";

export const SelectGroupDate = ({
  id,
  label,
  valueSelect,
  value,
  updateWeekCalendarLine,
}: {
  id: string;
  label: string;
  valueSelect: (value: Date) => void; // Função chamada ao alterar o mês
  value: Date; // O valor atual é um objeto Date
  updateWeekCalendarLine: (e: Date) => void;
}): JSX.Element => {
  const optionsYear = () => {
    // gerar um array de anos no formado {label: '2021', value: '2021'} contando ano atual mais 5 anos
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 20; i++) {
      years.push({ label: `${currentYear + i}`, value: `${currentYear + i}` });
    }
    return years;
  };

  const onChangeSelectMonth = (e: any) => {
    const newMonth = parseInt(e.target.value, 10); // Obtém o novo mês como número
    const newDate = new Date(`${value.getFullYear()}-${newMonth + 1}-01`);
    console.log("newDate", newDate);
    // ToDo
    // valueSelect(newDate); // Passa a nova data para a função
    updateWeekCalendarLine(newDate);
  };

  const onChangeSelectYear = (e: any) => {
    const newYear = parseInt(e.target.value, 10); // Obtém o novo mês como número
    const newDate = new Date(`${newYear}-${value.getMonth() + 1}-01`);
    valueSelect(newDate); // Passa a nova data para a função
  };

  return (
    <div className='flex justify-between my-3'>
      <div className=''>
        <label htmlFor={id} className='text-sm'>
          {label}
        </label>
        <select
          className='w-full py-2 px-3 border rounded'
          id={id}
          value={value.getMonth()}
          onChange={(e) => onChangeSelectMonth(e)}
        >
          {nameMonth.map((month, index) => (
            <option key={index} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>
      <div className=''>
        <label htmlFor={id} className='text-sm'>
          {label}
        </label>
        <select
          className='w-full py-2 px-3 border rounded'
          id={id}
          value={value.getFullYear()}
          onChange={(e) => onChangeSelectYear(e)}
        >
          {optionsYear().map((years, index) => (
            <option key={index} value={years.value}>
              {years.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
