import { useCallback } from "react";

import { startOfDay, isToday, isBefore, isAfter } from "date-fns";
import { View, NavigateAction, ToolbarProps } from "react-big-calendar";

import { Appointment } from "@/types";

export function useToolbarState(props: ToolbarProps<Appointment, object>) {
  const { date, onNavigate, onView } = props;

  const handleViewChange = useCallback(
    (newView: View) => {
      onView(newView);
    },
    [onView]
  );

  const handleNavigate = useCallback(
    (action: NavigateAction) => {
      onNavigate(action);
    },
    [onNavigate]
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

  return {
    getNavigationButtonState,
    handleViewChange,
    handleNavigate,
  };
}
