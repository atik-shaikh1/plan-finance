"use client"

import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const tabs = ["Goals", "Expenses", "Transactions"];

type Goal = {
  id: number;
  name: string;
  priority: string;
};

type Expense = {
  id: number;
  amount: number;
  category: string;
};

type Transaction = {
  id: number;
  message: string;
  taggedTo: string | null;
};

const SortableItem = ({ id, name, priority }: Goal) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-2 bg-gray-100 rounded-md mb-2">
      {name} - {priority}
    </li>
  );
};

export default function Home() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [untaggedTransactions, setUntaggedTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState("Goals");
  const [goalName, setGoalName] = useState("");
  const [goalPriority, setGoalPriority] = useState("Medium");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseCategory, setExpenseCategory] = useState("");
  const [transactionMessage, setTransactionMessage] = useState("");

  const addGoal = () => {
    if (goalName) {
      setGoals([...goals, { id: goals.length + 1, name: goalName, priority: goalPriority }]);
      setGoalName("");
    }
  };

  const addExpense = () => {
    if (expenseAmount > 0 && expenseCategory) {
      setExpenses([...expenses, { id: expenses.length + 1, amount: expenseAmount, category: expenseCategory }]);
      setExpenseAmount(0);
      setExpenseCategory("");
    }
  };

  const tagTransaction = (id: number, goalName: string) => {
    setUntaggedTransactions(
      untaggedTransactions.map((txn) =>
        txn.id === id ? { ...txn, taggedTo: goalName } : txn
      )
    );
  };

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setGoals((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Finance Planner</h1>
      <div className="flex space-x-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md ${activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === "Goals" && (
        <div>
          <h2 className="text-xl font-semibold mt-4">Buying Goals</h2>
          <input 
            type="text" 
            placeholder="Goal Name" 
            value={goalName} 
            onChange={(e) => setGoalName(e.target.value)}
            className="border p-2 mr-2" 
          />
          <select value={goalPriority} onChange={(e) => setGoalPriority(e.target.value)} className="border p-2 mr-2">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button onClick={addGoal} className="px-4 py-2 bg-green-500 text-white rounded-md">Add Goal</button>
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={goals.map((goal) => goal.id)} strategy={verticalListSortingStrategy}>
              <ul className="list-disc pl-4">
                {goals.map((goal) => (
                  <SortableItem key={goal.id} id={goal.id} name={goal.name} priority={goal.priority} />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </div>
      )}
      {activeTab === "Expenses" && (
        <div>
          <h2 className="text-xl font-semibold mt-4">Expenses</h2>
          <input type="number" placeholder="Amount" value={expenseAmount} onChange={(e) => setExpenseAmount(Number(e.target.value))} className="border p-2 mr-2" />
          <input type="text" placeholder="Category" value={expenseCategory} onChange={(e) => setExpenseCategory(e.target.value)} className="border p-2 mr-2" />
          <button onClick={addExpense} className="px-4 py-2 bg-green-500 text-white rounded-md">Add Expense</button>
          <ul className="list-disc pl-4">
            {expenses.map((expense) => (
              <li key={expense.id} className="p-2 bg-gray-100 rounded-md mb-2">{expense.amount} - {expense.category}</li>
            ))}
          </ul>
        </div>
      )}
      {activeTab === "Transactions" && (
        <div>
          <h2 className="text-xl font-semibold mt-4">Tag Transactions</h2>
          <ul className="list-disc pl-4">
            {untaggedTransactions.map((txn) => (
              <li key={txn.id} className="p-2 bg-gray-100 rounded-md mb-2">
                {txn.message} - Tagged To: {txn.taggedTo || "None"}
                <button className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded-md" onClick={() => tagTransaction(txn.id, "Buy Laptop")}>
                  Tag to Buy Laptop
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
