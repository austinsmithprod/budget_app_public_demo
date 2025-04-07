export interface Transaction {
    id: string,
    memo: string,
    date: string,
    amount: number,
    type: string,
    category: string,
    bankOrg: string,
}

export interface BudgetCategorySummaryModel {
    tag: string,
    total: number,
    budget: number,
    items: Transaction[],
}

export interface XMLTransDataModel {
    type: string;
    date: string;
    amount: number;
    id: string;
    memo: string;
    bankOrg: string;
}

export type MonthYear = {
    month: number,
    year: number
};

export type CategoryData = {
    category: string,
    total: number,
    budget: number
}

export type CategoryBudgets = {
    [key: string]: number
}

export type TransactionCategoryInferenceModel = {
    id: string,
    memo: string
}