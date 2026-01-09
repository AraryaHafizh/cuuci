"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { useState } from "react";
import { LoadingAnimation } from "./ui/loading-animation";
import { useNotification } from "@/hooks/notification/useNotification";

export function NotificationBadge() {
  const [open, setOpen] = useState(false);
  const { data, isPending } = useNotification({ params: { limit: 5 } });

  const count = data?.length;

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />

          {count > 0 && (
            <Badge className="absolute -top-2 -right-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
              {count}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-4">
        <DropdownMenuLabel className="text-lg font-medium">
          Notifications
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="mb-4" />

        {isPending ? (
          <div className="flex h-35 items-center justify-center">
            <LoadingAnimation />
          </div>
        ) : count === 0 ? (
          <p className="text-muted-foreground flex h-35 items-center justify-center text-sm">
            No new notifications
          </p>
        ) : (
          <div className="space-y-4">
            {data.map((item: any, i: number) => {
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
                    <Bell className="fill-primary text-primary w-4.5" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-muted-foreground line-clamp-1 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
