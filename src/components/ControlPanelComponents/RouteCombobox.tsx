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

const shippingRoutes = [
  "Trans-Pacific Route",
  "Suez Canal Route",
  "Panama Canal Route",
  "North Atlantic Route",
  "Cape of Good Hope Route",
];

interface RouteComboboxProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function RouteCombobox({ value, setValue }: RouteComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <h3 className="text-md font-medium mt-4 mb-2 text-slate-600">
        Select Shipping Route
      </h3>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value ? value : "Select shipping route..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Search shipping route..."
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No shipping route found.</CommandEmpty>
              <CommandGroup>
                {shippingRoutes.map((route) => (
                  <CommandItem
                    key={route}
                    value={route.toLowerCase().replace(/\s+/g, "-")}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : route);
                      setOpen(false);
                    }}
                  >
                    {route}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === route ? "opacity-100" : "opacity-0"
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

export default RouteCombobox;
