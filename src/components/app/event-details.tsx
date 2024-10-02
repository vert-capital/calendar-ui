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
} from "@vert-capital/design-system-ui";

interface IProps {
  data: any;
  isOpen: boolean;
  setIsOpen: Function;
  urls: {
    ops: string;
    obligation: string;
    calendar_event: string;
    token: string;
  };
}

export function EventDetails({ data, isOpen, setIsOpen, urls }: IProps) {
  const event = new Event({ ...data, urls });
  const handleClose = () => setIsOpen(false);

  enum EStatus {
    "À Vencer" = "text-[#b8a635] bg-[#FFF9DB]",
    "Vencida" = "text-[#c05c4f] bg-[#f8d7da]",
    "Cumprida" = "text-[#41d394] bg-[#d4edda]",
    "Cumprida fora do vencimento" = "",
    "Parcialmente liquidado" = "",
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(b) => setIsOpen(b)}>
        <DialogContent className='sm:max-w-[588px]'>
          <DialogHeader className='items-start'>
            <DialogTitle>Detalhes do evento</DialogTitle>
          </DialogHeader>
          <hr className='border border-stone-200 opacity-50 my-2' />
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
                    email={responsible.email || "Não possui e-mail cadastrado"}
                    isMain={false}
                    initials={event.getInitials(responsible.name)}
                  />
                ))}
              </div>
            </div>
          </div>
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
