import { useState, useEffect, JSX } from "react";

import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { stylists, clients, services } from "@/data/mockData";
import { roundToNearestFiveMinutes } from "@/lib";
import { Appointment } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onSubmit: (appointment: Appointment) => void;
  appointment?: Appointment | null;
}

interface FormData {
  stylistId: string;
  clientId: string;
  serviceId: string;
  date: Date | undefined;
  hour: string;
  minute: string;
}

export const AppointmentModal = ({
  isOpen,
  onClose,
  selectedDate,
  onSubmit,
  appointment,
}: Props): JSX.Element | null => {
  const [formData, setFormData] = useState<FormData>({
    stylistId: "",
    clientId: "",
    serviceId: "",
    date: undefined,
    hour: "",
    minute: "",
  });

  const [error, setError] = useState<string | null>(null);

  // Generate hours (9:00 - 19:00)
  const hours = Array.from({ length: 11 }, (_, i) => {
    const hour = i + 9;
    return {
      value: hour.toString().padStart(2, "0"),
      label: hour.toString().padStart(2, "0") + ":00",
    };
  });

  // Generate minutes (0-55 in steps of 5)
  const minutes = Array.from({ length: 12 }, (_, i) => {
    const minute = i * 5;
    return {
      value: minute.toString().padStart(2, "0"),
      label: minute.toString().padStart(2, "0"),
    };
  });

  useEffect(() => {
    if (isOpen && selectedDate) {
      const roundedDate = roundToNearestFiveMinutes(selectedDate);

      if (appointment) {
        setFormData({
          stylistId: appointment.stylistId,
          clientId: appointment.clientId,
          serviceId: appointment.serviceId,
          date: roundedDate,
          hour: format(roundedDate, "HH"),
          minute: format(roundedDate, "mm"),
        });
      } else {
        setFormData({
          stylistId: "",
          clientId: "",
          serviceId: "",
          date: roundedDate,
          hour: format(roundedDate, "HH"),
          minute: format(roundedDate, "mm"),
        });
      }
      setError(null);
    }
  }, [isOpen, selectedDate, appointment]);

  const handleSubmit = (): void => {
    if (
      !formData.stylistId ||
      !formData.clientId ||
      !formData.serviceId ||
      !formData.date
    ) {
      setError("Por favor completa todos los campos");
      return;
    }

    const selectedService = services.find((s) => s.id === formData.serviceId);
    const selectedClient = clients.find((c) => c.id === formData.clientId);

    if (!selectedService || !selectedClient) {
      setError("Error al crear la cita");
      return;
    }

    const start = new Date(formData.date);
    start.setHours(parseInt(formData.hour), parseInt(formData.minute));
    const roundedStart = roundToNearestFiveMinutes(start);
    const end = new Date(
      roundedStart.getTime() + selectedService.duration * 60000
    );

    const newAppointment: Appointment = {
      id: appointment?.id || Date.now().toString(),
      title: `${selectedService.name} - ${selectedClient.name}`,
      start: roundedStart,
      end,
      stylistId: formData.stylistId,
      clientId: formData.clientId,
      serviceId: formData.serviceId,
    };

    onSubmit(newAppointment);
    onClose();
  };

  if (!selectedDate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:h-auto h-screen w-full md:w-auto p-0 md:p-6 overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-background p-4 md:p-0 md:pb-4 z-10 border-b md:border-none">
          <DialogTitle>
            {appointment ? "Editar Cita" : "Nueva Cita"}
          </DialogTitle>
          <DialogDescription>
            Completa los detalles de la cita. Los campos con * son obligatorios.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 p-4 md:p-0 flex-1">
          <div className="grid gap-2">
            <Label>Fecha *</Label>
            <Calendar
              mode="single"
              selected={formData.date}
              onSelect={(date): void =>
                setFormData((prev) => ({ ...prev, date }))
              }
              className="rounded-md border mx-auto"
              locale={es}
              ISOWeek
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Hora *</Label>
              <Select
                value={formData.hour}
                onValueChange={(value): void =>
                  setFormData((prev) => ({ ...prev, hour: value }))
                }
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
                onValueChange={(value): void =>
                  setFormData((prev) => ({ ...prev, minute: value }))
                }
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

          <div className="grid gap-2">
            <Label>Estilista *</Label>
            <Select
              value={formData.stylistId}
              onValueChange={(value): void =>
                setFormData((prev) => ({ ...prev, stylistId: value }))
              }
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
              onValueChange={(value): void =>
                setFormData((prev) => ({ ...prev, clientId: value }))
              }
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

          <div className="grid gap-2">
            <Label>Servicio *</Label>
            <Select
              value={formData.serviceId}
              onValueChange={(value): void =>
                setFormData((prev) => ({ ...prev, serviceId: value }))
              }
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
        </div>

        <div className="sticky bottom-0 bg-background p-4 md:p-0 md:pt-4 border-t">
          {error && (
            <p className="text-sm text-red-500 font-medium mb-4">{error}</p>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} type="button">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} type="submit">
              {appointment ? "Actualizar" : "Agendar"} Cita
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
