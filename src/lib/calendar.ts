import { addMinutes, setMinutes, setSeconds, setMilliseconds } from "date-fns";

import { Appointment } from "@/types";

// Colores para los estilistas
export const stylistColors: Record<
  string,
  { background: string; text: string }
> = {
  "1": { background: "#dbeafe", text: "#1e40af" }, // azul
  "2": { background: "#dcfce7", text: "#166534" }, // verde
  "3": { background: "#f3e8ff", text: "#6b21a8" }, // morado
};

export const roundToNearestFiveMinutes = (date: Date): Date => {
  const minutes = date.getMinutes();
  const roundedMinutes = Math.round(minutes / 5) * 5;
  return setMinutes(date, roundedMinutes);
};

export const getInitialTimeSlot = (date: Date): Date => {
  return setMilliseconds(setSeconds(date, 0), 0);
};

export const checkAppointmentOverlap = (
  appointments: Appointment[],
  newAppointment: Appointment,
  excludeId?: string
): boolean => {
  return appointments.some(
    (appointment) =>
      appointment.stylistId === newAppointment.stylistId &&
      appointment.id !== excludeId &&
      !(
        newAppointment.end <= appointment.start ||
        newAppointment.start >= appointment.end
      )
  );
};

export const getAppointmentStyle = (
  appointment: Appointment
): { style: React.CSSProperties } => {
  const color = stylistColors[appointment.stylistId];
  return {
    style: {
      backgroundColor: color.background,
      color: color.text,
      cursor: "move",
      border: `1px solid ${color.text}`,
      borderRadius: "4px",
    },
  };
};

export const MIN_APPOINTMENT_DURATION = 5; // minutos
export const DRAG_SNAP_DURATION = 5; // minutos

export const getValidResizeTime = (newTime: Date, originalTime: Date): Date => {
  const timeDiff = Math.abs(newTime.getTime() - originalTime.getTime());
  const minutesDiff = Math.round(timeDiff / (1000 * 60));
  const roundedMinutes = Math.round(minutesDiff / 5) * 5;
  return addMinutes(originalTime, roundedMinutes);
};
