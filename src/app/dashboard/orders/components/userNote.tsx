import { SectionTitle } from "@/components/ui/section-title";
import { Textarea } from "@/components/ui/textarea";

export function UserNote({ setNote }: { setNote: (note: string) => void }) {
  return (
    <div className="w-full space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <SectionTitle title="User Note" />

      <Textarea
        placeholder="e.g., Caution with the dress."
        className="h-40 md:h-[90%]"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setNote(e.target.value)
        }
      />
    </div>
  );
}
