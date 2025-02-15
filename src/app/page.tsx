import { JSX } from "react";

import CalendarWrapper from "@/components/CalendarWrapper";

export default function HomePage(): JSX.Element {
  return (
    <main className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Agenda de Citas</h1>

      <CalendarWrapper />
    </main>
  );
}
