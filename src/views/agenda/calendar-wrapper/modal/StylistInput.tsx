import { JSX } from "react";

import { Combobox } from "@/components/combobox/Combobox";
import { stylists } from "@/data/mockData";
import { Stylist, AppointmentFormProps } from "@/types";

export const StylistInput = ({
  formData,
  onChange,
}: AppointmentFormProps): JSX.Element => {
  const formatStylistDisplay = (stylist: Stylist): string => {
    return stylist.name;
  };

  return (
    <Combobox
      label="Estilista *"
      value={formData.stylistId}
      onChange={(value) => onChange("stylistId", value)}
      items={stylists}
      getDisplayValue={(stylist) =>
        stylist ? formatStylistDisplay(stylist) : ""
      }
      getItemDisplayValue={formatStylistDisplay}
      getId={(stylist) => stylist.id}
      placeholder="Seleccionar estilista"
      searchPlaceholder="Buscar estilista..."
      emptyMessage="No se encontraron estilistas."
    />
  );
};
