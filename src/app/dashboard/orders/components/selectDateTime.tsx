import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/ui/section-title";
import { addMonths, isAfter, isBefore, startOfDay } from "date-fns";
import { useEffect, useState } from "react";

type SelectDateTimeProps = {
  onChange: (isoDate: string) => void;
};

export function SelectDateTime({ onChange }: SelectDateTimeProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("06:30");
  const today = startOfDay(new Date()); // normalisasi ke awal hari
  const maxDate = addMonths(today, 3);

  useEffect(() => {
    if (!date) return;

    const [h, m] = time.split(":");
    const combined = new Date(date);
    combined.setHours(Number(h), Number(m));

    onChange(combined.toISOString());
  }, []);

  return (
    <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="When to Arrive?" />

      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="w-full rounded-md border shadow-sm"
        captionLayout="dropdown"
        startMonth={today}
        endMonth={maxDate}
        disabled={(currentDate: Date) => {
          const day = startOfDay(currentDate);
          return isBefore(day, today) || isAfter(day, maxDate);
        }}
      />
      <div className="space-y-2">
        <label htmlFor="time-picker" className="text-sm font-medium">
          Pickup Time
        </label>
        <Input
          id="time-picker"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="appearance-none bg-(--container-bg) dark:bg-(--container-bg) [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </section>
  );
}
