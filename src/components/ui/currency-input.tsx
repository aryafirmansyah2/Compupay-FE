import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

export const title = "Currency Input";

// Function to format the number as currency string
export const formatCurrency = (value) => {
  if (value === undefined || value === null || isNaN(value)) return ""; // Return empty if invalid
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Format number with commas
};

const CurrencyInput = ({ value, onChange, ...props }) => {
  // Function to handle user input and convert to numeric value
  const handleValueChange = (e) => {
    const formattedValue = e.target.value.replace(/[^0-9]/g, ""); // Keep only numeric values
    onChange(Number(formattedValue) || 0); // Convert to number and pass to parent
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <InputGroup
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
        )}
      >
        <InputGroupAddon>
          <InputGroupText>Rp</InputGroupText>
        </InputGroupAddon>

        {/* Handle user input and format as currency */}
        <InputGroupInput
          value={formatCurrency(value)} // Display formatted value
          onChange={handleValueChange} // Send numeric value to parent
          placeholder="0"
          className={"input"}
          {...props}
        />

        <InputGroupAddon align="inline-end">IDR</InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default CurrencyInput;
