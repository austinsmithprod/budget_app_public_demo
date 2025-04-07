import { useEffect, useState } from "react";
import { CategoryBudgets } from "@/model/models";
import { fetchCategoryBudgets } from "@/services/transactionsService";

export const useCategoryBudgets = (refreshTrigger: number) => {
    const [categoryBudgets, setCategoryBudgets] = useState<CategoryBudgets>({});

    useEffect(() => {
        fetchCategoryBudgets()
            .then(setCategoryBudgets)
            .catch(err => console.error("Error fetching budgets:", err));
    }, [refreshTrigger]);

    return categoryBudgets;
};