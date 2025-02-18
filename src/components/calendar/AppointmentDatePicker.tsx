import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib";
import { AppointmentFormProps } from "@/types/appointment-form";

export function AppointmentDatePicker({
  formData,
  onChange,
}: AppointmentFormProps) {
  return (
    <div className="grid gap-2">
      <Label>Fecha *</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !formData.date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formData.date ? (
              format(formData.date, "PPP", { locale: es })
            ) : (
              <span>Seleccionar fecha</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            mode="single"
            selected={formData.date}
            onSelect={(date): void => onChange("date", date)}
            locale={es}
            ISOWeek
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
