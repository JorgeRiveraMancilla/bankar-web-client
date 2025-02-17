import { JSX } from "react";

import CalendarWrapper from "@/components/calendar/CalendarWrapper";

export const AgendaView = (): JSX.Element => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Calendario</h1>

      <CalendarWrapper />
    </>
  );
};
