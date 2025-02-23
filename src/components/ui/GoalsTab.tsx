"use client";

import { useState } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { SortableItem } from "@/components/ui/drag-n-drop/SortableItem";
import { Goal } from "@/app/page";

export default function GoalsTab() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [goalName, setGoalName] = useState("");
  const [goalPriority, setGoalPriority] = useState("Medium");

  const addGoal = () => {
    if (goalName) {
      setGoals([
        ...goals,
        { id: goals.length + 1, name: goalName, priority: goalPriority },
      ]);
      setGoalName("");
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over != null && active.id !== over.id) {
      setGoals((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mt-4">Buying Goals</h2>
      <input
        type="text"
        placeholder="Goal Name"
        value={goalName}
        onChange={(e) => setGoalName(e.target.value)}
        className="border p-2 mr-2"
      />
      <select
        value={goalPriority}
        onChange={(e) => setGoalPriority(e.target.value)}
        className="border p-2 mr-2"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button
        onClick={addGoal}
        className="px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Add Goal
      </button>
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext
          items={goals.map((goal) => goal.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="list-disc pl-4">
            {goals.map((goal) => (
              <SortableItem
                key={goal.id}
                id={goal.id}
                name={goal.name}
                priority={goal.priority}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}
