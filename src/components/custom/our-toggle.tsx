import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface OurToggleProps {
  options: Option[];
  value: string;
  className?: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function OurToggle({
  options,
  value,
  onChange,
  className,
  placeholder = 'Select option',
}: OurToggleProps) {
  return (
    <>
      {/* Toggle for md+ */}
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={onChange}
        variant="outline"
        className={cn(
          'hidden *:data-[slot=toggle-group-item]:!px-4 md:flex',
          className
        )}
      >
        {options.map((opt) => (
          <ToggleGroupItem key={opt.value} value={opt.value}>
            {opt.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {/* Select for < md */}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate md:hidden"
          size="sm"
          aria-label="Select a value"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="rounded-lg"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
