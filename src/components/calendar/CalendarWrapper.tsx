"use client";

import { JSX } from "react";

import { Calendar } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "@/styles/calendar.css";

import { customFormats } from "@/config/calendar/formats";
import { localizer } from "@/config/calendar/localizer";
import { messages } from "@/config/calendar/messages";
import { useAppointments } from "@/hooks/useAppointments";
import { useCalendarNavigation } from "@/hooks/useCalendarNavigation";
import { useCalendarState } from "@/hooks/useCalendarState";
import { Appointment } from "@/types/appointments";

import { AppointmentModal } from "./AppointmentModal";
import { CalendarToolbar } from "./CalendarToolbar";

const DragAndDropCalendar = withDragAndDrop<Appointment>(Calendar);

export default function CalendarWrapper(): JSX.Element {
  const { view, date, handleViewChange, handleNavigate } =
    useCalendarNavigation();

  const {
    isModalOpen,
    selectedSlot,
    selectedAppointment,
    handleSelectSlot,
    handleSelectEvent,
    handleModalClose,
  } = useCalendarState();

  const {
    appointments,
    handleEventDrop,
    handleEventResize,
    addOrUpdateAppointment,
    eventPropGetter,
  } = useAppointments(selectedAppointment);

  return (
    <>
      <DragAndDropCalendar
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
        views={["month", "week", "day"]}
        messages={messages}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        eventPropGetter={eventPropGetter}
        draggableAccessor={() => true}
        resizableAccessor={() => true}
        components={{
          toolbar: CalendarToolbar,
        }}
      />

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        selectedDate={selectedSlot}
        onSubmit={addOrUpdateAppointment}
        appointment={selectedAppointment}
      />
    </>
  );
}
