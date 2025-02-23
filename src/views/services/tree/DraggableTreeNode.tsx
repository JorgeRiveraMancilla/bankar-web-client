import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronRight, ChevronDown, Scissors, Grip } from "lucide-react";

import { formatPrice, cn } from "@/lib";

interface Props {
  id: string;
  type: "category" | "service";
  name: string;
  depth: number;
  isExpanded?: boolean;
  hasChildren?: boolean;
  isOverTop?: boolean;
  isOverBottom?: boolean;
  isOverInside?: boolean;
  isActive?: boolean;
  isDraggable?: boolean;
  onToggle?: () => void;
  onClick?: () => void;
  className?: string;
  duration?: number;
  price?: number;
  renderActions?: () => React.ReactNode;
}

export const DraggableTreeNode = ({
  id,
  type,
  name,
  depth,
  isExpanded,
  hasChildren,
  isOverTop,
  isOverBottom,
  isOverInside,
  isActive,
  isDraggable = true,
  onToggle,
  onClick,
  className,
  duration,
  price,
  renderActions,
}: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type,
      name,
    },
    disabled: !isDraggable,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "w-full relative hover:bg-accent",
        isActive && "bg-accent",
        isOverTop && "border-t-2 border-primary",
        isOverBottom && "border-b-2 border-primary",
        isOverInside && "bg-accent/25",
        className
      )}
      {...attributes}
    >
      <div
        className="flex items-center cursor-pointer w-full pl-2 pr-12 gap-4 group"
        onClick={onClick}
      >
        <div
          className="flex items-center gap-2"
          style={{ marginLeft: `${depth * 1.5}rem` }}
        >
          {/* Drag handle - only visible on hover of this specific row */}
          {isDraggable && (
            <div
              className="w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              {...listeners}
            >
              <Grip className="w-4 h-4 text-muted-foreground" />
            </div>
          )}

          {/* Expand/collapse toggle */}
          <div
            className="w-6 h-6 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              onToggle?.();
            }}
          >
            {hasChildren &&
              (isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              ))}
          </div>

          {/* Icon */}
          {type === "service" && (
            <div className="w-6 h-6 flex items-center justify-center">
              <Scissors className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Name and Service details container */}
        <div className="flex-grow flex items-center justify-between py-2">
          <span className={type === "service" ? "text-sm" : "font-medium"}>
            {name}
          </span>

          {type === "service" && (
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="w-16 text-right">{duration}min</span>
              <span className="w-24 text-right">{formatPrice(price || 0)}</span>
            </div>
          )}
        </div>

        {/* Actions menu */}
        {renderActions && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            {renderActions()}
          </div>
        )}
      </div>
    </div>
  );
};
