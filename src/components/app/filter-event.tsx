// import { useSearchParams } from '@remix-run/react';
import {
  CheckBoxBasic,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@vert-capital/design-system-ui";
import { useEffect, useState } from "react";
import { Icons } from "@vert-capital/design-system-ui";

interface IEvent {
  id: number;
  name: string;
  name_display: string;
  info: string;
  color: string;
}

interface IProps {
  eventList: IEvent[];
  searchParams: string;
  valueSelect: (n: any) => void;
}

export const FilterEvents = ({
  eventList,
  searchParams,
  valueSelect,
}: IProps) => {
  const [checked, setChecked] = useState([] as number[]);

  useEffect(() => {
    const checkedString = checked.join(",");
    if (searchParams === checkedString) return;
    valueSelect({
      eventType: checkedString,
    });
  }, [checked]);

  useEffect(() => {
    populated();
  }, [searchParams]);

  const populated = () => {
    if (!searchParams || searchParams === checked.join(",")) return;
    setChecked(searchParams.split(",").map(Number));
  };

  const onCheckedChange = (e: boolean, id: number) => {
    if (e) setChecked((prevChecked) => [...prevChecked, id]);
    else
      setChecked((prevChecked) => prevChecked.filter((value) => value != id));
  };
  return (
    <div className='flex flex-col gap-2'>
      {eventList &&
        eventList.map((event, index) => (
          <CheckBoxBasic
            key={index}
            checked={checked.includes(event.id)}
            onCheckedChange={(e: boolean) => onCheckedChange(e, event.id)}
            classNameLabel='flex items-center justify-start cursor-pointer'
            id={`event_${index}`}
          >
            <label
              htmlFor={`event_${index}`}
              className='cursor-pointer'
              style={{ color: `${event.color}` }}
            >
              {event.name_display}
            </label>
            {event.info && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Icons.Info className='w-4 h-4 ml-2 text-brand' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{event.info}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </CheckBoxBasic>
        ))}
    </div>
  );
};
