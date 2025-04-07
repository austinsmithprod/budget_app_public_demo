import { Transaction, CategoryBudgets } from "@/model/models";

export const fetchTransactions = async (): Promise<Transaction[]> => {
    const response = await fetch("/api/getTransList");
    if (!response.ok) throw new Error("Failed to fetch transactions");
    return response.json();
};

export const fetchCategoryBudgets = async (): Promise<CategoryBudgets> => {
    const response = await fetch("/api/getPrefs");
    if (!response.ok) throw new Error("Failed to fetch preferences");
    const result = await response.json();
    return result.categoryBudgets;
};

export const inferCategoriesBatch = async (batch: Transaction[]): Promise<Transaction[]> => {
    const response = await fetch("/api/inferCategoriesBatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(batch),
    });
    if (!response.ok) throw new Error("Failed inference request");
    return await response.json();
};

export const updateTransaction = async (trans: Partial<Transaction>) => {
    const response = await fetch('/api/updateTransDatastore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(trans),
    });
    if (!response.ok) throw new Error("Failed to update transaction.");
};

export const bulkUpdateTransactionCategories = async (trans: Partial<Transaction>) => {
    const response = await fetch('/api/updateTransCategoriesByMemoBulk', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ memo: trans.memo, category: trans.category }),
    });
    if (!response.ok) throw new Error("Failed to bulk update categories.");
};