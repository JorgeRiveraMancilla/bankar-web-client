import React from "react";

import {
  Search,
  ChevronDown,
  ChevronUp,
  Scissors,
  FolderPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface TreeToolbarProps {
  onSearchCategory: (value: string) => void;
  onSearchService: (value: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  onNewCategory: () => void;
  onNewService: () => void;
}

export const Toolbar = ({
  onSearchCategory,
  onSearchService,
  onExpandAll,
  onCollapseAll,
  onNewCategory,
  onNewService,
}: TreeToolbarProps) => {
  return (
    <div className="space-y-4 mb-4">
      {/* Search inputs */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar categoría..."
              className="pl-8"
              onChange={(e) => onSearchCategory(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="relative">
            <Scissors className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar servicio..."
              className="pl-8"
              onChange={(e) => onSearchService(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onExpandAll}
          className="flex items-center gap-1"
        >
          <ChevronDown className="h-4 w-4" />
          Expandir todo
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onCollapseAll}
          className="flex items-center gap-1"
        >
          <ChevronUp className="h-4 w-4" />
          Colapsar todo
        </Button>
        <Separator orientation="vertical" className="h-6 mx-2" />
        <Button
          variant="outline"
          size="sm"
          onClick={onNewCategory}
          className="flex items-center gap-1"
        >
          <FolderPlus className="h-4 w-4" />
          Nueva categoría
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNewService}
          className="flex items-center gap-1"
        >
          <Scissors className="h-4 w-4" />
          Nuevo servicio
        </Button>
      </div>
    </div>
  );
};
