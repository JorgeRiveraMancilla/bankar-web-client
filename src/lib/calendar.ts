import { setMinutes } from "date-fns";

import { Appointment } from "@/types";

export const stylistColors: Record<
  string,
  { background: string; text: string }
> = {
  "1": { background: "#dbeafe", text: "#1e40af" },
  "2": { background: "#dcfce7", text: "#166534" },
  "3": { background: "#f3e8ff", text: "#6b21a8" },
};

export const roundToNearestFiveMinutes = (date: Date): Date => {
  const minutes = date.getMinutes();
  const roundedMinutes = Math.round(minutes / 5) * 5;
  return setMinutes(date, roundedMinutes);
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
