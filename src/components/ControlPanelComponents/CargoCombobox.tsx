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

const cargoTypes = [
  "Chemical Tanker",
  "LPG Tanker",
  "Product Tanker",
  "Crude Tanker",
  "Bunkering Tanker",
  "Oil Tanker",
  "Asphalt/Bitumen Tanker",
  "LNG Tanker",
  "Crude Oil Tanker",
  "Tanker",
  "General Cargo",
  "Bulk Carrier",
  "Vehicle Carrier",
  "Container",
  "Refrigerated Cargo",
  "Wood Chips Carrier",
  "Ore Carrier",
  "Ro-Ro Cargo Ship",
  "Cement Carrier",
  "Offshore Supply Ship",
  "Offshore Tug",
  "Offshore Support Vessel",
  "Floating Production Storage and Offloading (FPSO)",
  "Floating Storage and Offloading (FSO)",
  "Pipe Lay Barge",
  "Pipe Layer",
  "Support Vessel",
  "Accommodation Barge",
  "Supply Vessel",
  "Fishing Vessel",
  "Dredger",
  "Hopper Dredger",
  "Heavy Load Carrier",
  "Research Vessel",
  "Cable Ship",
  "Maintenance Pontoon",
  "Passenger Ship",
  "Passenger Boat",
  "Yacht",
  "Pleasure Craft",
  "Landing Craft",
  "Tug and Barge",
  "Tug",
  "Dhow",
  "Tug / Barge",
  "Other",
];

interface CargoComboboxProps {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  }


function CargoCombobox({ value, setValue }: CargoComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <h3 className="text-md font-medium mb-2 text-slate-600">
        Select Cargo Type
      </h3>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value ? value : "Select cargo type..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search cargo type..." className="h-9" />
            <CommandList>
              <CommandEmpty>No cargo type found.</CommandEmpty>
              <CommandGroup>
                {cargoTypes.map((type) => (
                  <CommandItem
                    key={type}
                    value={type.toLowerCase().replace(/\s+/g, "-")}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : type);
                      setOpen(false);
                    }}
                  >
                    {type}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === type ? "opacity-100" : "opacity-0"
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

export default CargoCombobox;
