import { TransactionCategoryInferenceModel } from "@/model/models";
import { handleBatchInferCategories } from "@/util/api-handler";
import { updateDatastoreItems } from "@/util/datastore-util";

/*
    Takes in a list of transactions, uses LLM API to infer categories based on memo, 
    and returns a new array of Transaction objects with updated categories.
    Also updates the datastore with the new categories.
*/
export default async function handler(req: any, res: any) {
    const transactions: TransactionCategoryInferenceModel[] = req.body;
    const updatedTransactions = await handleBatchInferCategories(transactions)
    updateDatastoreItems(updatedTransactions);
    res.status(200).json(updatedTransactions);
}