import { Transaction, TransactionCategoryInferenceModel, XMLTransDataModel } from "@/model/models"
import { createDatastoreItem, readDatastore, updateDatastoreItems } from "./datastore-util"
import { extractBankTransactions } from "./xml-utils"
import { queryLLMTransactionsBatch } from "./llm-util"

export function handleUploadXml(xmlData: string) {
    const transactions: XMLTransDataModel[] = extractBankTransactions(xmlData)
    transactions.forEach((obj: XMLTransDataModel) => {
        createDatastoreItem({
            id: obj.id,
            date: obj.date,
            amount: obj.amount,
            memo: obj.memo,
            type: obj.type,
            category: "none",
            bankOrg: obj.bankOrg,
        })
    })
}

export function handleReadTransList(): Transaction[] {
    return readDatastore()
}

export async function handleBatchInferCategories(transactions: TransactionCategoryInferenceModel[]) {
    const response = await queryLLMTransactionsBatch(transactions.map((obj) => {
        return {
            id: obj.id,
            description: obj.memo
        }
    }));
    // TODO: Should not trust LLM response to update datastore directly, should validate and sanitize.
    updateDatastoreItems(response);
    // Return a new array of Transaction objects with updated categories
    // Only return transactions that align with original list, in case LLM was erratic.
    // TODO: Respond with the same validated and sanitized data from above step.
    const updatedTransactions = transactions.map((obj) => {
        const matchingResponse = response.find((resp) => resp.id === obj.id);
        return {
            ...obj,
            category: matchingResponse ? matchingResponse.category : 'none'
        }
    });
    return updatedTransactions;
}