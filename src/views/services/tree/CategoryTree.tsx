import { JSX, useState, useEffect } from "react";

import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories, services } from "@/data/mockData";

import { DraggableTreeNode } from "./DraggableTreeNode";
import { useTreeDragAndDrop } from "../../../hooks/useTreeDragAndDrop";
import { TreeNode } from "../types";
import {
  mapToTreeNode,
  parseNodeId,
  getAllItems,
  isValidMove,
  findNode,
} from "../utils/treeMapper";

interface Props {
  className?: string;
  onSelect?: (type: "category" | "service", id: number) => void;
  onEdit?: (type: "category" | "service", id: number) => void;
  onDelete?: (type: "category" | "service", id: number) => void;
  onNewCategory?: (parentId?: number) => void;
  onNewService?: (categoryId: number) => void;
  onMove?: (
    nodeId: string,
    targetId: string,
    position: "before" | "after" | "inside"
  ) => void;
}

export const CategoryTree = ({
  className,
  onSelect,
  onEdit,
  onDelete,
  onNewCategory,
  onNewService,
  onMove,
}: Props) => {
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    activeId,
    overId,
    dropPosition,
    sensors,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  } = useTreeDragAndDrop();

  const treeData = mapToTreeNode(categories, services);
  const items = getAllItems(treeData);

  const renderNode = (node: TreeNode, depth: number = 0): JSX.Element => {
    const isExpanded = expandedNodes.includes(node.id);
    const isSelected = selectedNode === node.id;
    const isOver = overId === node.id;
    const hasChildren = node.children.length > 0;
    const { type, id } = parseNodeId(node.id);

    const renderActions = () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {type === "category" ? (
            <>
              <DropdownMenuItem onClick={() => onEdit?.(type, id)}>
                Editar categoría
              </DropdownMenuItem>
              {node.isLeaf && (
                <DropdownMenuItem onClick={() => onNewService?.(id)}>
                  Nuevo servicio
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onNewCategory?.(id)}>
                Nueva subcategoría
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete?.(type, id)}>
                Eliminar categoría
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={() => onEdit?.(type, id)}>
                Editar servicio
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete?.(type, id)}>
                Eliminar servicio
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );

    return (
      <div key={node.id} className="w-full">
        <DraggableTreeNode
          id={node.id}
          type={type}
          name={node.name}
          depth={depth}
          isExpanded={isExpanded}
          hasChildren={hasChildren}
          isOverTop={isOver && dropPosition === "top"}
          isOverBottom={isOver && dropPosition === "bottom"}
          isOverInside={isOver && dropPosition === "inside"}
          isActive={isSelected}
          onToggle={() =>
            hasChildren &&
            setExpandedNodes((prev) =>
              prev.includes(node.id)
                ? prev.filter((nid) => nid !== node.id)
                : [...prev, node.id]
            )
          }
          onClick={() => {
            setSelectedNode(node.id);
            onSelect?.(type, id);
          }}
          duration={node.duration}
          price={node.price}
          renderActions={renderActions}
        />

        {isExpanded && hasChildren && (
          <div className="w-full">
            {node.children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!isClient) {
    return <div className={className}>Cargando...</div>;
  }

  return (
    <div className={className}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={(event) => {
          handleDragEnd(event);
          if (event.over && dropPosition) {
            const sourceNode = findNode(treeData, event.active.id.toString());
            const targetNode = findNode(treeData, event.over.id.toString());

            if (
              sourceNode &&
              targetNode &&
              isValidMove(sourceNode, targetNode)
            ) {
              onMove?.(
                event.active.id.toString(),
                event.over.id.toString(),
                dropPosition === "top"
                  ? "before"
                  : dropPosition === "bottom"
                  ? "after"
                  : "inside"
              );
            }
          }
        }}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {treeData.map((node) => renderNode(node))}
        </SortableContext>

        <DragOverlay>
          {activeId ? (
            <DraggableTreeNode
              id={activeId}
              type={activeId.startsWith("category") ? "category" : "service"}
              name="Moviendo..."
              depth={0}
              className="opacity-50"
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
