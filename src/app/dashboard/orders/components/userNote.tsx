import { SectionTitle } from "@/components/ui/section-title";
import { Textarea } from "@/components/ui/textarea";

type UserNoteProps = {
  value: string;
  onChange: (note: string) => void;
};

export function UserNote({ value, onChange }: UserNoteProps) {
  return (
    <section className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="Additional Notes" />
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add any special instructions or notes for the driver..."
        className="min-h-32 resize-none"
      />
      <p className="text-muted-foreground text-xs">
        Optional - Let us know if you have any special requirements
      </p>
    </section>
  );
}