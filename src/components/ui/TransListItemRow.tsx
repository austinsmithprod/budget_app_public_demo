import React from "react";
import { Transaction } from "@/model/models";
import TransListItem from "@/components/ui/TransListItem/TransListItem";

type TransListItemRowProps = {
    trans: Transaction;
    index: number;
    style: React.CSSProperties;
    onClick: (trans: Transaction) => void;
    isLoading: boolean;
};

const TransListItemRow = ({ trans, index, style, onClick, isLoading }: TransListItemRowProps) => {
    const itemBorder = index === 0 ? '' : 'border-t border-gray-300';
    const background = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';

    return (
        <div style={style}>
            <div className={`${background} ${itemBorder}`}>
                <TransListItem
                    key={trans.id}
                    trans={trans}
                    onClick={onClick}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default TransListItemRow;