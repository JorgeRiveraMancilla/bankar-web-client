import { Appointment } from "./appointments";

export type CalendarView = "month" | "week" | "day" | "agenda";

export type SlotInfo = {
  start: Date;
  end: Date;
  slots: Date[];
  action: "select" | "click" | "doubleClick";
};

export type CalendarNavigationAction = "PREV" | "NEXT" | "TODAY" | "DATE";

export type NavigationButtonState = {
  today: boolean;
  prev: boolean;
  next: boolean;
};

export type CalendarMessages = {
  allDay: string;
  previous: string;
  next: string;
  today: string;
  month: string;
  week: string;
  day: string;
  agenda: string;
  date: string;
  time: string;
  event: string;
  work_week: string;
  noEventsInRange: string;
  showMore: (total: number) => string;
} & Record<CalendarView, string>;

export type CustomFormats = {
  monthHeaderFormat: (date: Date) => string;
  weekdayFormat: (date: Date) => string;
  dateFormat: (date: Date) => string;
  dayRangeHeaderFormat: (range: { start: Date; end: Date }) => string;
  dayFormat: (date: Date) => string;
  dayHeaderFormat: (date: Date) => string;
  agendaHeaderFormat: (range: { start: Date; end: Date }) => string;
};

export type EventInteractionInfo = {
  event: Appointment;
  start: Date;
  end: Date;
};
