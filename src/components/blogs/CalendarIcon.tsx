import dayjs from "dayjs";

export const CalendarIcon = ({ dateString = "" }) => {
    
    if (!dateString) return null;

    // Parse the date string
    const date = dayjs(dateString);
    const month = date.format('MMM'); // Get short month name, e.g., "Oct"
    const day = date.format('DD'); // Get day, e.g., "06"
    return (
      <div className="flex h-12 w-12 flex-col items-center justify-between border-[3px] border-black bg-zinc-100 shadow-[3px_3px_0px_0px_#000]">
        <div className="w-full bg-[var(--accent-primary)] p-1 text-center text-[10px] font-black uppercase text-white">
          {month}
        </div>
        <div className="flex flex-1 items-center justify-center text-lg font-black leading-none text-zinc-900">{day}</div>
      </div>
    );
  };
