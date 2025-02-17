export const CALENDAR_CONSTANTS = {
  BUSINESS_HOURS: {
    START: new Date(0, 0, 0, 9, 0, 0), // 9:00 AM
    END: new Date(0, 0, 0, 19, 0, 0), // 7:00 PM
  },
  TIME_SLOTS: {
    STEP_MINUTES: 5,
    SLOTS_PER_STEP: 12,
  },
  VIEWS: {
    DEFAULT_MOBILE: "day" as const,
    DEFAULT_DESKTOP: "week" as const,
    AVAILABLE: ["month", "week", "day", "agenda"] as const,
  },
  BREAKPOINTS: {
    MOBILE: 768, // Punto de quiebre para móvil en píxeles
  },
  DEFAULT_APPOINTMENT_DURATION: 30, // Duración predeterminada de cita en minutos
  MIN_APPOINTMENT_DURATION: 5, // Duración mínima de cita en minutos
  MAX_APPOINTMENT_DURATION: 480, // Duración máxima de cita en minutos (8 horas)
} as const;

export type CalendarView = (typeof CALENDAR_CONSTANTS.VIEWS.AVAILABLE)[number];

export type NavigationButtonType = "today" | "prev" | "next";

export type AppointmentDuration = {
  min: typeof CALENDAR_CONSTANTS.MIN_APPOINTMENT_DURATION;
  max: typeof CALENDAR_CONSTANTS.MAX_APPOINTMENT_DURATION;
  default: typeof CALENDAR_CONSTANTS.DEFAULT_APPOINTMENT_DURATION;
};
