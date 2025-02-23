import { useState, useCallback, useMemo } from "react";

import { categories, services } from "@/data/mockData";

interface TreeNode {
  id: number;
  name: string;
  type: "category" | "service";
  parentId: number | null;
  children: TreeNode[];
  level: number;
  sortOrder: number;
  isLeaf?: boolean;
  fullPath?: string;
  duration?: number;
  price?: number;
}

export const useCategoryTree = () => {
  const [expandedNodes, setExpandedNodes] = useState<number[]>([]);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  // Convertir las categorías y servicios planos en una estructura de árbol
  const treeData = useMemo(() => {
    const buildTree = (parentId: number | null, level: number): TreeNode[] => {
      // Obtener categorías del nivel actual
      const levelCategories = categories
        .filter((cat) => cat.parentId === parentId)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((cat) => ({
          id: cat.id,
          name: cat.name,
          type: "category" as const,
          parentId: cat.parentId,
          level: cat.level,
          sortOrder: cat.sortOrder,
          isLeaf: cat.isLeaf,
          fullPath: cat.fullPath,
          children: [] as TreeNode[],
        }));

      // Para cada categoría, agregar sus hijos
      levelCategories.forEach((node) => {
        // Agregar subcategorías
        node.children = buildTree(node.id, level + 1);

        // Si es una categoría hoja, agregar servicios
        if (node.isLeaf) {
          const categoryServices = services
            .filter((service) => service.categoryId === node.id)
            .map((service) => ({
              id: service.id,
              name: service.fullName,
              type: "service" as const,
              parentId: node.id,
              level: level + 1,
              sortOrder: 0,
              duration: service.duration,
              price: service.price,
              children: [],
            }));
          node.children.push(...categoryServices);
        }
      });

      return levelCategories;
    };

    return buildTree(null, 0);
  }, []);

  const toggleNode = useCallback((nodeId: number) => {
    setExpandedNodes((prev) => {
      if (prev.includes(nodeId)) {
        return prev.filter((id) => id !== nodeId);
      }
      return [...prev, nodeId];
    });
  }, []);

  const handleSelect = useCallback((node: TreeNode) => {
    setSelectedNode(node);
  }, []);

  // Función para encontrar un nodo por ID
  const findNode = useCallback(
    (nodeId: number): TreeNode | null => {
      const search = (nodes: TreeNode[]): TreeNode | null => {
        for (const node of nodes) {
          if (node.id === nodeId) return node;
          const found = search(node.children);
          if (found) return found;
        }
        return null;
      };
      return search(treeData);
    },
    [treeData]
  );

  return {
    treeData,
    expandedNodes,
    selectedNode,
    toggleNode,
    handleSelect,
    findNode,
  };
};
