import { useState } from "react";

import {
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { categories } from "@/data/mockData";

export const useTreeDragAndDrop = () => {
  // Estado para el nodo que se está arrastrando
  const [activeId, setActiveId] = useState<string | null>(null);
  // Estado para el nodo sobre el que estamos arrastrando
  const [overId, setOverId] = useState<string | null>(null);
  // Estado para la posición relativa al nodo over (arriba/abajo/dentro)
  const [dropPosition, setDropPosition] = useState<
    "top" | "bottom" | "inside" | null
  >(null);

  // Configurar los sensores para el drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Validar si un movimiento es permitido
  const isValidMove = (
    sourceId: string,
    sourceType: "category" | "service",
    targetId: string,
    targetType: "category" | "service",
    position: "top" | "bottom" | "inside"
  ) => {
    // Un servicio solo puede moverse a otra categoría hoja
    if (sourceType === "service") {
      if (position === "inside" && targetType === "category") {
        const targetCategory = categories.find(
          (c) => c.id.toString() === targetId
        );
        return targetCategory?.isLeaf ?? false;
      }
      return false;
    }

    // Una categoría no puede moverse dentro de un servicio
    if (sourceType === "category" && targetType === "service") {
      return false;
    }

    // Una categoría no puede moverse dentro de sí misma o sus descendientes
    if (sourceType === "category" && targetType === "category") {
      const isDescendant = (parentId: number | null): boolean => {
        if (!parentId) return false;
        if (parentId.toString() === sourceId) return true;
        const parent = categories.find((c) => c.id === parentId);
        return parent ? isDescendant(parent.parentId) : false;
      };

      const targetCategory = categories.find(
        (c) => c.id.toString() === targetId
      );
      if (!targetCategory) return false;

      return !isDescendant(targetCategory.id);
    }

    return true;
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id.toString());
  };

  const handleDragMove = ({ delta, over }: DragMoveEvent) => {
    if (!over) {
      setOverId(null);
      setDropPosition(null);
      return;
    }

    setOverId(over.id.toString());

    // Determinar la posición del drop basado en la posición del cursor
    if (over.data.current?.isDroppable) {
      const threshold = 10; // pixels
      const relativeY = delta.y;

      if (relativeY < -threshold) {
        setDropPosition("top");
      } else if (relativeY > threshold) {
        setDropPosition("bottom");
      } else {
        setDropPosition("inside");
      }
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || !dropPosition) {
      setActiveId(null);
      setOverId(null);
      setDropPosition(null);
      return;
    }

    const sourceId = active.id.toString();
    const targetId = over.id.toString();
    const sourceType = active.data.current?.type as "category" | "service";
    const targetType = over.data.current?.type as "category" | "service";

    if (isValidMove(sourceId, sourceType, targetId, targetType, dropPosition)) {
      // Aquí implementarías la lógica real para actualizar el orden y la estructura
      console.log("Movimiento válido:", {
        sourceId,
        sourceType,
        targetId,
        targetType,
        position: dropPosition,
      });
    }

    setActiveId(null);
    setOverId(null);
    setDropPosition(null);
  };

  return {
    activeId,
    overId,
    dropPosition,
    sensors,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
};
