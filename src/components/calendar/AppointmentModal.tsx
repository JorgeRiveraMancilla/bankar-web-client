import { JSX } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppointmentForm } from "@/hooks/useAppointmentForm";
import { Appointment } from "@/types";

import { AppointmentDatePicker } from "./AppointmentDatePicker";
import { AppointmentParticipants } from "./AppointmentParticipants";
import { AppointmentService } from "./AppointmentService";
import { AppointmentTimePicker } from "./AppointmentTimePicker";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onSubmit: (appointment: Appointment) => void;
  appointment: Appointment | null;
}

export function AppointmentModal({
  isOpen,
  onClose,
  selectedDate,
  onSubmit,
  appointment,
}: Props): JSX.Element | null {
  const { formData, error, handleChange, handleSubmit } = useAppointmentForm(
    selectedDate,
    appointment,
    onSubmit,
    onClose
  );

  if (!selectedDate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[90%] sm:max-w-[425px] mx-auto my-4">
        <DialogHeader>
          <DialogTitle>
            {appointment ? "Editar Cita" : "Nueva Cita"}
          </DialogTitle>
          <DialogDescription>
            Completa los detalles de la cita. Los campos con * son obligatorios.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* DatePicker */}
          <AppointmentDatePicker formData={formData} onChange={handleChange} />

          {/* TimePicker */}
          <AppointmentTimePicker formData={formData} onChange={handleChange} />

          {/* Participants (Stylist & Client) */}
          <AppointmentParticipants
            formData={formData}
            onChange={handleChange}
          />

          {/* Service Selection */}
          <AppointmentService formData={formData} onChange={handleChange} />
        </div>

        <div className="border-t pt-4">
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
}
