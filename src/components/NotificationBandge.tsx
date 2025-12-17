import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Inbox, CalendarCheck2 } from "lucide-react";

const iconMap = {
  calendar: Calendar,
  inbox: Inbox,
  "calendar-check": CalendarCheck2,
};

export type NotificationItem = {
  id: string;
  title: string;
  time: string;
  icon: "calendar" | "inbox" | "calendar-check";
};

interface NotificationBadgeProps {
  notifications: NotificationItem[];
}

export function NotificationBadge({ notifications }: NotificationBadgeProps) {
  const count = notifications.length;

  return (
    <DropdownMenu>
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
        <DropdownMenuLabel className="mb-2 text-lg font-medium">
          Notifications
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-2" />

        {count === 0 ? (
          <p className="text-muted-foreground text-sm">No notifications</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((item) => {
              const Icon = iconMap[item.icon];

              return (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-muted-foreground text-sm">{item.time}</p>
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
