import { useState } from "react";

type DialogType =
  | "category-new"
  | "category-edit"
  | "service-new"
  | "service-edit"
  | "delete";

interface DialogData {
  id?: number;
  parentId?: number | null;
  categoryId?: number; // Agregamos esta propiedad
  type?: "category" | "service";
}

interface DialogState {
  type: DialogType;
  isOpen: boolean;
  data?: DialogData;
}

export const useServiceDialogs = () => {
  const [dialog, setDialog] = useState<DialogState>({
    type: "category-new",
    isOpen: false,
  });

  const openNewCategoryDialog = (parentId?: number) => {
    setDialog({
      type: "category-new",
      isOpen: true,
      data: { parentId },
    });
  };

  const openEditCategoryDialog = (id: number) => {
    setDialog({
      type: "category-edit",
      isOpen: true,
      data: { id, type: "category" },
    });
  };

  const openNewServiceDialog = (categoryId: number) => {
    setDialog({
      type: "service-new",
      isOpen: true,
      data: { categoryId }, // Usamos categoryId en lugar de parentId
    });
  };

  const openEditServiceDialog = (id: number) => {
    setDialog({
      type: "service-edit",
      isOpen: true,
      data: { id, type: "service" },
    });
  };

  const openDeleteDialog = (id: number, type: "category" | "service") => {
    setDialog({
      type: "delete",
      isOpen: true,
      data: { id, type },
    });
  };

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, isOpen: false }));
  };

  return {
    dialog,
    openNewCategoryDialog,
    openEditCategoryDialog,
    openNewServiceDialog,
    openEditServiceDialog,
    openDeleteDialog,
    closeDialog,
  };
};
