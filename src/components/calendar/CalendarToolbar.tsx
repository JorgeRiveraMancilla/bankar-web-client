import { JSX, ReactNode } from "react";

import { ToolbarProps, View } from "react-big-calendar";

import { messages } from "@/config/calendar/messages";
import { useToolbarState } from "@/hooks/useToolbarState";
import { Appointment } from "@/types/appointments";

type CalendarView = "month" | "week" | "day" | "agenda";

export function CalendarToolbar(
  props: ToolbarProps<Appointment, object>
): JSX.Element {
  const { view, label } = props;

  const { getNavigationButtonState, handleViewChange, handleNavigate } =
    useToolbarState(props);

  return (
    <div className="flex flex-col space-y-4 mb-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
      {/* Views (Mes, Semana, Día, Agenda) - First on mobile, Last on desktop */}
      <div className="flex w-full order-1 md:order-3 md:w-auto">
        <span className="flex w-full h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
          {(props.views as CalendarView[]).map((name: string) => (
            <button
              key={name}
              type="button"
              className={`
                flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 md:flex-initial
                ${view === name ? "bg-background text-foreground shadow" : ""}
              `}
              onClick={() => handleViewChange(name as View)}
            >
              {messages[name as keyof typeof messages] as ReactNode}
            </button>
          ))}
        </span>
      </div>

      {/* Navigation buttons (Anterior, Hoy, Siguiente) - Second on mobile, First on desktop */}
      <div className="flex w-full order-2 md:order-1 md:w-auto">
        <span className="flex w-full h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
          <button
            type="button"
            onClick={() => handleNavigate("PREV")}
            className={`
              flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 md:flex-initial
              ${
                getNavigationButtonState("prev")
                  ? "bg-background text-foreground shadow"
                  : ""
              }
            `}
          >
            {messages.previous}
          </button>

          <button
            type="button"
            onClick={() => handleNavigate("TODAY")}
            className={`
              flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 md:flex-initial
              ${
                getNavigationButtonState("today")
                  ? "bg-background text-foreground shadow"
                  : ""
              }
            `}
          >
            {messages.today}
          </button>

          <button
            type="button"
            onClick={() => handleNavigate("NEXT")}
            className={`
              flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 md:flex-initial
              ${
                getNavigationButtonState("next")
                  ? "bg-background text-foreground shadow"
                  : ""
              }
            `}
          >
            {messages.next}
          </button>
        </span>
      </div>

      {/* Current date label - Third on mobile, Second on desktop */}
      <div className="order-3 md:order-2">
        <span className="text-lg font-semibold text-center block md:text-left">
          {label}
        </span>
      </div>
    </div>
  );
}
