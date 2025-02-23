import { categories, services } from "@/data/mockData";
import { Category, Service } from "@/types";

import { CategoryForm } from "../forms/CategoryForm";
import { ServiceForm } from "../forms/ServiceForm";

interface Props {
  selectedNode: {
    type: "category" | "service";
    id: number;
  } | null;
}

export const DetailsPanel = ({ selectedNode }: Props) => {
  if (!selectedNode) {
    return (
      <div className="text-center text-muted-foreground p-4">
        Selecciona una categoría o servicio para ver sus detalles
      </div>
    );
  }

  // Manejadores de guardado (por ahora solo console.log)
  const handleSaveCategory = (category: Category) => {
    console.log("Guardando categoría:", category);
  };

  const handleSaveService = (service: Service) => {
    console.log("Guardando servicio:", service);
  };

  // Renderizar el formulario apropiado según el tipo
  if (selectedNode.type === "category") {
    const category = categories.find((c) => c.id === selectedNode.id);
    if (!category) return null;

    return (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Detalles de Categoría</h3>
        <CategoryForm category={category} onSave={handleSaveCategory} />
      </div>
    );
  }

  const service = services.find((s) => s.id === selectedNode.id);
  if (!service) return null;

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Detalles de Servicio</h3>
      <ServiceForm service={service} onSave={handleSaveService} />
    </div>
  );
};
