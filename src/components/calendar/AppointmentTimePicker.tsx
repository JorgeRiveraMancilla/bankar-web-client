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
    <div className="grid grid-cols-2 gap-4">
      <div className="grid gap-2">
        <Label>Hora *</Label>
        <Select
          value={formData.hour}
          onValueChange={(value): void => onChange("hour", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="HH" />
          </SelectTrigger>
          <SelectContent>
            {hours.map((hour) => (
              <SelectItem key={hour.value} value={hour.value}>
                {hour.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label>Minuto *</Label>
        <Select
          value={formData.minute}
          onValueChange={(value): void => onChange("minute", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="MM" />
          </SelectTrigger>
          <SelectContent>
            {minutes.map((minute) => (
              <SelectItem key={minute.value} value={minute.value}>
                {minute.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
