import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { services } from "@/data/mockData";
import { Service } from "@/types";

import { ServiceForm } from "../forms/ServiceForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  mode: "new" | "edit";
  serviceId?: number;
  categoryId?: number;
}

export const ServiceDialog = ({
  isOpen,
  onClose,
  mode,
  serviceId,
  categoryId,
}: Props) => {
  // Si es modo edición, obtener el servicio existente
  let service: Service | undefined;

  if (mode === "edit" && serviceId) {
    service = services.find((s) => s.id === serviceId);
  } else {
    // Si es modo nuevo, crear un servicio temporal
    service = {
      id: 0, // Se asignará al guardar
      categoryId: categoryId ?? 0,
      duration: 30,
      price: 0,
      isActive: true,
      fullName: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  const handleSave = (service: Service) => {
    console.log("Guardando servicio:", service);
    onClose();
  };

  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "new" ? "Nuevo Servicio" : "Editar Servicio"}
          </DialogTitle>
        </DialogHeader>
        <ServiceForm service={service} onSave={handleSave} />
      </DialogContent>
    </Dialog>
  );
};
