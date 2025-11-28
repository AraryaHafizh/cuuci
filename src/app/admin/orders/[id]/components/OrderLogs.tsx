"use client";

import { oderTabKey } from "@/app/super-admin/orders/data";
import { useState } from "react";

export function OrderLogs() {
  const [index, setIndex] = useState<number>(0);
  const components = [<CustomerNote />, <CustomerReport />];

  return (
    <section className="rounded-2xl border bg-(--container-bg) p-5">
      <div className="bg-foreground/3 mb-5 flex w-fit gap-3 rounded-xl p-2">
        {oderTabKey.map((key, i) => (
          <p
            key={i}
            onClick={() => setIndex(i)}
            className={`${index !== i && "opacity-50"} cursor-pointer transition-all duration-300 hover:opacity-100`}
          >
            {key}
          </p>
        ))}
      </div>
      {components[index]}
    </section>
  );
}

function CustomerNote() {
  return (
    <section>
      <p>From John Doe</p>
      <p className="opacity-50">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit explicabo
        laboriosam voluptatum facere, sunt voluptatem eligendi aspernatur qui
        odio alias porro animi dignissimos blanditiis earum illo voluptates
        culpa accusantium, nam exercitationem corrupti aperiam eaque facilis
        perspiciatis. Iste aliquid nesciunt, nam aliquam quos natus deleniti
        eligendi ea atque possimus, eum aut.
      </p>
    </section>
  );
}

function CustomerReport() {
  return (
    <section className="space-y-5">
      <div>
        <p>From John Doe</p>
        <p className="opacity-50">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit
          explicabo laboriosam voluptatum facere, sunt voluptatem eligendi
          aspernatur qui odio alias porro animi dignissimos blanditiis earum
          illo voluptates culpa accusantium, nam exercitationem corrupti aperiam
          eaque facilis perspiciatis. Iste aliquid nesciunt, nam aliquam quos
          natus deleniti eligendi ea atque possimus, eum aut.
        </p>
      </div>

      <div>
        <p>Reply From Admin</p>
        <p className="opacity-50">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit
          explicabo laboriosam voluptatum facere, sunt voluptatem eligendi
          aspernatur qui odio alias porro animi dignissimos blanditiis earum
          illo voluptates culpa accusantium, nam exercitationem corrupti aperiam
          eaque facilis perspiciatis. Iste aliquid nesciunt, nam aliquam quos
          natus deleniti eligendi ea atque possimus, eum aut.
        </p>
      </div>
    </section>
  );
}
