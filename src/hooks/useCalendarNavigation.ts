import { useState, useCallback, useEffect } from "react";

import { View, Views } from "react-big-calendar";

import { CALENDAR_CONSTANTS } from "@/config/calendar/constants";

export const useCalendarNavigation = () => {
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const setInitialView = (): void => {
      const isMobile =
        window.innerWidth < CALENDAR_CONSTANTS.BREAKPOINTS.MOBILE;
      setView(
        isMobile
          ? CALENDAR_CONSTANTS.VIEWS.DEFAULT_MOBILE
          : CALENDAR_CONSTANTS.VIEWS.DEFAULT_DESKTOP
      );
    };

    setInitialView();
    window.addEventListener("resize", setInitialView);

    return () => {
      window.removeEventListener("resize", setInitialView);
    };
  }, []);

  const handleViewChange = useCallback((newView: View): void => {
    setView(newView);
  }, []);

  const handleNavigate = useCallback((newDate: Date): void => {
    setDate(newDate);
  }, []);

  return {
    view,
    date,
    handleViewChange,
    handleNavigate,
  };
};
