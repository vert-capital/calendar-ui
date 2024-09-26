interface IProps {
  title: string;
  subtitle: string;
  color: string;
  openModal: (n: any) => void;
}

export const CardEvent = ({ title, subtitle, color, openModal }: IProps) => {
  return (
    <div
      className='rounded-xl text-xs w-full bg-stone-100 px-4 py-1 cursor-pointer min-w-24'
      style={{ borderLeft: `12px solid ${color}` }}
      onClick={() => openModal("teste 123")}
    >
      <p className='font-bold line-clamp-3'>{title}</p>
      <p className='text-ellipsis overflow-hidden'>{subtitle}</p>
    </div>
  );
};
