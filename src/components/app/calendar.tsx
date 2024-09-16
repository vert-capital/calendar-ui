import { Card } from "@/components/ui/card";

export const Calendar = () => {
  const date = new Date().toLocaleDateString("pt-BR");

  return (
    <Card>
      <div className='flex'>
        <h3 className='text-xl font-bold'>Calendário de Eventos</h3>
        <span className='rounded-full bg-stone-200 text-slate-950 px-2 mx-2 text-sm flex items-center'>
          Data de referência: {date}
        </span>
      </div>
      <hr className='border-[1.5px] my-5' />
      <div className='grid grid-cols-12 gap-4'>
        <aside className='col-span-4'>teste</aside>
        <section className='col-span-8'>conteudo principal</section>
      </div>
    </Card>
  );
};
