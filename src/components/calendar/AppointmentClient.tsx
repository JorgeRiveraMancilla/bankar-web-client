import { Combobox } from "@/components/Combobox";
import { clients } from "@/data/mockData";
import { AppointmentFormProps } from "@/types/appointment-form";

export function AppointmentClient({
  formData,
  onChange,
}: AppointmentFormProps) {
  return (
    <Combobox
      label="Cliente *"
      value={formData.clientId}
      onChange={(value) => onChange("clientId", value)}
      items={clients}
      getDisplayValue={(client) =>
        client ? `${client.name} - ${client.phone}` : ""
      }
      getItemDisplayValue={(client) => `${client.name} - ${client.phone}`}
      getId={(client) => client.id}
      placeholder="Seleccionar cliente"
      searchPlaceholder="Buscar cliente..."
      emptyMessage="No se encontraron clientes."
    />
  );
}
