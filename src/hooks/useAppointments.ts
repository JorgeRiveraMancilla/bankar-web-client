import { useState, useCallback, useEffect, useMemo } from "react";

import { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";

import { appointments as mockAppointments } from "@/data/mockData";
import {
  checkAppointmentOverlap,
  roundToNearestFiveMinutes,
  getAppointmentStyle,
} from "@/lib";
import { Appointment, Stylist } from "@/types";

export const useAppointments = (
  selectedAppointment: Appointment | null,
  stylists: Stylist[]
) => {
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments);

  const visibleAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const stylist = stylists.find((s) => s.id === appointment.stylist.id);
      return stylist?.isVisible ?? false;
    });
  }, [appointments, stylists]);

  useEffect(() => {
    setAppointments((prev) =>
      prev.map((appointment) => {
        const updatedStylist = stylists.find(
          (s) => s.id === appointment.stylist.id
        );
        return updatedStylist
          ? { ...appointment, stylist: updatedStylist }
          : appointment;
      })
    );
  }, [stylists]);

  const handleEventDrop = useCallback(
    ({ event, start, end }: EventInteractionArgs<Appointment>): void => {
      const roundedStart = roundToNearestFiveMinutes(new Date(start));
      const roundedEnd = roundToNearestFiveMinutes(new Date(end));

      const updatedAppointment: Appointment = {
        ...event,
        start: roundedStart,
        end: roundedEnd,
      };

      if (checkAppointmentOverlap(appointments, updatedAppointment, event.id)) {
        console.log("Superposición de citas detectada");
        return;
      }

      setAppointments((prev) =>
        prev.map((apt) => (apt.id === event.id ? updatedAppointment : apt))
      );
    },
    [appointments]
  );

  const handleEventResize = useCallback(
    ({ event, start, end }: EventInteractionArgs<Appointment>): void => {
      const roundedStart = roundToNearestFiveMinutes(new Date(start));
      const roundedEnd = roundToNearestFiveMinutes(new Date(end));

      const updatedAppointment: Appointment = {
        ...event,
        start: roundedStart,
        end: roundedEnd,
      };

      if (checkAppointmentOverlap(appointments, updatedAppointment, event.id)) {
        console.log("Conflicto en la nueva duración");
        return;
      }

      setAppointments((prev) =>
        prev.map((apt) => (apt.id === event.id ? updatedAppointment : apt))
      );
    },
    [appointments]
  );

  const addOrUpdateAppointment = useCallback(
    (newAppointment: Appointment): void => {
      if (selectedAppointment) {
        setAppointments((prev) =>
          prev.map((apt) =>
            apt.id === selectedAppointment.id ? newAppointment : apt
          )
        );
      } else {
        if (checkAppointmentOverlap(appointments, newAppointment)) {
          console.log("Superposición detectada al crear nueva cita");
          return;
        }
        setAppointments((prev) => [...prev, newAppointment]);
      }
    },
    [appointments, selectedAppointment]
  );

  const eventPropGetter = useCallback(
    (event: Appointment) => getAppointmentStyle(event),
    []
  );

  const deleteAppointment = useCallback((appointmentId: string): void => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== appointmentId));
  }, []);

  return {
    appointments: visibleAppointments,
    handleEventDrop,
    handleEventResize,
    addOrUpdateAppointment,
    deleteAppointment,
    eventPropGetter,
  };
};
