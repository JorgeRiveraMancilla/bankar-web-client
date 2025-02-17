import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { stylists, clients } from "@/data/mockData";
import { AppointmentFormProps } from "@/types/appointment-form";

export function AppointmentParticipants({
  formData,
  onChange,
}: AppointmentFormProps) {
  return (
    <>
      <div className="grid gap-2">
        <Label>Estilista *</Label>
        <Select
          value={formData.stylistId}
          onValueChange={(value): void => onChange("stylistId", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar estilista" />
          </SelectTrigger>
          <SelectContent>
            {stylists.map((stylist) => (
              <SelectItem key={stylist.id} value={stylist.id}>
                {stylist.name} - {stylist.specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label>Cliente *</Label>
        <Select
          value={formData.clientId}
          onValueChange={(value): void => onChange("clientId", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar cliente" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name} - {client.phone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
