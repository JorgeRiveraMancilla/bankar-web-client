import { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { categories } from "@/data/mockData";
import { Category } from "@/types";

interface Props {
  category: Category;
  onSave: (category: Category) => void;
}

export const CategoryForm = ({ category, onSave }: Props) => {
  // Obtener solo las categorías que pueden ser padres (no son hojas)
  const possibleParents = categories.filter(
    (c) => !c.isLeaf && c.id !== category.id
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updatedCategory: Category = {
      ...category,
      name: formData.get("name") as string,
      parentId: formData.get("parent")
        ? parseInt(formData.get("parent") as string)
        : null,
      slug: formData.get("slug") as string,
      isLeaf: formData.get("isLeaf") === "on",
      sortOrder: parseInt(formData.get("sortOrder") as string),
      updatedAt: new Date(),
    };

    // Si el padre cambió, actualizar level y fullPath
    if (updatedCategory.parentId !== category.parentId) {
      const parent = categories.find((c) => c.id === updatedCategory.parentId);
      updatedCategory.level = parent ? parent.level + 1 : 1;
      updatedCategory.fullPath = parent
        ? `${parent.fullPath}/${updatedCategory.slug}`
        : updatedCategory.slug;
    }

    onSave(updatedCategory);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Breadcrumb de la ruta actual */}
      <div className="text-sm text-muted-foreground">
        {category.fullPath.split("/").join(" > ")}
      </div>

      {/* Campos del formulario */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            name="name"
            defaultValue={category.name}
            placeholder="Nombre de la categoría"
            required
          />
        </div>

        {category.parentId !== null && (
          <div className="space-y-2">
            <Label htmlFor="parent">Categoría Padre</Label>
            <Select name="parent" defaultValue={category.parentId.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona categoría padre" />
              </SelectTrigger>
              <SelectContent>
                {possibleParents.map((parent) => (
                  <SelectItem key={parent.id} value={parent.id.toString()}>
                    {parent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            defaultValue={category.slug}
            placeholder="identificador-url"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="isLeaf" name="isLeaf" defaultChecked={category.isLeaf} />
          <Label htmlFor="isLeaf">
            Es categoría final (puede contener servicios)
          </Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sortOrder">Orden</Label>
          <Input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={category.sortOrder}
            min={1}
            required
          />
        </div>
      </div>

      {/* Acciones */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          variant="outline"
          type="button"
          onClick={() => onSave(category)}
        >
          Cancelar
        </Button>
        <Button type="submit">Guardar Cambios</Button>
      </div>
    </form>
  );
};
