import React, { useState, useRef, useEffect } from "react";

import { Edit, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Stylist } from "@/types";

import { FloatingEdit } from "./FloatingEdit";

interface Props {
  stylists: Stylist[];
  onStylistUpdate: (updatedStylist: Stylist) => void;
}

export const Legends = ({ stylists, onStylistUpdate }: Props) => {
  const [localEdits, setLocalEdits] = useState<Record<string, Stylist>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPosition, setEditPosition] = useState({ x: 0, y: 0 });
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const handleEditClick = (stylistId: string, event: React.MouseEvent) => {
    const legendContainer = event.currentTarget.closest(".legend-container");
    if (legendContainer instanceof HTMLElement) {
      const rect = legendContainer.getBoundingClientRect();
      const x = rect.left;
      const y = rect.bottom + window.scrollY;
      setEditPosition({ x, y });
      setEditingId(stylistId);
    }
  };

  const handleLocalEdit = (stylistId: string, color: string) => {
    setLocalEdits((prev) => ({
      ...prev,
      [stylistId]: {
        ...(prev[stylistId] || stylists.find((s) => s.id === stylistId)!),
        color,
      },
    }));
  };

  const handleConfirm = (stylistId: string) => {
    if (localEdits[stylistId]) {
      onStylistUpdate(localEdits[stylistId]);
      setLocalEdits((prev) => {
        const newEdits = { ...prev };
        delete newEdits[stylistId];
        return newEdits;
      });
    }
    setEditingId(null);
  };

  const handleCancel = (stylistId: string) => {
    setLocalEdits((prev) => {
      const newEdits = { ...prev };
      delete newEdits[stylistId];
      return newEdits;
    });
    setEditingId(null);
  };

  const toggleVisibility = (stylist: Stylist) => {
    onStylistUpdate({
      ...stylist,
      isVisible: !stylist.isVisible,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editingId &&
        event.target instanceof Element &&
        !event.target.closest(".floating-edit") &&
        !event.target.closest(".edit-trigger")
      ) {
        setEditingId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editingId]);

  return (
    <div className="flex items-center gap-4">
      {stylists.map((stylist) => {
        const currentEdit = localEdits[stylist.id] || stylist;

        return (
          <div key={stylist.id} className="relative">
            <div className="flex items-center gap-2 px-3 py-1 rounded-md border legend-container">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: currentEdit.color,
                  opacity: currentEdit.isVisible ? 1 : 0.3,
                }}
              />

              <span
                className={`text-sm ${
                  !currentEdit.isVisible && "line-through opacity-50"
                }`}
              >
                {currentEdit.name}
              </span>

              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVisibility(stylist);
                }}
              >
                {stylist.isVisible ? (
                  <Eye className="h-3 w-3" />
                ) : (
                  <EyeOff className="h-3 w-3" />
                )}
              </Button>

              <Button
                ref={(el) => {
                  if (el) {
                    buttonRefs.current.set(stylist.id, el);
                  }
                }}
                variant="ghost"
                size="icon"
                className="h-6 w-6 edit-trigger"
                onClick={(e) => handleEditClick(stylist.id, e)}
              >
                <Edit className="h-3 w-3" />
              </Button>
            </div>

            {editingId === stylist.id && (
              <FloatingEdit
                stylist={currentEdit}
                position={editPosition}
                onConfirm={() => handleConfirm(stylist.id)}
                onCancel={() => handleCancel(stylist.id)}
                onChange={(color) => handleLocalEdit(stylist.id, color)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
