export interface SlotInfo {
  start: Date;
  end: Date;
  slots: Date[];
  action: "select" | "click" | "doubleClick";
}

export interface CalendarEvent {
  start: Date;
  end: Date;
  title: string;
}

export interface TimeRangeFormat {
  start: Date;
  end: Date;
}

export interface Messages {
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
  noEventsInRange: string;
  showMore: (total: number) => string;
}

export interface Stylist {
  id: string;
  name: string;
  specialty: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

export interface Appointment {
  id: string;
  title: string;
  start: Date;
  end: Date;
  stylistId: string;
  clientId: string;
  serviceId: string;
}

export interface EventDropData {
  event: Appointment;
  start: Date;
  end: Date;
  allDay: boolean;
}

export interface EventResizeData {
  event: Appointment;
  start: Date;
  end: Date;
}

export interface DragAndDropCalendarProps {
  onEventDrop: (data: EventDropData) => void;
  onEventResize: (data: EventResizeData) => void;
}

export type DateAccessor = string | ((event: Appointment) => Date);
export type EventPropGetter = (
  event: Appointment,
  start: Date,
  end: Date,
  isSelected: boolean
) => {
  className?: string;
  style?: React.CSSProperties;
};
