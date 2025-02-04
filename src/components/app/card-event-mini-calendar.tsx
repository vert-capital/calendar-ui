import { EventMiniCalendar } from "@/model/Events";

interface CardEventMiniCalendarProps {
  data: EventMiniCalendar;
}

export const CardEventMiniCalendar = ({
  data: {
    id,
    color,
    event_title,
    responsible_obligation,
    patrimony_formatted,
    status,
  },
}: CardEventMiniCalendarProps): JSX.Element => {
  return (
    <a href={`/modal/event-detial/${id}`} target='_blank'>
      <div
        className='rounded-xl text-xs w-full bg-[#f2f2f2] px-4 py-3 cursor-pointer min-w-24'
        style={{ borderLeft: `12px solid ${color}` }}
      >
        {status && (
          <div className='rounded-full font-bold bg-[#fff9db] text-[#b8a635] px-2 mb-2 py-px text-sm w-fit'>
            {status}
          </div>
        )}
        <p className='line-clamp-3'>
          <span className='font-bold'>{event_title}</span>
          <span>{` (${patrimony_formatted})`}</span>
        </p>
        <p className='text-ellipsis overflow-hidden'>
          {responsible_obligation}
        </p>
      </div>
    </a>
  );
};
