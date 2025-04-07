import React, { useMemo } from 'react';
import PieBudgetIndicator from '../../../components/ui/PieBudgetIndicator/PieBudgetIndicator';
import { CategoryData } from '@/model/models';
import { filterBudgetedCategories, getDisplayLabel } from '@/util/category-util';

interface BudgetSummaryChartsProps {
    categoryData: CategoryData[];
}

const BudgetSummaryCharts = ({ categoryData }: BudgetSummaryChartsProps) => {

    // Filter to only show categories where budget is non-zero.
    const displayCategories = useMemo(
        () => filterBudgetedCategories(categoryData).filter(c => c.total !== 0),
        [categoryData]
    );

    return (
        <div className='flex flex-wrap gap-4'>
            {displayCategories.map(({ category, total, budget }) => (
                <ChartCard
                    key={category}
                    label={getDisplayLabel(category)}
                    amount={total}
                    budget={budget}
                />
            ))}
        </div>
    );
};

const ChartCard = ({
    label,
    amount,
    budget
}: {
    label: string;
    amount: number;
    budget: number;
}) => (
    <div className="flex flex-col items-center justify-center rounded-lg p-4 shadow-md bg-white border border-gray-300">
        <p className="text-l font-bold mb-4">{label}</p>
        <PieBudgetIndicator amount={amount} budget={budget} />
    </div>
);

export default React.memo(BudgetSummaryCharts);