import { setMinutes } from "date-fns";

import { Appointment } from "@/types";

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
      appointment.stylist.id === newAppointment.stylist.id &&
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
  const color = appointment.stylist.color;

  return {
    style: {
      backgroundColor: "white",
      backgroundImage: `linear-gradient(${color}15, ${color}15)`,
      border: `2px solid ${color}`,
      color: color,
    },
  };
};
