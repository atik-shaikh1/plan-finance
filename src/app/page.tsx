"use client";

import GoalsTab from "@/components/ui/GoalsTab";
import ExpensesTab from "@/components/ui/ExpensesTab";
import TransactionsTab from "@/components/ui/TransactionsTab";
import { useState } from "react";

export type Goal = {
  id: number;
  name: string;
  priority: string;
};

const tabs = ["Goals", "Expenses", "Transactions"];

export default function Home() {
  const [activeTab, setActiveTab] = useState("Goals");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Finance Planner</h1>
      <div className="flex space-x-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === "Goals" && <GoalsTab />}
      {activeTab === "Expenses" && <ExpensesTab />}
      {activeTab === "Transactions" && <TransactionsTab />}
    </div>
  );
}
