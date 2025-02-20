import React, { JSX } from "react";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTimeOptions } from "@/hooks/useTimeOptions";
import { cn } from "@/lib";
import { AppointmentFormProps } from "@/types";

export const DateTimeInput = ({
  formData,
  onChange,
}: AppointmentFormProps): JSX.Element => {
  const { hours, minutes } = useTimeOptions();

  return (
    <div className="space-y-2">
      <Label>Fecha y Hora *</Label>

      <div className="flex gap-2">
        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "flex-1 justify-start text-left font-normal",
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

        {/* Time Picker */}
        <Select
          value={formData.hour}
          onValueChange={(value): void => onChange("hour", value)}
        >
          <SelectTrigger className="w-16">
            <SelectValue placeholder="00" />
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
          <SelectTrigger className="w-16">
            <SelectValue placeholder="00" />
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
};

export default DateTimeInput;
