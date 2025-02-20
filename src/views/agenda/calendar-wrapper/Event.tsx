import { Appointment } from "@/types";

interface Props {
  event: Appointment;
}

export const Event = ({ event }: Props) => {
  const formattedPrice = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(event.service.price);

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
          {formattedPrice}
        </div>
      </div>
    </div>
  );
};
