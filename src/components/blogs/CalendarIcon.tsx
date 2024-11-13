import dayjs from "dayjs";

export const CalendarIcon = ({ dateString = "" }) => {
    
    if (!dateString) return null;

    // Parse the date string
    const date = dayjs(dateString);
    const month = date.format('MMM'); // Get short month name, e.g., "Oct"
    const day = date.format('DD'); // Get day, e.g., "06"

    return (
      <div className="h-12 aspect-square bg-white rounded flex flex-col justify-between items-center shadow-md">
        <div className="bg-burnDark text-white text-[10px] font-bold w-full text-center p-1 rounded-t">
          {month}
        </div>
        <div className="text-lg font-bold text-zinc-900">{day}</div>
      </div>
    );
  };