import { JSX } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppointmentForm } from "@/hooks/useAppointmentForm";
import { Appointment } from "@/types";

import { ClientInput } from "./ClientInput";
import { DateTimeInput } from "./DateTimeInput";
import { ServiceInput } from "./ServiceInput";
import { StylistInput } from "./StylistInput";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onSubmit: (appointment: Appointment) => void;
  appointment: Appointment | null;
}

export const Modal = ({
  isOpen,
  onClose,
  selectedDate,
  onSubmit,
  appointment,
}: Props): JSX.Element | null => {
  const { formData, error, handleChange, handleSubmit } = useAppointmentForm(
    selectedDate,
    appointment,
    onSubmit,
    onClose
  );

  if (!selectedDate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[700px] my-4">
        <DialogHeader>
          <DialogTitle className="text-center">
            {appointment ? "Editar Cita" : "Nueva Cita"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Date Time */}
          <DateTimeInput formData={formData} onChange={handleChange} />

          {/* Service */}
          <ServiceInput formData={formData} onChange={handleChange} />

          {/* Stylist */}
          <StylistInput formData={formData} onChange={handleChange} />

          {/* Client */}
          <ClientInput formData={formData} onChange={handleChange} />
        </div>

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
      </DialogContent>
    </Dialog>
  );
};
