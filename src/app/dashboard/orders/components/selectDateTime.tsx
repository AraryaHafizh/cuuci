import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/ui/section-title";
import { addMonths, isAfter, isBefore, startOfDay } from "date-fns";

export function SelectDateTime({
  date,
  setDate,
  time,
  setTime,
}: {
  date: Date | undefined;
  setDate: (date: Date) => void;
  time: string;
  setTime: (time: string) => void;
}) {
  const today = startOfDay(new Date());
  const maxDate = addMonths(today, 3);

  return (
    <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="When to Arrive?" />

      <Calendar
        mode="single"
        selected={date}
        onSelect={(d) => d && setDate(d)}
        className="w-full rounded-md border shadow-sm"
        captionLayout="dropdown"
        startMonth={today}
        endMonth={maxDate}
        disabled={(currentDate) => {
          const day = startOfDay(currentDate);
          return isBefore(day, today) || isAfter(day, maxDate);
        }}
      />
      <Input
        id="time-picker"
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="appearance-none bg-(--container-bg) dark:bg-(--container-bg) [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </section>
  );
}
