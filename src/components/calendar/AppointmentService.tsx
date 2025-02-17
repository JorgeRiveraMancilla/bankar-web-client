import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services } from "@/data/mockData";
import { AppointmentFormProps } from "@/types/appointment-form";

export function AppointmentService({
  formData,
  onChange,
}: AppointmentFormProps) {
  return (
    <div className="grid gap-2">
      <Label>Servicio *</Label>
      <Select
        value={formData.serviceId}
        onValueChange={(value): void => onChange("serviceId", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar servicio" />
        </SelectTrigger>
        <SelectContent>
          {services.map((service) => (
            <SelectItem key={service.id} value={service.id}>
              {service.name} - {service.duration} min - ${service.price}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
