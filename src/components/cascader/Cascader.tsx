import { useCallback, useEffect, useState } from "react";

import { Check, ChevronsUpDown, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
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
  isLeaf?: boolean;
}

interface CascaderProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: CascaderOption[];
  placeholder: string;
}

export function Cascader({
  label,
  value,
  onChange,
  options,
  placeholder,
}: CascaderProps) {
  const [open, setOpen] = useState(false);
  const [levels, setLevels] = useState<CascaderOption[][]>([options]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  // Reset levels when options change
  useEffect(() => {
    setLevels([options]);
  }, [options]);

  // Initialize from value prop
  useEffect(() => {
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
    } else {
      setLevels([options]);
      setSelectedIndices([]);
    }
  }, [value, options]);

  const getSelectedPath = useCallback(() => {
    let path = "";
    let currentLevel = options;

    for (let i = 0; i < selectedIndices.length; i++) {
      const selectedOption = currentLevel[selectedIndices[i]];
      path += selectedOption.label;
      if (i < selectedIndices.length - 1) {
        path += " ";
        currentLevel = selectedOption.children || [];
      }
    }

    return path;
  }, [options, selectedIndices]);

  const handleSelect = useCallback(
    (levelIndex: number, optionIndex: number) => {
      const selectedOption = levels[levelIndex][optionIndex];
      const newSelectedIndices = [
        ...selectedIndices.slice(0, levelIndex),
        optionIndex,
      ];

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

      // Close if it's a leaf node
      if (selectedOption.isLeaf) {
        setOpen(false);
      }
    },
    [levels, selectedIndices, onChange]
  );

  const renderLevel = useCallback(
    (levelOptions: CascaderOption[], levelIndex: number) => (
      <div key={levelIndex} className="min-w-[200px] border-l first:border-l-0">
        {levelOptions.map((option, optionIndex) => (
          <CommandItem
            key={option.value}
            value={option.value}
            onSelect={() => handleSelect(levelIndex, optionIndex)}
            className="flex justify-between"
          >
            {option.label}
            <div className="flex items-center">
              {selectedIndices[levelIndex] === optionIndex && (
                <Check className="h-4 w-4 mr-2" />
              )}
              {option.children && !option.isLeaf && (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          </CommandItem>
        ))}
      </div>
    ),
    [handleSelect, selectedIndices]
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
            <CommandList>
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
