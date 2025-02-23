import { Category, Service } from "@/types";

import { TreeNode } from "../types";

export const mapToTreeNode = (
  categories: Category[],
  services: Service[],
  parentId: number | null = null
): TreeNode[] => {
  return categories
    .filter((cat) => cat.parentId === parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((category): TreeNode => {
      const categoryNode: TreeNode = {
        id: `category-${category.id}`,
        type: "category",
        name: category.name,
        parentId: category.parentId ? `category-${category.parentId}` : null,
        children: [],
        isLeaf: category.isLeaf,
        sortOrder: category.sortOrder,
        fullPath: category.fullPath,
      };

      // Si es una categoría hoja, agregar servicios
      if (category.isLeaf) {
        const serviceNodes = services
          .filter((service) => service.categoryId === category.id)
          .map(
            (service): TreeNode => ({
              id: `service-${service.id}`,
              type: "service",
              name: service.fullName,
              parentId: `category-${category.id}`,
              children: [],
              duration: service.duration,
              price: service.price,
              categoryId: service.categoryId,
            })
          );
        categoryNode.children.push(...serviceNodes);
      }

      // Agregar subcategorías recursivamente
      const subcategories = mapToTreeNode(categories, services, category.id);
      categoryNode.children.unshift(...subcategories);

      return categoryNode;
    });
};

export const parseNodeId = (
  nodeId: string
): { type: "category" | "service"; id: number } => {
  const [type, idStr] = nodeId.split("-");
  return {
    type: type as "category" | "service",
    id: parseInt(idStr),
  };
};

export const findNode = (
  nodes: TreeNode[],
  targetId: string
): TreeNode | undefined => {
  for (const node of nodes) {
    if (node.id === targetId) return node;
    const found = findNode(node.children, targetId);
    if (found) return found;
  }
  return undefined;
};

export const getAllItems = (nodes: TreeNode[]): string[] => {
  return nodes.reduce<string[]>((acc, node) => {
    acc.push(node.id);
    if (node.children.length > 0) {
      acc.push(...getAllItems(node.children));
    }
    return acc;
  }, []);
};

export const isValidMove = (
  sourceNode: TreeNode,
  targetNode: TreeNode
): boolean => {
  // Un servicio solo puede moverse a una categoría hoja
  if (sourceNode.type === "service") {
    return targetNode.type === "category" && targetNode.isLeaf === true;
  }

  // Una categoría no puede moverse a un servicio
  if (targetNode.type === "service") {
    return false;
  }

  // Una categoría no puede moverse dentro de sí misma o sus descendientes
  if (sourceNode.type === "category") {
    let current: TreeNode | undefined = targetNode;
    while (current) {
      if (current.id === sourceNode.id) return false;
      current = findNode(sourceNode.children, current.parentId || "root");
    }
  }

  return true;
};
