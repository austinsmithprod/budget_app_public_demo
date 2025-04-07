import React from 'react';
import { MonthYear } from '@/model/models';
import ToolbarButton from '../common/ToolbarButton';
import { getNextMonth, getPreviousMonth, monthNames } from '@/util/date-util';

interface MonthSelectorProps {
    selectedMonthYear: MonthYear,
    onChange: (monthYear: MonthYear) => void;
}

const MonthSelector = ({ selectedMonthYear, onChange }: MonthSelectorProps) => {

    return (
        <div className={'flex items-center p-4 bg-white rounded-lg shadow-md'}>
            <ToolbarButton onClick={() => onChange(getPreviousMonth(selectedMonthYear))} label="&lt;" styleString='w-16' />
            <span className='text-lg w-[200px] text-center'>{`${monthNames[selectedMonthYear.month]} ${selectedMonthYear.year.toString()}`}</span>
            <ToolbarButton onClick={() => onChange(getNextMonth(selectedMonthYear))} label="&gt;" styleString='w-16' />
        </div>
    );
};

export default MonthSelector;