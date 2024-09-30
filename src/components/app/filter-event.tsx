// import { useSearchParams } from '@remix-run/react';
import { CheckBoxBasic } from "@vert-capital/design-system-ui";
import { useEffect, useState } from "react";

interface IEvent {
  id: number;
  name: string;
  name_display: string;
  info: string;
  color: string;
}

interface IProps {
  eventList: IEvent[];
  searchParams: URLSearchParams;
  setSearchParams: Function;
}

export const FilterEvents = ({
  eventList,
  searchParams,
  setSearchParams,
}: IProps) => {
  const [checked, setChecked] = useState([] as number[]);

  useEffect(() => {
    [checked];
    applyFilter();
  }, [checked]);

  useEffect(() => {
    populated();
  }, []);

  const populated = () => {
    const eventType = searchParams.get("event_type");
    if (eventType) {
      setChecked(eventType.split(",").map((item: any) => parseInt(item)));
    }
  };

  const applyFilter = () => {
    const newSearchParams = new URLSearchParams();
    for (const key of searchParams.keys()) {
      newSearchParams.delete(key);
    }
    if (checked.length > 0) {
      newSearchParams.set("event_type", checked.join(","));
    }
    setSearchParams(newSearchParams);
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
            label={event.name_display}
          ></CheckBoxBasic>
        ))}
    </div>
  );
};
