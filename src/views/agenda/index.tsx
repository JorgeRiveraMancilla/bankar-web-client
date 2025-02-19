import { JSX } from "react";

import { CalendarWrapper } from "./calendar-wrapper/CalendarWrapper";

export const AgendaView = (): JSX.Element => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Agenda</h1>

      <CalendarWrapper />
    </>
  );
};
