"use client";

import { buttonLabel } from "../../data";

export default function Status() {
  return (
    <div className="space-y-5 rounded-2xl border bg-(--container-bg) p-5">
      <p>Delivery Status</p>
      <div className="flex">
        {Object.entries(buttonLabel).map(([key, label]) => (
          <div key={key}>
            <p className="text-base">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
