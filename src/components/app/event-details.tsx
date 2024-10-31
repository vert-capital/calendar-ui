import { Event } from "@/model/Events";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icons,
  ResponsibleListItem,
  dateDisplay,
} from "@vert-capital/design-system-ui";
import { useState } from "react";
import { weekDays } from "../ui/datepicker/date";

interface IProps {
  data: any;
  isOpen: boolean;
  setIsOpen: Function;
  urls: {
    ops: string;
    obligation: string;
    calendar_event: string;
  };
}
export enum EStatus {
  "À Vencer" = "text-[#b8a635] bg-[#FFF9DB]",
  "Vencida" = "text-[#c05c4f] bg-[#f8d7da]",
  "Cumprida" = "text-[#41d394] bg-[#d4edda]",
  "Cumprida fora do vencimento" = "",
  "Parcialmente liquidado" = "",
}

export function EventDetails({ data, isOpen, setIsOpen, urls }: IProps) {
  const event = new Event({ ...data, urls });
  const handleClose = () => setIsOpen(false);

  const [isRecurrence, setIsRecurrence] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(b) => setIsOpen(b)}>
        <DialogContent className='sm:max-w-[588px]'>
          <DialogHeader className='items-start'>
            <DialogTitle>Detalhes do evento</DialogTitle>
          </DialogHeader>
          <hr className='border border-stone-200 opacity-50 my-2' />
          {!isRecurrence ? (
            <div className='flex flex-col gap-4'>
              <div className='flex flex-wrap gap-2 font-bold items-center'>
                <div
                  className='w-2 h-2 rounded-full'
                  style={{ background: `${event.color}` }}
                ></div>
                {event.event_title}
                {event.status && (
                  <Badge
                    className={
                      EStatus[event.status as keyof typeof EStatus] || ""
                    }
                    variant='secondary'
                  >
                    {event.status}
                  </Badge>
                )}
              </div>
              <span>
                (<span className='font-bold'>Patrimônio:</span>
                {event.patrimony_formatted})
                {event.series_formatted && (
                  <>
                    (<span className='font-bold'>Série:</span>{" "}
                    {event.series_formatted})
                  </>
                )}
              </span>
              <a
                href={event.link_blank}
                target='_blank'
                className='text-sm flex gap-1 items-center text-brand hover:opacity-50 transition-opacity'
              >
                <Icons.ExternalLink className='w-4 h-4 mr-1' />
                Ver no {event.application_name}
              </a>
              <div className='flex gap-1 items-center'>
                <Icons.Clock className='w-4 h-4 mr-1' />
                <span>{event.day_date}</span>
                {/* {event.obligation && (
                  <div
                    className='text-brand items-center ml-4 flex transition-opacity hover:opacity-50 cursor-pointer'
                    onClick={() => setIsRecurrence(true)}
                  >
                    <Icons.CopyCheck className='w-4 h-4 mr-1' />
                    <span className='underline text-sm'>
                      Mostrar todas as recorrencias
                    </span>
                  </div>
                )} */}
              </div>

              <h3>Acompanhamento</h3>
              <div className='w-fit'>
                <div className='text-sm mb-2'>Responsável</div>
                <ResponsibleListItem
                  img='#'
                  name={event.responsable.name}
                  area={event.responsable.area}
                  email={event.responsable.email}
                  isMain={true}
                  initials={event.getInitials(event.responsable.name)}
                />
              </div>
              <div className='w-fit'>
                <div className='text-sm mb-2'>Coparticipantes</div>
                <div className='flex flex-wrap gap-2'>
                  {event.coresponsable.map((responsible, index) => (
                    <ResponsibleListItem
                      key={`coresponsable_${index}`}
                      img='#'
                      name={responsible.name}
                      area={responsible.area}
                      email={
                        responsible.email || "Não possui e-mail cadastrado"
                      }
                      isMain={false}
                      initials={event.getInitials(responsible.name)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div
                onClick={() => setIsRecurrence(false)}
                className='text-brand items-center ml-4 flex transition-opacity hover:opacity-50 cursor-pointer'
              >
                <Icons.ArrowLeft className='w-4 h-4 mr-1' />
                Voltar
              </div>
              <Recorrence />
            </>
          )}
          <hr className='border border-stone-200 opacity-50 my-2' />

          <DialogFooter>
            <Button variant='outline' onClick={handleClose}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

const Recorrence = () => {
  const toDate = (date: string): Date => {
    return new Date(date + "T00:00:00");
  };
  const getDateText = (date: string): string => {
    const day = toDate(date).getDate();
    return day > 9 ? day.toString() : `0${day}`;
  };
  const getMonthText = (date: string): string => {
    const month = toDate(date).toLocaleString("pr-br", { month: "long" });
    return month.charAt(0).toUpperCase() + month.slice(1, 3);
  };
  // ToDo
  const mock = [
    {
      due_date: "2022-01-01",
      title: "Evento 1",
      status: "Pendente",
    },
  ];
  return (
    <div className='flex flex-col gap-4 max-h-[500px] overflow-y-auto'>
      {mock.map((item, index) => (
        <div key={`recorrencia_${index}`} className='flex gap-4'>
          <div>
            <div>{getDateText(item.due_date)}</div>
            <span className='text-stone-400'>
              {getMonthText(item.due_date)}
            </span>
          </div>
          <div className=''>
            <div className='font-bold'>{item.title}</div>
            <div className='text-sm'>
              {weekDays[toDate(item.due_date).getDay()]}
              {". "}
              {dateDisplay(item.due_date)}
            </div>
          </div>
          <span className='w-fit mr-1'>
            {isNaN(parseInt(item.status)) && (
              <Badge
                className={
                  (EStatus[item.status as keyof typeof EStatus] || "") +
                  " w-max"
                }
                variant='secondary'
              >
                {item.status}
              </Badge>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};
