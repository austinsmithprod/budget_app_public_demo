import { CategoryData } from "@/model/models";

export function getDisplayLabel(category: string, maxLength = 12): string {
    return category.length > maxLength
        ? category.toUpperCase().substring(0, maxLength) + '...'
        : category.toUpperCase();
}

export function filterBudgetedCategories(data: CategoryData[]) {
    return data.filter(category => category.budget !== 0);
}