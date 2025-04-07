import toast from "react-hot-toast";
import { Transaction } from "@/model/models";
import { updateTransaction, bulkUpdateTransactionCategories } from "@/services/transactionsService";

export const useTransactionUpdater = (onAfterSave?: () => void) => {
    const saveTransaction = async (trans: Transaction, applyAll: boolean) => {
        const promise = !applyAll
            ? updateTransaction(trans)
            : bulkUpdateTransactionCategories(trans);

        await toast.promise(promise, {
            loading: "Updating...",
            success: "Updated successfully",
            error: "Failed to update",
        });
        onAfterSave?.();
    };

    return { saveTransaction };
};