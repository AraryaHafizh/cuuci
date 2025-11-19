import { supportData } from "./data";

export function Contact() {
  return (
    <section className="h-fit flex-1 rounded-2xl bg-(--container-bg) p-5">
      <p className="text-2xl font-bold">{supportData.contact.title}</p>
      <p className="mt-2 mb-5 opacity-50">{supportData.contact.description}</p>

      {supportData.contact.data.map((item, i) => (
        <div className="mt-5 flex gap-5">
          {item.icon}
          <div>
            <p>{item.title}</p>
            <p className="opacity-50">{item.detail}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
