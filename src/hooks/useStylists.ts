import { useState, useCallback } from "react";

import { stylists as mockStylists } from "@/data/mockData";
import { Stylist } from "@/types";

export const useStylists = () => {
  const [stylists, setStylists] = useState<Stylist[]>(mockStylists);

  const handleStylistUpdate = useCallback((updatedStylist: Stylist) => {
    setStylists((prev) =>
      prev.map((stylist) =>
        stylist.id === updatedStylist.id ? updatedStylist : stylist
      )
    );
  }, []);

  return {
    stylists,
    handleStylistUpdate,
  };
};
