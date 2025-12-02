"use client";

import * as React from "react";
import { Counter } from "@/components/ui/shadcn-io/counter";

const ItemCounter = ({ initialData }: { initialData: number }) => {
  const [number, setNumber] = React.useState(initialData);

  const safeSetNumber = (value: number) => {
    if (value >= 0) {
      setNumber(value);
    }
  };

  return <Counter number={number} setNumber={safeSetNumber} />;
};

export default ItemCounter;
