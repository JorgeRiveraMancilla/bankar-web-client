import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { categories, services } from "@/data/mockData";
import { Category, Service } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: "category" | "service";
  id: number;
}

export const DeleteDialog = ({ isOpen, onClose, type, id }: Props) => {
  const item =
    type === "category"
      ? categories.find((c) => c.id === id)
      : services.find((s) => s.id === id);

  const handleConfirm = () => {
    console.log(`Eliminando ${type}:`, id);
    onClose();
  };

  if (!item) return null;

  const hasChildren =
    type === "category" && categories.some((c) => c.parentId === id);

  const hasServices =
    type === "category" && services.some((s) => s.categoryId === id);

  const canDelete = type === "service" || (!hasChildren && !hasServices);

  // Helper function to get the display name based on item type
  const getDisplayName = (item: Category | Service): string => {
    if (type === "category") {
      return (item as Category).name;
    } else {
      return (item as Service).fullName;
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {canDelete
              ? `¿Eliminar ${type === "category" ? "categoría" : "servicio"}?`
              : "No se puede eliminar"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {canDelete
              ? `¿Estás seguro que deseas eliminar "${getDisplayName(
                  item
                )}"? Esta acción no se puede deshacer.`
              : "No se puede eliminar esta categoría porque contiene subcategorías o servicios. Por favor, elimina primero su contenido."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          {canDelete && (
            <AlertDialogAction onClick={handleConfirm}>
              Eliminar
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
