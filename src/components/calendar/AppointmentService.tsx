import { Combobox } from "@/components/Combobox";
import { services } from "@/data/mockData";
import { AppointmentFormProps } from "@/types/appointment-form";

export function AppointmentService({
  formData,
  onChange,
}: AppointmentFormProps) {
  return (
    <Combobox
      label="Servicio *"
      value={formData.serviceId}
      onChange={(value) => onChange("serviceId", value)}
      items={services}
      getDisplayValue={(service) =>
        service
          ? `${service.name} - ${service.duration} min - $${service.price}`
          : ""
      }
      getItemDisplayValue={(service) =>
        `${service.name} - ${service.duration} min - $${service.price}`
      }
      getId={(service) => service.id}
      placeholder="Seleccionar servicio"
      searchPlaceholder="Buscar servicio..."
      emptyMessage="No se encontraron servicios."
    />
  );
}
