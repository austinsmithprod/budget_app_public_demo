import { useState } from "react";
import { Transaction } from "@/model/models";
import { inferCategoriesBatch } from "@/services/transactionsService";

export const useInferCategories = (
    transList: Transaction[],
    onUpdate: (updated: Transaction[]) => void,
    batchSize: number = 5
) => {
    const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

    const inferCategories = async () => {
        const transactionsToProcess = transList.filter((item) => item.category === "none");

        for (let i = 0; i < transactionsToProcess.length; i += batchSize) {
            const batch = transactionsToProcess.slice(i, i + batchSize);
            const batchIds = batch.map((item) => item.id);
            setLoadingIds((prev) => new Set([...prev, ...batchIds]));

            const updatedBatch = await inferCategoriesBatch(batch);
            const updatedMap = new Map(updatedBatch.map(item => [item.id, item.category]));

            const updatedItems = transList
                .filter(item => updatedMap.has(item.id))
                .map(item => ({
                    ...item,
                    category: updatedMap.get(item.id) || item.category,
                }));

            onUpdate(updatedItems);

            setLoadingIds((prev) => {
                const newSet = new Set(prev);
                batchIds.forEach(id => newSet.delete(id));
                return newSet;
            });
        }
    };

    return { inferCategories, loadingIds };
};