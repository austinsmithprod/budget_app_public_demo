import { Transaction } from "@/model/models";

export function useTransactionDisplay(trans: Transaction, isHovered: boolean) {
    const absAmount = Math.abs(trans.amount);
    const amountText = trans.amount < 0
        ? `$${absAmount.toFixed(2)}`
        : `+($${absAmount.toFixed(2)})`;
    const date = new Date(trans.date);
    const dateText = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    const isCategoryNone = trans.category === 'none' || trans.category === '';
    const backgroundColor = isCategoryNone
        ? isHovered ? 'bg-red-100' : 'bg-red-50'
        : isHovered ? 'bg-gray-100' : '';
    const categoryClass = isCategoryNone ? 'text-red-500' : 'text-gray-500';

    return {
        amountText,
        dateText,
        backgroundColor,
        categoryClass,
        isCategoryNone
    };
}