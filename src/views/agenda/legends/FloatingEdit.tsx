import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Stylist } from "@/types";

interface Props {
  stylist: Stylist;
  onConfirm: () => void;
  onCancel: () => void;
  onChange: (color: string) => void;
  position: { x: number; y: number };
}

export const FloatingEdit = ({
  stylist,
  onConfirm,
  onCancel,
  onChange,
  position,
}: Props) => {
  const getEventStyle = (color: string) => ({
    backgroundColor: `${color}26`,
    color: color,
    border: `2px solid ${color}`,
    borderRadius: "4px",
    padding: "2px 4px",
  });

  return (
    <div
      className="fixed bg-white border rounded-lg shadow-lg w-80 z-50 floating-edit mt-4"
      style={{
        top: position.y + "0px",
        left: position.x + "px",
      }}
    >
      <div className="grid gap-4 p-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">
            Ajusta el color del estilista
          </h4>
        </div>

        <div className="p-2 bg-muted rounded-md">
          <Label className="text-xs text-muted-foreground mb-2">
            Vista previa del evento
          </Label>
          <div style={getEventStyle(stylist.color)} className="text-sm mt-1">
            <div className="font-medium mb-1">10:00 - 10:30</div>
            <div className="truncate">Corte - {stylist.name}</div>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`color-${stylist.id}`}>Color</Label>
          <Input
            id={`color-${stylist.id}`}
            type="color"
            value={stylist.color}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Confirmar</Button>
        </div>
      </div>
    </div>
  );
};
