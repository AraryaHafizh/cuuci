import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { supportData } from "./data";

export function Question() {
  return (
    <section className="flex-2 space-y-5">
      <p className="text-3xl font-bold">Frequently Asked Questions</p>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue={supportData.faq[0].q}
      >
        {supportData.faq.map((item, i) => (
          <AccordionItem key={i} value={item.q}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
