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

interface AppointmentModalProps {
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
}: AppointmentModalProps): JSX.Element | null {
  const { formData, error, handleChange, handleSubmit } = useAppointmentForm(
    selectedDate,
    appointment,
    onSubmit,
    onClose
  );

  if (!selectedDate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:h-auto h-screen w-full md:w-auto p-6 pt-9 overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-background pb-4 z-10 border-b md:border-none">
          <DialogTitle>
            {appointment ? "Editar Cita" : "Nueva Cita"}
          </DialogTitle>
          <DialogDescription>
            Completa los detalles de la cita. Los campos con * son obligatorios.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 p-4 md:p-0 flex-1">
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
}
