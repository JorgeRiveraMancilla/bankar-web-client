import { JSX } from "react";

import { Card } from "@/components/ui/card";

import { CategoryTree } from "./CategoryTree";
import { DetailsPanel } from "./DetailsPanel";
import { SelectedNode } from "../types";
import { Toolbar } from "./Toolbar";

interface Props {
  selectedNode: SelectedNode | null;
  onNodeSelect: (type: "category" | "service", id: number) => void;
  onEdit: (type: "category" | "service", id: number) => void;
  onDelete: (type: "category" | "service", id: number) => void;
  onNewCategory: (parentId?: number) => void;
  onNewService: (categoryId: number) => void;
}

export const Tree = ({
  selectedNode,
  onNodeSelect,
  onEdit,
  onDelete,
  onNewCategory,
  onNewService,
}: Props): JSX.Element => {
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Panel de árbol - ocupará 8 columnas */}
      <Card className="col-span-8 p-4">
        <Toolbar
          onSearchCategory={(value) => console.log("Buscar categoría:", value)}
          onSearchService={(value) => console.log("Buscar servicio:", value)}
          onExpandAll={() => console.log("Expandir todo")}
          onCollapseAll={() => console.log("Colapsar todo")}
          onNewCategory={() => onNewCategory()}
          onNewService={() => {
            // Aquí podrías mostrar un modal para seleccionar la categoría
            // Por ahora solo logueamos
            console.log("Nuevo servicio (necesita seleccionar categoría)");
          }}
        />
        <div className="min-h-[600px] h-auto">
          <CategoryTree
            onSelect={onNodeSelect}
            onEdit={onEdit}
            onDelete={onDelete}
            onNewCategory={onNewCategory}
            onNewService={onNewService}
            onMove={(nodeId, targetId, position) =>
              console.log("Mover:", { nodeId, targetId, position })
            }
          />
        </div>
      </Card>

      {/* Panel de detalles - ocupará 4 columnas */}
      <Card className="col-span-4 p-4">
        <div className="h-fit">
          <DetailsPanel selectedNode={selectedNode} />
        </div>
      </Card>
    </div>
  );
};
