import { useState, useEffect } from "react";

import { format } from "date-fns";

import { services, clients } from "@/data/mockData";
import { roundToNearestFiveMinutes } from "@/lib";
import { Appointment } from "@/types";
import { FormData } from "@/types/appointment-form";

export function useAppointmentForm(
  selectedDate: Date | null,
  appointment: Appointment | null,
  onSubmit: (appointment: Appointment) => void,
  onClose: () => void
) {
  const [formData, setFormData] = useState<FormData>({
    stylistId: "",
    clientId: "",
    serviceId: "",
    date: undefined,
    hour: "",
    minute: "",
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDate) {
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
  }, [selectedDate, appointment]);

  const handleChange = (
    field: keyof FormData,
    value: string | Date | undefined
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = () => {
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

  return {
    formData,
    error,
    handleChange,
    handleSubmit,
  };
}
