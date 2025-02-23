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
import { Service } from "@/types";

interface Props {
  service: Service;
  onSave: (service: Service) => void;
}

export const ServiceForm = ({ service, onSave }: Props) => {
  // Obtener solo las categorías que pueden contener servicios (son hojas)
  const leafCategories = categories.filter((c) => c.isLeaf);
  const category = categories.find((c) => c.id === service.categoryId);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updatedService: Service = {
      ...service,
      fullName: formData.get("fullName") as string,
      categoryId: parseInt(formData.get("category") as string),
      duration: parseInt(formData.get("duration") as string),
      price: parseFloat(formData.get("price") as string),
      isActive: formData.get("isActive") === "on",
      updatedAt: new Date(),
    };

    onSave(updatedService);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Breadcrumb de la categoría actual */}
      <div className="text-sm text-muted-foreground">
        {category?.fullPath.split("/").join(" > ")}
      </div>

      {/* Campos del formulario */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nombre</Label>
          <Input
            id="fullName"
            name="fullName"
            defaultValue={service.fullName}
            placeholder="Nombre del servicio"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoría</Label>
          <Select name="category" defaultValue={service.categoryId.toString()}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona categoría" />
            </SelectTrigger>
            <SelectContent>
              {leafCategories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.fullPath.split("/").join(" > ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duración (minutos)</Label>
          <Input
            id="duration"
            name="duration"
            type="number"
            defaultValue={service.duration}
            min={5}
            step={5}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Precio</Label>
          <Input
            id="price"
            name="price"
            type="number"
            defaultValue={service.price}
            min={0}
            step={1000}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isActive"
            name="isActive"
            defaultChecked={service.isActive}
          />
          <Label htmlFor="isActive">Servicio activo</Label>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" type="button" onClick={() => onSave(service)}>
          Cancelar
        </Button>
        <Button type="submit">Guardar Cambios</Button>
      </div>
    </form>
  );
};
