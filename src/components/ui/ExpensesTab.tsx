"use client";

import { useState } from "react";

export type Expense = {
  id: number;
  amount: number;
  category: string;
};

export default function ExpensesTab() {
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = () => {
    if (expenseAmount > 0 && expenseCategory) {
      setExpenses([
        ...expenses,
        {
          id: expenses.length + 1,
          amount: expenseAmount,
          category: expenseCategory,
        },
      ]);
      setExpenseAmount(0);
      setExpenseCategory("");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mt-4">Expenses</h2>
      <input
        type="number"
        placeholder="Amount"
        value={expenseAmount}
        onChange={(e) => setExpenseAmount(Number(e.target.value))}
        className="border p-2 mr-2"
      />
      <input
        type="text"
        placeholder="Category"
        value={expenseCategory}
        onChange={(e) => setExpenseCategory(e.target.value)}
        className="border p-2 mr-2"
      />
      <button
        onClick={addExpense}
        className="px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Add Expense
      </button>
      <ul className="list-disc pl-4">
        {expenses.map((expense) => (
          <li key={expense.id} className="p-2 bg-gray-100 rounded-md mb-2">
            {expense.amount} - {expense.category}
          </li>
        ))}
      </ul>
    </div>
  );
}
