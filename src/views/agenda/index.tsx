"use client";

import { JSX } from "react";

import { useStylists } from "@/hooks/useStylists";

import { CalendarWrapper } from "./calendar-wrapper/CalendarWrapper";
import { Legends } from "./legends/Legends";

export const AgendaView = (): JSX.Element => {
  const { stylists, handleStylistUpdate } = useStylists();

  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold">Agenda</h1>

        <Legends stylists={stylists} onStylistUpdate={handleStylistUpdate} />
      </div>

      <CalendarWrapper stylists={stylists} />
    </>
  );
};
