"use client";

import { JSX, useCallback, useState } from "react";

import { startOfWeek, format, parse, getDay } from "date-fns";
import { es } from "date-fns/locale/es";
import {
  Calendar,
  dateFnsLocalizer,
  View,
  Views,
  EventPropGetter,
} from "react-big-calendar";
import withDragAndDrop, {
  EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

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

const messages = {
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
        defaultView={Views.WEEK}
        views={["month", "week", "day", "agenda"]}
        messages={messages}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        eventPropGetter={eventPropGetter}
        draggableAccessor={() => true}
        resizableAccessor={() => true}
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
