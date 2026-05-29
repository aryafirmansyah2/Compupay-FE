import { useState } from "react";
import { Button } from "./button";
import { Badge } from "./badge";
import { Input } from "./input";

type TagsInputProps = {
  value: string[];
  onChange: (newValue: string[]) => void;
};

const TagsInput = ({ value, onChange }: TagsInputProps) => {
  const handleDelete = (item: string) => {
    onChange(value.filter((tag) => tag !== item));
  };

  const handleAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent form submission when Enter is pressed
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the form from submitting
      const newValue = e.currentTarget.value.trim();
      if (newValue) {
        onChange([...value, newValue]);
        e.currentTarget.value = ""; // Clear input field after adding the tag
      }
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((item, idx) => (
          <Badge
            key={idx}
            variant="outline"
            className="bg-primary/10 text-primary border-primary tags-input-item"
          >
            #{item}
            <Button
              size="icon"
              variant={"ghost"}
              className="tags-input-item-delete w-4 h-4"
              onClick={() => handleDelete(item)}
            >
              ×
            </Button>
          </Badge>
        ))}
      </div>
      <Input
        type="text"
        className="w-full"
        placeholder="Fruits..."
        onKeyDown={handleAdd}
      />
    </div>
  );
};

export default TagsInput;
