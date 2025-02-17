import { useMemo } from "react";

import { TimeOption } from "@/types/appointment-form";

export function useTimeOptions() {
  const hours: TimeOption[] = useMemo(
    () =>
      Array.from({ length: 11 }, (_, i) => {
        const hour = i + 9;
        return {
          value: hour.toString().padStart(2, "0"),
          label: hour.toString().padStart(2, "0") + ":00",
        };
      }),
    []
  );

  const minutes: TimeOption[] = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const minute = i * 5;
        return {
          value: minute.toString().padStart(2, "0"),
          label: minute.toString().padStart(2, "0"),
        };
      }),
    []
  );

  return { hours, minutes };
}
