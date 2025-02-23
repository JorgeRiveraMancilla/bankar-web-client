import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { categories } from "@/data/mockData";
import { Category } from "@/types";

import { CategoryForm } from "../forms/CategoryForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  mode: "new" | "edit";
  categoryId?: number;
  parentId?: number | null;
}

export const CategoryDialog = ({
  isOpen,
  onClose,
  mode,
  categoryId,
  parentId,
}: Props) => {
  // Si es modo edición, obtener la categoría existente
  let category: Category | undefined;

  if (mode === "edit" && categoryId) {
    category = categories.find((c) => c.id === categoryId);
  } else {
    // Si es modo nuevo, crear una categoría temporal
    category = {
      id: 0, // Se asignará al guardar
      name: "",
      parentId: parentId ?? null,
      level: parentId
        ? (categories.find((c) => c.id === parentId)?.level ?? 0) + 1
        : 1,
      slug: "",
      fullPath: "", // Se generará al guardar
      isLeaf: false,
      sortOrder: categories.filter((c) => c.parentId === parentId).length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  const handleSave = (category: Category) => {
    console.log("Guardando categoría:", category);
    onClose();
  };

  if (!category) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "new" ? "Nueva Categoría" : "Editar Categoría"}
          </DialogTitle>
        </DialogHeader>
        <CategoryForm category={category} onSave={handleSave} />
      </DialogContent>
    </Dialog>
  );
};
