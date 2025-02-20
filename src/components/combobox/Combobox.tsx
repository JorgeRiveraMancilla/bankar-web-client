import { JSX, useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";

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
import { cn } from "@/lib";

interface Props<T> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  items: T[];
  getDisplayValue: (item: T | undefined) => string;
  getItemDisplayValue: (item: T) => string;
  getId: (item: T) => string;
  placeholder: string;
  searchPlaceholder: string;
  emptyMessage: string;
}

export const Combobox = <T,>({
  label,
  value,
  onChange,
  items,
  getDisplayValue,
  getItemDisplayValue,
  getId,
  placeholder,
  searchPlaceholder,
  emptyMessage,
}: Props<T>): JSX.Element => {
  const [open, setOpen] = useState(false);
  const selectedItem = items.find((item) => getId(item) === value);

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
            {selectedItem ? getDisplayValue(selectedItem) : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
        >
          <Command className="w-full">
            <CommandInput placeholder={searchPlaceholder} className="h-9" />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={getId(item)}
                    value={getId(item)}
                    onSelect={(currentValue) => {
                      onChange(currentValue);
                      setOpen(false);
                    }}
                  >
                    {getItemDisplayValue(item)}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === getId(item) ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
