import { es } from "date-fns/locale";

import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { AppointmentFormProps } from "@/types/appointment-form";

export function AppointmentDatePicker({
  formData,
  onChange,
}: AppointmentFormProps) {
  return (
    <div className="grid gap-2">
      <Label>Fecha *</Label>
      <Calendar
        mode="single"
        selected={formData.date}
        onSelect={(date): void => onChange("date", date)}
        className="rounded-md border mx-auto"
        locale={es}
        ISOWeek
      />
    </div>
  );
}
