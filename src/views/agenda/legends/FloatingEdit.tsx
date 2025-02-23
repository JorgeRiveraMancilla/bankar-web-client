import React, { JSX } from "react";

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
}: Props): JSX.Element => {
  const getEventStyle = (color: string) => ({
    backgroundColor: "white",
    backgroundImage: `linear-gradient(${color}15, ${color}15)`,
    border: `2px solid ${color}`,
    color: color,
    width: "100%",
  });

  return (
    <div
      className="fixed mt-4 bg-white border rounded-lg shadow-lg w-80 z-50 floating-edit"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
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

          <div
            role="button"
            tabIndex={0}
            style={getEventStyle(stylist.color)}
            className="rbc-event mt-1"
          >
            <div className="rbc-addons-dnd-resizable">
              <div className="rbc-addons-dnd-resize-ns-anchor">
                <div className="rbc-addons-dnd-resize-ns-icon"></div>
              </div>
              <div className="rbc-event-label">10:00 - 10:30</div>
              <div className="rbc-event-content">
                <div className="h-full overflow-hidden">
                  <div className="space-y-0.5">
                    <div className="text-xs text-muted-foreground truncate">
                      Corte
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {stylist.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      $45.000
                    </div>
                  </div>
                </div>
              </div>
              <div className="rbc-addons-dnd-resize-ns-anchor">
                <div className="rbc-addons-dnd-resize-ns-icon"></div>
              </div>
            </div>
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
