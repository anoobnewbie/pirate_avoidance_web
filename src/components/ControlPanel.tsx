// ControlPanel.js
"use client";

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

function ControlPanel() {
  const [openCargo, setOpenCargo] = React.useState(false);
  const [valueCargo, setValueCargo] = React.useState("");
  const [openRoute, setOpenRoute] = React.useState(false);
  const [valueRoute, setValueRoute] = React.useState("");

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

  const shippingRoutes = [
    "Trans-Pacific Route",
    "Suez Canal Route",
    "Panama Canal Route",
    "North Atlantic Route",
    "Cape of Good Hope Route",
  ];

  return (
    <div
      className="absolute bottom-3 right-3 w-1/4 bg-white shadow-lg p-4 rounded-xl"
      style={{
        backgroundImage: `
        radial-gradient(circle, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 1) 100%),
        linear-gradient(90deg, rgba(200, 200, 200, 0.2) 1px, transparent 1px),
        linear-gradient(0deg, rgba(200, 200, 200, 0.2) 1px, transparent 1px)
      `,
        backgroundSize: "20px 20px",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.6)",
      }}
    >
      {/* Cargo Type Title */}
      <h3 className="text-md font-medium mb-2 text-slate-600">
        Select Cargo Type
      </h3>
      {/* Cargo Type Combobox */}
      <Popover open={openCargo} onOpenChange={setOpenCargo}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCargo}
            className="w-full justify-between"
          >
            {valueCargo ? valueCargo : "Select cargo type..."}
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
                      setValueCargo(currentValue === valueCargo ? "" : type);
                      setOpenCargo(false);
                    }}
                  >
                    {type}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        valueCargo === type ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Shipping Route Title */}
      <h3 className="text-md font-medium mt-4 mb-2 text-slate-600">
        Select Shipping Route
      </h3>
      {/* Shipping Route Combobox */}
      <Popover open={openRoute} onOpenChange={setOpenRoute}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openRoute}
            className="w-full justify-between"
          >
            {valueRoute ? valueRoute : "Select shipping route..."}
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
                      setValueRoute(currentValue === valueRoute ? "" : route);
                      setOpenRoute(false);
                    }}
                  >
                    {route}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        valueRoute === route ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Update Predictions Button */}
      <Button className="w-full mt-4">Update Predictions</Button>
    </div>
  );
}

export default ControlPanel;
