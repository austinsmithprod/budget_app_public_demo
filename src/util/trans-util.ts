import { CategoryBudgets, CategoryData, MonthYear, Transaction } from "@/model/models"

/*
    Get a filtered list of transactions based on the given category and optional selected month/year.
*/
export function getFilteredTrans(
    list: Transaction[],
    category: string,
    selectedMonthYear: MonthYear | null = null
): Transaction[] {
    const categoryList = list.filter((obj: Transaction) => obj.category == category)
    const monthList = categoryList.filter((obj: Transaction) => {
        const objectDate = new Date(obj.date)
        const objectMonth = objectDate.getMonth()
        const objectYear = objectDate.getFullYear()
        return selectedMonthYear != null ? (selectedMonthYear.month == objectMonth && selectedMonthYear.year == objectYear) : true
    })
    return monthList
}

/*
    Sort and filter transactions based on the given search text.
*/
export const sortAndFilterTransactions = (transactions: Transaction[], searchText: string): Transaction[] => {
    const sorted = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (!searchText) return sorted;
    return sorted.filter(item =>
        item.memo.toLowerCase().includes(searchText.toLowerCase()) ||
        item.category.toLowerCase().includes(searchText.toLowerCase())
    );
};

/*
    Get sum of transaction amounts for a given category and optional selected month/year.
*/
export const getCategoryTotalAmount = (
    transList: Transaction[],
    category: string,
    selectedMonthYear: MonthYear | null = null
): number => {
    return Number(getTotalAmount(getFilteredTrans(transList, category, selectedMonthYear)).toFixed(2))
}

/*
    Get the budgeted amount for a given category provided category budget data.
*/
export const getCategoryBudgetAmount = (
    categoryBudgets: CategoryBudgets,
    category: string
): number => {
    return Number(categoryBudgets[category]?.toFixed(0) ?? 0)
}

/*
    Get to sum of amounts for a given list of transactions.
*/
export function getTotalAmount(list: Transaction[]): number {
    return list.reduce((total, transaction) => {
        var amount = Number(transaction.amount)
        amount = 0 - amount // Reverse for total
        return total + amount
    }, 0);
}

/*
    Given a list of transactions get a list of all distinct categories.
*/
export function getDistinctCategories(transList: Transaction[]): string[] {
    const uniqueTags = new Set(transList.map((trans) => trans.category!));
    return Array.from(uniqueTags);
};

/*
    Given a list of transactions, category budget data, and optional selected month/year,
    get a list of CategoryData objects containing the category name, total amount, and budget.
*/
export function getCategoriesDataArray(
    transList: Transaction[],
    categoryBudgets: CategoryBudgets,
    selectedMonthYear: MonthYear | null = null
): CategoryData[] {
    return getDistinctCategories(transList).map((category: string) => {
        const total = getCategoryTotalAmount(transList, category, selectedMonthYear)
        const budget = getCategoryBudgetAmount(categoryBudgets, category)
        return { category, total, budget }
    })
}

/*
    Gets the category data and returns it filtered and sorted.
*/
export function getFilteredSortedCategoryData(
    transList: Transaction[],
    categoryBudgets: CategoryBudgets,
    selectedMonthYear: MonthYear
): CategoryData[] {
    const rawData = getCategoriesDataArray(transList, categoryBudgets, selectedMonthYear);
    return rawData
        .filter(data => data.total !== 0)
        .sort((a, b) => b.total - a.total);
}