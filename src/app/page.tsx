import { JSX } from "react";

import CalendarWrapper from "@/components/CalendarWrapper";

export default function HomePage(): JSX.Element {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Calendario</h1>

      <CalendarWrapper />
    </>
  );
}
