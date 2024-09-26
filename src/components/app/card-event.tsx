interface IProps {
  title?: string;
  subtitle?: string;
  color?: string;
  openModal?: (n: any) => void;
}

export const CardEvent = ({ title, subtitle, color, openModal }: IProps) => {
  const isLoading =
    title === undefined ||
    subtitle === undefined ||
    color === undefined ||
    openModal === undefined;
  return (
    <>
      {isLoading ? (
        <div className='animate-pulse rounded-xl text-xs w-full bg-[#f2f2f2] px-4 py-1 cursor-pointer min-w-24 border-l-[12px] h-16 flex flex-col justify-around'>
          <div className='h-2 bg-stone-300 rounded '></div>
          <div className='flex gap-2'>
            <div className='h-2 w-full bg-stone-300 rounded'></div>
            <div className='h-2 w-full bg-stone-300 rounded'></div>
          </div>
          <div className='h-2 bg-stone-300 rounded'></div>
        </div>
      ) : (
        <div
          className='rounded-xl text-xs w-full bg-[#f2f2f2] px-4 py-1 cursor-pointer min-w-24'
          style={{ borderLeft: `12px solid ${color}` }}
          onClick={() => openModal("teste 123")}
        >
          <p className='font-bold line-clamp-3'>{title}</p>
          <p className='text-ellipsis overflow-hidden'>{subtitle}</p>
        </div>
      )}
    </>
  );
};
