import React, { useMemo } from 'react';
import { BudgetCategorySummaryModel } from '@/model/models'; // Make sure the path is correct
import PieBudgetIndicator from '../../../components/ui/PieBudgetIndicator/PieBudgetIndicator';
import TransList from '../../Transactions/TransList/TransList';

interface BudgetSummaryListProps {
  summary: BudgetCategorySummaryModel,
  onTriggerRefresh?: () => void
}

const BudgetSummaryList = ({ summary, onTriggerRefresh }: BudgetSummaryListProps) => {
  const { tag, total, budget = 0, items } = summary;

  const formatted = useMemo(() => ({
    total: Number(total.toFixed(2)),
    budget: Number(budget.toFixed(2)),
    displayTotal: `$${Math.round(total).toLocaleString()}`,
    displayBudget: `$${Math.round(budget).toLocaleString()}`,
    label: tag.toUpperCase()
  }), [summary]);

  const showPie = false //budget > 0

  return (
    <div className="my-4 flex flex-col">
      <div className="w-[1240px] rounded-lg border border-gray-300 bg-white p-4 shadow-md">
        <div className="flex w-full items-center justify-between p-2">
          <h2 className="text-xl font-bold">{formatted.label}</h2>
          <div className="flex items-center gap-4">
            {showPie && <PieBudgetIndicator amount={formatted.total} budget={formatted.budget} />}
            <p className="text-lg font-bold">
              {formatted.displayTotal} / {formatted.displayBudget}
            </p>
          </div>
        </div>

        <TransList items={items} onTriggerRefresh={onTriggerRefresh} />
      </div>
    </div>
  );
};

export default BudgetSummaryList;