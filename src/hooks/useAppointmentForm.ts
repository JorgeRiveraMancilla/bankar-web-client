import { useState, useEffect } from "react";

import { format } from "date-fns";

import { services, clients, stylists } from "@/data/mockData";
import { roundToNearestFiveMinutes } from "@/lib";
import { Appointment, AppointmentFormData } from "@/types";

export const useAppointmentForm = (
  selectedDate: Date | null,
  appointment: Appointment | null,
  onSubmit: (appointment: Appointment) => void,
  onClose: () => void
) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
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
          stylistId: appointment.stylist.id,
          clientId: appointment.client.id,
          serviceId: appointment.service.id.toString(),
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
    field: keyof AppointmentFormData,
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

    const selectedService = services.find(
      (s) => s.id.toString() === formData.serviceId
    );
    const selectedClient = clients.find((c) => c.id === formData.clientId);
    const selectedStylist = stylists.find((s) => s.id === formData.stylistId);

    if (!selectedService || !selectedClient || !selectedStylist) {
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
      title: `${selectedService.fullName} - ${selectedClient.name}`,
      start: roundedStart,
      end,
      stylist: selectedStylist,
      client: selectedClient,
      service: selectedService,
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
};
