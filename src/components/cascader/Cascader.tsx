import * as React from "react";

import { Check, ChevronsUpDown, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface CascaderOption {
  value: string;
  label: string;
  children?: CascaderOption[];
}

interface CascaderProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: CascaderOption[];
  placeholder: string;
  searchPlaceholder: string;
  emptyMessage: string;
}

export function Cascader({
  label,
  value,
  onChange,
  options,
  placeholder,
  searchPlaceholder,
  emptyMessage,
}: CascaderProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [levels, setLevels] = React.useState<CascaderOption[][]>([options]);
  const [selectedIndices, setSelectedIndices] = React.useState<number[]>([]);

  // Reset levels when options change
  React.useEffect(() => {
    setLevels([options]);
  }, [options]);

  // Initialize from value prop
  React.useEffect(() => {
    if (value.length > 0) {
      const newLevels: CascaderOption[][] = [options];
      const newIndices: number[] = [];

      value.forEach((val, index) => {
        const currentLevel = newLevels[index];
        const optionIndex = currentLevel.findIndex((opt) => opt.value === val);

        if (optionIndex !== -1) {
          newIndices.push(optionIndex);
          const selectedOption = currentLevel[optionIndex];
          if (selectedOption.children) {
            newLevels.push(selectedOption.children);
          }
        }
      });

      setLevels(newLevels);
      setSelectedIndices(newIndices);
    }
  }, [value, options]);

  const getSelectedPath = () => {
    let path = "";
    let currentLevel = options;

    for (let i = 0; i < selectedIndices.length; i++) {
      const selectedOption = currentLevel[selectedIndices[i]];
      path += selectedOption.label;
      if (i < selectedIndices.length - 1) {
        path += " / ";
        currentLevel = selectedOption.children || [];
      }
    }

    return path;
  };

  const handleSelect = (levelIndex: number, optionIndex: number) => {
    const newSelectedIndices = [
      ...selectedIndices.slice(0, levelIndex),
      optionIndex,
    ];
    const selectedOption = levels[levelIndex][optionIndex];

    // Update levels
    const newLevels = [...levels.slice(0, levelIndex + 1)];
    if (selectedOption.children) {
      newLevels.push(selectedOption.children);
    }

    setLevels(newLevels);
    setSelectedIndices(newSelectedIndices);

    // Build value path
    const valuePath = newSelectedIndices.map(
      (index, i) => levels[i][index].value
    );
    onChange(valuePath);

    // Close if leaf node selected
    if (!selectedOption.children) {
      setOpen(false);
    }
  };

  const renderLevel = (levelOptions: CascaderOption[], levelIndex: number) => (
    <div key={levelIndex} className="min-w-[200px] border-l first:border-l-0">
      {levelOptions.map((option, optionIndex) => (
        <CommandItem
          key={option.value}
          value={`${levelIndex}-${option.value}`}
          onSelect={() => handleSelect(levelIndex, optionIndex)}
          className="flex justify-between"
        >
          {option.label}
          <div className="flex items-center">
            {selectedIndices[levelIndex] === optionIndex && (
              <Check className="h-4 w-4 mr-2" />
            )}
            {option.children && <ChevronRight className="h-4 w-4" />}
          </div>
        </CommandItem>
      ))}
    </div>
  );

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-sm"
          >
            {value.length > 0 ? getSelectedPath() : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Command className="w-full">
            <CommandInput
              placeholder={searchPlaceholder}
              value={search}
              onValueChange={setSearch}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                <div className="flex overflow-auto">
                  {levels.map((levelOptions, index) =>
                    renderLevel(levelOptions, index)
                  )}
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
