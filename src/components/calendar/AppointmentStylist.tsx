import { Combobox } from "@/components/Combobox";
import { stylists } from "@/data/mockData";
import { AppointmentFormProps } from "@/types/appointment-form";

export function AppointmentStylist({
  formData,
  onChange,
}: AppointmentFormProps) {
  return (
    <Combobox
      label="Estilista *"
      value={formData.stylistId}
      onChange={(value) => onChange("stylistId", value)}
      items={stylists}
      getDisplayValue={(stylist) =>
        stylist ? `${stylist.name} - ${stylist.specialty}` : ""
      }
      getItemDisplayValue={(stylist) =>
        `${stylist.name} - ${stylist.specialty}`
      }
      getId={(stylist) => stylist.id}
      placeholder="Seleccionar estilista"
      searchPlaceholder="Buscar estilista..."
      emptyMessage="No se encontraron estilistas."
    />
  );
}
