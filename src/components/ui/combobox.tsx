// "use client";

// import * as React from "react";
// import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";

// interface PaymentMethod {
//   value: string | number;
//   label: string;
// }

// interface ComboboxProps {
//   data: PaymentMethod[];
//   value: string | number;
//   onChange: (value: string | number) => void;
//   placeholder: string;
// }

// const Combobox = ({ data, value, onChange, placeholder }: ComboboxProps) => {
//   const [open, setOpen] = React.useState(false);

//   const handleSelect = (newValue: string) => {
//     onChange(newValue);
//     setOpen(false);
//   };

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-full w-full justify-between"
//           aria-label="Payment method combobox"
//         >
//           {value ? (
//             data.find((item) => item.value === value)?.label
//           ) : (
//             <span className="text-muted-foreground">{placeholder}</span>
//           )}
//           <ChevronsUpDownIcon className="opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent id="popover-content" align="start" className="w-full p-0">
//         <Command>
//           <CommandInput placeholder="Search..." />
//           <CommandList>
//             <CommandEmpty>No options found.</CommandEmpty>
//             <CommandGroup>
//               {data.map((item) => (
//                 <CommandItem
//                   key={item.value}
//                   value={String(item.value)}
//                   onSelect={() => handleSelect(String(item.value))}
//                 >
//                   {item.label}
//                   <CheckIcon
//                     className={cn(
//                       "ml-auto",
//                       value === item.value ? "opacity-100" : "opacity-0"
//                     )}
//                   />
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default Combobox;

export interface ComboboxItem {
  value: string;
  label: string;
}

export interface ComboboxGroup {
  heading: string;
  items: ComboboxItem[];
}

interface DynamicComboboxProps {
  // Data bisa berupa array item biasa atau array grup
  data: ComboboxItem[] | ComboboxGroup[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
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
import { Label } from "@/components/ui/label";

const Combobox = ({
  data,
  value,
  onChange,
  placeholder = "Select item...",
  label,
  className,
}: DynamicComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();

  // Helper untuk mengecek apakah data berupa Grouped atau Flat
  const isGrouped = (data: any[]): data is ComboboxGroup[] => {
    return data.length > 0 && "heading" in data[0];
  };

  // Helper untuk mencari label dari value yang terpilih
  const selectedLabel = React.useMemo(() => {
    if (isGrouped(data)) {
      for (const group of data) {
        const item = group.items.find((i) => i.value === value);
        if (item) return item.label;
      }
    } else {
      return data.find((i) => i.value === value)?.label;
    }
    return null;
  }, [data, value]);

  return (
    <div className={cn("w-full space-y-2", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background px-3 font-normal"
          >
            <span className="truncate">
              {selectedLabel || (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </span>
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder={`Search ${label || "item"}...`} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              {isGrouped(data) ? (
                // Render jika Data Berkelompok
                data.map((group) => (
                  <CommandGroup key={group.heading} heading={group.heading}>
                    {group.items.map((item) => (
                      <ComboboxOption
                        key={item.value}
                        item={item}
                        isSelected={value === item.value}
                        onSelect={(val) => {
                          onChange(val);
                          setOpen(false);
                        }}
                      />
                    ))}
                  </CommandGroup>
                ))
              ) : (
                // Render jika Data Flat (Biasa)
                <CommandGroup>
                  {data.map((item) => (
                    <ComboboxOption
                      key={item.value}
                      item={item}
                      isSelected={value === item.value}
                      onSelect={(val) => {
                        onChange(val);
                        setOpen(false);
                      }}
                    />
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

// Sub-komponen untuk item agar kode lebih bersih
const ComboboxOption = ({
  item,
  isSelected,
  onSelect,
}: {
  item: ComboboxItem;
  isSelected: boolean;
  onSelect: (v: string) => void;
}) => (
  <CommandItem
    value={item.label} // Command menggunakan label untuk filtering search
    onSelect={() => onSelect(item.value)}
  >
    {item.label}
    <CheckIcon
      className={cn(
        "ml-auto h-4 w-4",
        isSelected ? "opacity-100" : "opacity-0"
      )}
    />
  </CommandItem>
);

export default Combobox;
