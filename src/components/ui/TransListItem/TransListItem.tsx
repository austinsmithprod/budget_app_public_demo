import React, { useState } from 'react';
import { Transaction } from "@/model/models"
import { useTransactionDisplay } from '@/hooks/useTransactionDisplay';

type TransListItemProps = {
    trans: Transaction,
    onClick?: (trans: Transaction) => void;
    isLoading?: boolean;
}

const TransListItem = ({ trans, onClick, isLoading = false }: TransListItemProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const {
        amountText,
        dateText,
        backgroundColor,
        categoryClass
    } = useTransactionDisplay(trans, isHovered);

    const handleOnClick = () => {
        onClick?.(trans);
    };

    const cellClassNameMemo = `flex mx-4 min-w-[40%] line-clamp-2 overflow-hidden`
    const cellClassNameDetail = "flex text-center min-w-[15%] items-center"

    return (
        <div
            className={`flex h-[50px] ${backgroundColor}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleOnClick} >
            <div
                key={trans.id}
                className={`flex w-full`} >
                <div className={cellClassNameMemo}>{trans.memo}</div>
                <div className={cellClassNameDetail}>{dateText}</div>
                <div className={cellClassNameDetail}>{amountText}</div>
                <div className={cellClassNameDetail}>{trans.bankOrg}</div>
                <div className={cellClassNameDetail}>
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-4 border-dashed border-blue-500"></div>
                    ) : (
                        <span className={`font-semibold ${categoryClass}`}>{trans.category}</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default React.memo(TransListItem);