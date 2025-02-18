import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTimeOptions } from "@/hooks/useTimeOptions";
import { AppointmentFormProps } from "@/types/appointment-form";

export function AppointmentTimePicker({
  formData,
  onChange,
}: AppointmentFormProps) {
  const { hours, minutes } = useTimeOptions();

  return (
    <div className="grid gap-2">
      <Label>Hora *</Label>
      <div className="flex gap-2">
        <Select
          value={formData.hour}
          onValueChange={(value): void => onChange("hour", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Hora" />
          </SelectTrigger>
          <SelectContent>
            {hours.map((hour) => (
              <SelectItem key={hour.value} value={hour.value}>
                {hour.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={formData.minute}
          onValueChange={(value): void => onChange("minute", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Minuto" />
          </SelectTrigger>
          <SelectContent>
            {minutes.map((minute) => (
              <SelectItem key={minute.value} value={minute.value}>
                {minute.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
