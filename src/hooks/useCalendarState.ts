import { useState, useCallback } from "react";

import { SlotInfo } from "react-big-calendar";

import { roundToNearestFiveMinutes } from "@/lib";
import { Appointment } from "@/types";

export function useCalendarState() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const handleSelectSlot = useCallback((slotInfo: SlotInfo): void => {
    const roundedStart = roundToNearestFiveMinutes(new Date(slotInfo.start));
    setSelectedSlot(roundedStart);
    setSelectedAppointment(null);
    setIsModalOpen(true);
  }, []);

  const handleSelectEvent = useCallback((event: Appointment): void => {
    setSelectedAppointment(event);
    setSelectedSlot(new Date(event.start));
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback((): void => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  }, []);

  return {
    isModalOpen,
    selectedSlot,
    selectedAppointment,
    handleSelectSlot,
    handleSelectEvent,
    handleModalClose,
  };
}
