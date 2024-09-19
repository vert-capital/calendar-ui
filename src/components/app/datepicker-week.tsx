import { useState } from "react";
import DatePicker, {
  formatDateToDDdeMM,
  getWeekInMonthSelected,
} from "../ui/datepicker/date";

interface IProps {
  startDate?: string;
}

export const DatePickerWeek = ({
  startDate = new Date().toISOString().split("T")[0],
}: IProps) => {
  const [isShow, setIsShow] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<Date[] | null>(
    getWeekInMonthSelected(new Date(startDate))
  );

  const textDate = () => {
    if (selectedWeek) {
      return `${formatDateToDDdeMM(selectedWeek[0])} - ${formatDateToDDdeMM(
        selectedWeek[6]
      )}`;
    }
  };

  return (
    <>
      <button onClick={() => setIsShow(!isShow)}>{textDate()}</button>
      {isShow && (
        <div>
          <DatePicker
            week={new Date(startDate)}
            valueSelect={(n) => console.log(n)}
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
          />
        </div>
      )}
    </>
  );
};
