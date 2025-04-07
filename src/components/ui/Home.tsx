import BudgetSummary from "@/features/Budget/BudgetSummary/BudgetSummary";
import { TabbedLayout, TabItem } from "@/components/ui/common/TabbedLayout/TabbedLayout";
import TransDashboard from "@/features/Transactions/TransDashboard/TransDashboard";
import React from 'react';
import ListIcon from '@mui/icons-material/List';
import PieChartIcon from '@mui/icons-material/PieChart';
import { useTransactions } from "@/hooks/useTransactions";
import { useCategoryBudgets } from "@/hooks/useCategoryBudgets";
import { useRefreshTrigger } from "@/hooks/useRefreshTrigger";

export default function Home() {

    const { refreshCounter, triggerRefresh } = useRefreshTrigger();
    const { transactions, updateTransactions } = useTransactions(refreshCounter);
    const categoryBudgets = useCategoryBudgets(refreshCounter);

    const tabItems: TabItem[] = [
        {
            label: "Transactions",
            content: (
                <div>
                    <TransDashboard transList={transactions} onTriggerRefresh={triggerRefresh} onUpdateTransactions={updateTransactions} />
                </div>
            ),
            Icon: ListIcon
        },
        {
            label: "Budget",
            content: (
                <div>
                    <BudgetSummary transList={transactions} categoryBudgets={categoryBudgets} onTriggerRefresh={triggerRefresh} />
                </div>
            ),
            Icon: PieChartIcon
        }
    ]

    return (
        <div className="min-h-screen flex flex-col">
            <TabbedLayout tabItems={tabItems} />
        </div>
    );
}