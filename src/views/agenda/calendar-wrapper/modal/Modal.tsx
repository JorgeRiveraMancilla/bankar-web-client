import { JSX } from "react";

import { Pencil, Trash2, X, Calendar } from "lucide-react";

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
  onDelete: (appointmentId: string) => void;
  appointment: Appointment | null;
}

export const Modal = ({
  isOpen,
  onClose,
  selectedDate,
  onSubmit,
  onDelete,
  appointment,
}: Props): JSX.Element | null => {
  const { formData, error, handleChange, handleSubmit } = useAppointmentForm(
    selectedDate,
    appointment,
    onSubmit,
    onClose
  );

  const handleDelete = () => {
    if (appointment) {
      onDelete(appointment.id);
      onClose();
    }
  };

  if (!selectedDate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[700px] my-4">
        <DialogHeader>
          <DialogTitle className="text-center">
            {appointment ? (
              <>
                <Pencil className="inline-block w-5 h-5 mr-2" />
                Editar Cita
              </>
            ) : (
              <>
                <Calendar className="inline-block w-5 h-5 mr-2" />
                Nueva Cita
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <DateTimeInput formData={formData} onChange={handleChange} />
          <ServiceInput formData={formData} onChange={handleChange} />
          <StylistInput formData={formData} onChange={handleChange} />
          <ClientInput formData={formData} onChange={handleChange} />
        </div>

        {error && (
          <p className="text-sm text-red-500 font-medium mb-4">{error}</p>
        )}

        <div className="flex justify-end gap-2">
          <div className="flex-1">
            {appointment && (
              <Button
                variant="destructive"
                onClick={handleDelete}
                type="button"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar Cita
              </Button>
            )}
          </div>
          <Button variant="outline" onClick={onClose} type="button">
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleSubmit} type="submit">
            {appointment ? (
              <Pencil className="w-4 h-4 mr-2" />
            ) : (
              <Calendar className="w-4 h-4 mr-2" />
            )}
            {appointment ? "Actualizar" : "Agendar"} Cita
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
