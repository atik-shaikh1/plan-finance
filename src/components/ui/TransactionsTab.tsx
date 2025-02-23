"use client";

import { useState } from "react";

type Transaction = {
  id: number;
  message: string;
  taggedTo: string | null;
};

export default function TransactionsTab() {
  const [untaggedTransactions, setUntaggedTransactions] = useState<
    Transaction[]
  >([]);

  const tagTransaction = (id: number, goalName: string) => {
    setUntaggedTransactions(
      untaggedTransactions.map((txn) =>
        txn.id === id ? { ...txn, taggedTo: goalName } : txn
      )
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mt-4">Tag Transactions</h2>
      <ul className="list-disc pl-4">
        {untaggedTransactions.map((txn) => (
          <li key={txn.id} className="p-2 bg-gray-100 rounded-md mb-2">
            {txn.message} - Tagged To: {txn.taggedTo || "None"}
            <button
              className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded-md"
              onClick={() => tagTransaction(txn.id, "Buy Laptop")}
            >
              Tag to Buy Laptop
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
