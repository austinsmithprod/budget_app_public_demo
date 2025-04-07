import { useEffect, useState } from "react";
import { Transaction } from "@/model/models";
import { fetchTransactions } from "@/services/transactionsService";

export const useTransactions = (refreshTrigger: number) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        fetchTransactions()
            .then(setTransactions)
            .catch(err => console.error("Error fetching transactions:", err));
    }, [refreshTrigger]);

    // Allows the transactions list state to be updated
    const updateTransactions = (updatedTrans: Transaction[]) => {
        const updateMap = new Map(updatedTrans.map(item => [item.id, item]));
        setTransactions(prev =>
            prev.map(item => updateMap.get(item.id) || item)
        );
    };

    return { transactions, updateTransactions };
};