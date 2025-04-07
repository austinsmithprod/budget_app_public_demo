import { CategoryBudgets, MonthYear, Transaction } from "@/model/models";
import { useMemo } from "react";
import { getFilteredSortedCategoryData, getFilteredTrans } from "@/util/trans-util";
import React from "react";
import MonthSelector from "@/components/ui/MonthSelector/MonthSelector";
import BudgetSummaryCharts from "../BudgetSummaryCharts/BudgetSummaryCharts";
import BudgetSummaryList from "../BudgetSummaryList/BudgetSummaryList";
import EmptyData from "@/components/ui/EmptyData";
import { useSelectedMonthYear } from "@/hooks/useSelectedMonthYear";

type BudgetSummaryProps = {
    transList: Transaction[],
    categoryBudgets: CategoryBudgets,
    onTriggerRefresh: () => void;
}

const BudgetSummary = ({
    transList = [],
    categoryBudgets,
    onTriggerRefresh = () => { }
}: BudgetSummaryProps) => {

    const { selectedMonthYear, setSelectedMonthYear } = useSelectedMonthYear();
    const categoryData = useMemo(() =>
        getFilteredSortedCategoryData(transList, categoryBudgets, selectedMonthYear),
        [transList, categoryBudgets, selectedMonthYear]
    );

    return (
        <div className="flex-col bg-gray-100 p-4 h-full">
            <div className={"mb-4 w-fit"}>
                <MonthSelector selectedMonthYear={selectedMonthYear} onChange={setSelectedMonthYear} />
            </div>
            <div className={"flex-wrap max-w-[1200px]"}>
                <BudgetSummaryCharts categoryData={categoryData} />
            </div>
            {categoryData.length > 0 ?
                categoryData.map((categoryDataItem) => (
                    <div key={categoryDataItem.category}>
                        <BudgetSummaryList
                            summary={{
                                tag: categoryDataItem.category,
                                total: categoryDataItem.total,
                                budget: categoryDataItem.budget,
                                items: getFilteredTrans(transList, categoryDataItem.category, selectedMonthYear)
                            }} onTriggerRefresh={onTriggerRefresh} />
                    </div>
                )) : <EmptyData />}
        </div>
    )
}

export default React.memo(BudgetSummary);