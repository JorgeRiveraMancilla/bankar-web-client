import { startOfWeek, format, parse, getDay } from "date-fns";
import { es } from "date-fns/locale/es";
import { dateFnsLocalizer } from "react-big-calendar";

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    es: es,
  },
});
