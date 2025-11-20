import SectionInfo from "@/components/SectionInfo";
import { workflowData } from "./data";

export default function Workflow() {
  return (
    <section className="flex gap-20">
      <Info />
      <Steps />
    </section>
  );
}

function Info() {
  return (
    <SectionInfo
      title={workflowData.title}
      description={workflowData.description}
      className="flex flex-1 flex-col justify-center"
    />
  );
}

function Steps() {
  return (
    <section className="flex-1">
      {workflowData.steps.map((step, i) => (
        <div key={i} className="flex h-30 gap-5">
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-blue-500/15 p-3">{step.icon}</div>
            {i !== 3 && <div className="bg-foreground/20 h-full w-0.5"></div>}
          </div>
          <div>
            <p className="font-semibol text-lg">{step.title}</p>
            <p className="font-light opacity-50">{step.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
