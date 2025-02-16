"use client";

import { JSX, useCallback, useState, useEffect, ReactNode } from "react";

import {
  startOfWeek,
  format,
  parse,
  getDay,
  startOfDay,
  isToday,
  isBefore,
  isAfter,
} from "date-fns";
import { es } from "date-fns/locale/es";
import {
  Calendar,
  dateFnsLocalizer,
  View,
  Views,
  EventPropGetter,
  ToolbarProps,
} from "react-big-calendar";
import withDragAndDrop, {
  EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "@/styles/calendar.css";

import { appointments as mockAppointments } from "@/data/mockData";
import {
  checkAppointmentOverlap,
  roundToNearestFiveMinutes,
  getAppointmentStyle,
} from "@/lib";
import { Appointment, SlotInfo } from "@/types";

import { AppointmentModal } from "./AppointmentModal";

const DragAndDropCalendar = withDragAndDrop<Appointment>(Calendar);

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    es: es,
  },
});

const customFormats = {
  // Month view
  monthHeaderFormat: (date: Date) =>
    format(date, "MMMM 'de' yyyy", { locale: es }),
  weekdayFormat: (date: Date) => format(date, "EEEE", { locale: es }),
  dateFormat: (date: Date) => format(date, "dd", { locale: es }),

  // Week views
  dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
    `${format(start, "dd 'de' MMMM", { locale: es })} - ${format(
      end,
      "dd 'de' MMMM",
      { locale: es }
    )}`,
  dayFormat: (date: Date) => format(date, "EEEE dd", { locale: es }),

  // Day view
  dayHeaderFormat: (date: Date) =>
    format(date, "EEEE dd 'de' MMMM", { locale: es }),

  // Agenda view
  agendaHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
    `${format(start, "dd 'de' MMMM 'de' yyyy", { locale: es })} - ${format(
      end,
      "dd 'de' MMMM 'de' yyyy",
      { locale: es }
    )}`,
};

type CalendarView = "month" | "week" | "day" | "agenda";

type CalendarMessages = {
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

const messages: CalendarMessages = {
  allDay: "Todo el día",
  previous: "Anterior",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  work_week: "Semana laboral",
  noEventsInRange: "No hay eventos en este rango.",
  showMore: (total: number) => `+ Ver más (${total})`,
};

export default function CalendarWrapper(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments);
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const setInitialView = (): void => {
      const isMobile = window.innerWidth < 768;
      setView(isMobile ? Views.DAY : Views.WEEK);
    };

    setInitialView();
    window.addEventListener("resize", setInitialView);

    return () => {
      window.removeEventListener("resize", setInitialView);
    };
  }, []);

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

  const handleNavigate = useCallback((newDate: Date): void => {
    setDate(newDate);
  }, []);

  const handleViewChange = useCallback((newView: View): void => {
    setView(newView);
  }, []);

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

  const getNavigationButtonState = useCallback(
    (buttonType: "today" | "prev" | "next"): boolean => {
      const today = startOfDay(new Date());
      const currentDate = startOfDay(date);

      switch (buttonType) {
        case "today":
          return isToday(currentDate);
        case "prev":
          return isBefore(currentDate, today);
        case "next":
          return isAfter(currentDate, today);
        default:
          return false;
      }
    },
    [date]
  );

  const eventPropGetter: EventPropGetter<Appointment> = useCallback(
    (event) => getAppointmentStyle(event),
    []
  );

  return (
    <>
      <DragAndDropCalendar
        style={{ height: "calc(100vh - 8rem)" }}
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        selectable
        resizable
        step={5}
        timeslots={12}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        view={view}
        onView={handleViewChange}
        date={date}
        onNavigate={handleNavigate}
        min={new Date(0, 0, 0, 9, 0, 0)}
        max={new Date(0, 0, 0, 19, 0, 0)}
        culture="es"
        formats={customFormats}
        views={["month", "week", "day", "agenda"]}
        messages={messages}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        eventPropGetter={eventPropGetter}
        draggableAccessor={() => true}
        resizableAccessor={() => true}
        components={{
          toolbar: (toolbarProps: ToolbarProps<Appointment, object>) => (
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
                <button
                  type="button"
                  onClick={() => toolbarProps.onNavigate("PREV")}
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                    getNavigationButtonState("prev")
                      ? "bg-background text-foreground shadow"
                      : ""
                  }`}
                >
                  {messages.previous}
                </button>

                <button
                  type="button"
                  onClick={() => toolbarProps.onNavigate("TODAY")}
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                    getNavigationButtonState("today")
                      ? "bg-background text-foreground shadow"
                      : ""
                  }`}
                >
                  {messages.today}
                </button>

                <button
                  type="button"
                  onClick={() => toolbarProps.onNavigate("NEXT")}
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                    getNavigationButtonState("next")
                      ? "bg-background text-foreground shadow"
                      : ""
                  }`}
                >
                  {messages.next}
                </button>
              </span>

              <span className="text-lg font-semibold mx-4">
                {toolbarProps.label}
              </span>

              <span className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
                {(toolbarProps.views as CalendarView[]).map((name: string) => (
                  <button
                    key={name}
                    type="button"
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                      view === name
                        ? "bg-background text-foreground shadow"
                        : ""
                    }`}
                    onClick={() => toolbarProps.onView(name as CalendarView)}
                  >
                    {messages[name as keyof CalendarMessages] as ReactNode}
                  </button>
                ))}
              </span>
            </div>
          ),
        }}
      />

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={(): void => {
          setIsModalOpen(false);
          setSelectedAppointment(null);
        }}
        selectedDate={selectedSlot}
        onSubmit={addOrUpdateAppointment}
        appointment={selectedAppointment}
      />
    </>
  );
}
