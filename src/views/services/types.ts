export interface SelectedNode {
  type: "category" | "service";
  id: number;
}

export interface ServiceFilters {
  category?: number;
  minPrice?: number;
  maxPrice?: number;
  minDuration?: number;
  maxDuration?: number;
  onlyActive?: boolean;
}

export interface PriceUpdateState {
  type: "increase" | "decrease";
  percentage: number;
  categoryId?: number;
}

export interface TreeNode {
  id: string;
  type: "category" | "service";
  name: string;
  children: TreeNode[];
  parentId: string | null;
  duration?: number;
  price?: number;
  isLeaf?: boolean;
  sortOrder?: number;
  categoryId?: number;
  fullPath?: string;
}
