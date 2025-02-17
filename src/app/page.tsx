'use client'

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Plus, Minus } from "lucide-react";

export default function ListManager() {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    if (inputValue.trim() !== "") {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Manage List</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow p-2 border rounded-md"
          placeholder="Enter item..."
        />
        <Button onClick={addItem} className="ml-2">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 rounded-md mb-2"
          >
            <span>{item}</span>
            <Button variant="destructive" size="icon" onClick={() => removeItem(index)}>
              <Minus className="w-4 h-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
