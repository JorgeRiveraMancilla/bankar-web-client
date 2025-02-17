import { format } from "date-fns";
import { es } from "date-fns/locale/es";

import { capitalizeFirst, capitalizeWords } from "@/lib";

export const customFormats = {
  // Month view
  monthHeaderFormat: (date: Date) =>
    capitalizeFirst(format(date, "MMMM 'de' yyyy", { locale: es })),
  weekdayFormat: (date: Date) =>
    capitalizeFirst(format(date, "EEEE", { locale: es })),
  dateFormat: (date: Date) => format(date, "dd", { locale: es }),

  // Week views
  dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
    capitalizeWords(
      `${format(start, "dd 'de' MMMM", { locale: es })} - ${format(
        end,
        "dd 'de' MMMM",
        { locale: es }
      )}`,
      ["de"]
    ),
  dayFormat: (date: Date) =>
    capitalizeFirst(format(date, "EEEE dd", { locale: es })),

  // Day view
  dayHeaderFormat: (date: Date) =>
    capitalizeWords(format(date, "EEEE dd 'de' MMMM", { locale: es }), ["de"]),

  // Agenda view
  agendaHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
    capitalizeWords(
      `${format(start, "dd 'de' MMMM 'de' yyyy", { locale: es })} - ${format(
        end,
        "dd 'de' MMMM 'de' yyyy",
        { locale: es }
      )}`,
      ["de"]
    ),
};
