import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// StartPortCombobox Component
const ports = [
  "Singapore",
  "Port Klang",
  "Tanjung Priok",
  "Shanghai",
  "Shenzhen",
  "Rotterdam",
  "Felixstowe",
  "Los Angeles",
  "New York",
  "Santos",
  "Buenos Aires",
  "Vancouver",
  "Savannah",
];

interface createPortComboboxProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

interface PortComboboxProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  label: string;
}

function PortCombobox({ value, setValue, label }: PortComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <h4 className="text-sm font-medium mt-0 mb-1 text-slate-600">{label}</h4>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value ? value : `Select ${label.toLowerCase()}...`}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder={`Search ${label.toLowerCase()}...`}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No ports found.</CommandEmpty>
              <CommandGroup>
                {ports.map((port) => (
                  <CommandItem
                    key={port}
                    value={port.toLowerCase().replace(/\s+/g, "-")}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : port);
                      setOpen(false);
                    }}
                  >
                    {port}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === port ? "opacity-100" : "opacity-0"
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
}

// Export StartPortCombobox and EndPortCombobox components
export function StartPortCombobox(props: createPortComboboxProps) {
  return <PortCombobox {...props} label="Start Port" />;
}

export function EndPortCombobox(props: createPortComboboxProps) {
  return <PortCombobox {...props} label="End Port" />;
}

export function AttackPortCombobox(props: createPortComboboxProps) {
  return <PortCombobox {...props} label="Select Port" />;
}
