import { useMemo } from "react";
import { Transaction } from "@/model/models";
import { sortAndFilterTransactions } from "@/util/trans-util";

export const useSortedFilteredTransactions = (transList: Transaction[], searchText: string) => {
    return useMemo(() => sortAndFilterTransactions(transList, searchText), [transList, searchText]);
};