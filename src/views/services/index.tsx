"use client";

import { JSX, useState } from "react";

import { CategoryDialog } from "./dialogs/CategoryDialog";
import { DeleteDialog } from "./dialogs/DeleteDialog";
import { ServiceDialog } from "./dialogs/ServiceDialog";
import { Tree } from "./tree/Tree";
import { SelectedNode } from "./types";
import { useServiceDialogs } from "../../hooks/useServiceDialogs";

export const ServicesView = (): JSX.Element => {
  const [selectedNode, setSelectedNode] = useState<SelectedNode | null>(null);

  const {
    dialog,
    openNewCategoryDialog,
    openEditCategoryDialog,
    openNewServiceDialog,
    openEditServiceDialog,
    openDeleteDialog,
    closeDialog,
  } = useServiceDialogs();

  const handleNodeSelect = (type: "category" | "service", id: number) => {
    setSelectedNode({ type, id });
  };

  const handleNewCategory = (parentId?: number) => {
    openNewCategoryDialog(parentId);
  };

  const handleNewService = (categoryId: number) => {
    openNewServiceDialog(categoryId);
  };

  const handleEditCategory = (id: number) => {
    openEditCategoryDialog(id);
  };

  const handleEditService = (id: number) => {
    openEditServiceDialog(id);
  };

  const handleDelete = (type: "category" | "service", id: number) => {
    openDeleteDialog(id, type);
  };

  const handleEdit = (type: "category" | "service", id: number) => {
    if (type === "category") {
      handleEditCategory(id);
    } else {
      handleEditService(id);
    }
  };

  const getServiceDialogCategoryId = (): number | undefined => {
    if (dialog.type === "service-new") {
      return dialog.data?.categoryId;
    }
    return undefined;
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Gestión de Servicios</h1>

      <Tree
        selectedNode={selectedNode}
        onNodeSelect={handleNodeSelect}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onNewCategory={handleNewCategory}
        onNewService={handleNewService}
      />

      <CategoryDialog
        isOpen={
          dialog.isOpen &&
          (dialog.type === "category-new" || dialog.type === "category-edit")
        }
        onClose={closeDialog}
        mode={dialog.type === "category-new" ? "new" : "edit"}
        categoryId={dialog.data?.id}
        parentId={dialog.data?.parentId}
      />

      <ServiceDialog
        isOpen={
          dialog.isOpen &&
          (dialog.type === "service-new" || dialog.type === "service-edit")
        }
        onClose={closeDialog}
        mode={dialog.type === "service-new" ? "new" : "edit"}
        serviceId={dialog.data?.id}
        categoryId={getServiceDialogCategoryId()}
      />

      <DeleteDialog
        isOpen={dialog.isOpen && dialog.type === "delete"}
        onClose={closeDialog}
        type={dialog.data?.type || "category"}
        id={dialog.data?.id || 0}
      />
    </div>
  );
};
