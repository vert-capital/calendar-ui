import { nameMonth } from "./week-calendar-line";

export const SelectGroupDate = ({
  id,
  label,
  value,
  updateWeekCalendarLine,
}: {
  id: string;
  label: string;
  value: Date;
  updateWeekCalendarLine: (e: Date) => void;
}): JSX.Element => {
  const optionsYear = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 20; i++) {
      years.push({ label: `${currentYear + i}`, value: `${currentYear + i}` });
    }
    return years;
  };

  const onChangeSelectMonth = (e: any) => {
    const newMonth = parseInt(e.target.value, 10);
    const newDate = new Date(`${value.getFullYear()}-${newMonth + 1}-01`);
    updateWeekCalendarLine(newDate);
  };

  const onChangeSelectYear = (e: any) => {
    const newYear = parseInt(e.target.value, 10);
    const newDate = new Date(`${newYear}-${value.getMonth() + 1}-01`);
    updateWeekCalendarLine(newDate);
  };

  return (
    <div className='flex justify-between my-3'>
      <div>
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
      <div>
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
