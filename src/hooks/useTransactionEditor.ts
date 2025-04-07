import { useState } from "react";
import { Transaction } from "@/model/models";

export function useTransactionEditor(transaction: Transaction) {
    const [categoryText, setCategoryText] = useState(transaction.category);
    const [isApplyAllChecked, setIsApplyAllChecked] = useState(false);

    function updateCategory(value: string) {
        setCategoryText(value);
    }

    function toggleApplyAll(checked: boolean) {
        setIsApplyAllChecked(checked);
    }

    function getUpdatedTransaction(): Transaction {
        return {
            ...transaction,
            category: categoryText
        };
    }

    return {
        categoryText,
        isApplyAllChecked,
        updateCategory,
        toggleApplyAll,
        getUpdatedTransaction
    };
}