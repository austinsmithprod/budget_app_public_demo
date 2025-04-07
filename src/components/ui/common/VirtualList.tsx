import React from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";

type VirtualListProps<T> = {
    items: T[];
    itemHeight?: number;
    maxHeight?: number;
    width?: number;
    renderItem: (item: T, index: number, style: React.CSSProperties) => React.ReactNode;
};

const VirtualList = <T,>({
    items,
    itemHeight = 50,
    maxHeight = 1000,
    width = 1200,
    renderItem
}: VirtualListProps<T>) => {
    const itemCount = items.length;
    const height = Math.min((itemCount * itemHeight) + 16, maxHeight);

    const Row = ({ index, style }: ListChildComponentProps) => {
        return renderItem(items[index], index, style);
    };

    return (
        <List
            height={height}
            itemCount={itemCount}
            itemSize={itemHeight}
            width={width}
        >
            {Row}
        </List>
    );
};

export default VirtualList;