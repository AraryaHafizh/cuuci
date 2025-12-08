"use client";

import { Button } from "@/components/ui/button";

interface InfoRowProps {
  icon: React.ReactNode;
  label?: string;
  title?: string;
  value: string;
  endButtonIcon?: React.ReactNode;
  endButtonUrl?: string;
}

export function InfoCard({
  icon,
  label,
  title,
  value,
  endButtonIcon,
  endButtonUrl,
}: InfoRowProps) {
  return (
    <div className="flex items-center gap-4 text-sm font-light md:text-base">
      {icon}
      <div>
        <p className="text-xs opacity-50 md:text-sm">{label}</p>
        <p>{title}</p>
        <p>{value}</p>
      </div>
      {endButtonIcon && (
        <Button
          onClick={() => {
            const url = endButtonUrl;
            window.open(url, "_blank");
          }}
          className="ml-auto rounded-full"
          variant={"ghost"}
          size={"icon-lg"}
        >
          {endButtonIcon}
        </Button>
      )}
    </div>
  );
}

export function SummaryInfoCard({
  icon,
  title,
  value,
  endButtonIcon,
  endButtonUrl,
}: InfoRowProps) {
  return (
    <div className="flex items-center gap-4 font-light">
      {icon}
      <div>
        <p>{title}</p>
        <p className="text-sm opacity-50">{value}</p>
      </div>
      {endButtonIcon && (
        <Button
          onClick={() => {
            const url = endButtonUrl;
            window.open(url, "_blank");
          }}
          className="ml-auto rounded-full"
          variant={"ghost"}
          size={"icon-lg"}
        >
          {endButtonIcon}
        </Button>
      )}
    </div>
  );
}
