import { JSX } from "react";

import { formatPrice } from "@/lib";
import { Appointment } from "@/types";

interface Props {
  event: Appointment;
}

export const Event = ({ event }: Props): JSX.Element => {
  return (
    <div className="h-full overflow-hidden">
      <div className="space-y-0.5">
        <div className="text-xs text-muted-foreground truncate">
          {event.service.fullName}
        </div>
        <div className="text-xs text-muted-foreground truncate">
          {event.client.name}
        </div>
        <div className="text-xs text-muted-foreground truncate">
          {formatPrice(event.service.price)}
        </div>
      </div>
    </div>
  );
};
