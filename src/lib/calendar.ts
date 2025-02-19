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

const hexToRGBA = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getAppointmentStyle = (
  appointment: Appointment
): { style: React.CSSProperties } => {
  const color = appointment.stylist.color;
  const backgroundColor = hexToRGBA(color, 0.15);

  return {
    style: {
      backgroundColor,
      color,
      cursor: "move",
      border: `2px solid ${color}`,
      borderRadius: "4px",
      padding: "2px 4px",
    },
  };
};
