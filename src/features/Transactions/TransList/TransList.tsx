import React, { useEffect, useMemo } from 'react';
import { Transaction } from '../../../model/models'
import { useState } from "react";
import Modal from "react-modal";
import ModalEditTrans from '@/components/ui/ModalEditTrans/ModalEditTrans';
import { useTransactionUpdater } from '@/hooks/useTransactionUpdater';
import VirtualList from '@/components/ui/common/VirtualList';
import TransListItemRow from '@/components/ui/TransListItemRow';

type TransListProps = {
    items: Transaction[],
    onTriggerRefresh?: () => void,
    loadingIds?: Set<string>
}

const TransList = ({
    items,
    onTriggerRefresh,
    loadingIds = new Set()
}: TransListProps) => {

    const [selectedTrans, setSelectedTrans] = useState<Transaction | null>(null);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            Modal.setAppElement(document.body);
        }
    }, []);

    const closeModal = () => {
        setSelectedTrans(null);
    };

    const { saveTransaction } = useTransactionUpdater(() => {
        closeModal();
        onTriggerRefresh?.();
    });

    return (
        <>
            <div className={"inline-block border border-gray-300 mt-4"}>
                <VirtualList
                    items={items}
                    renderItem={(trans, index, style) => (
                        <TransListItemRow
                            trans={trans}
                            index={index}
                            style={style}
                            onClick={setSelectedTrans}
                            isLoading={loadingIds.has(trans.id)}
                        />
                    )}
                />
            </div>
            {selectedTrans &&
                <ModalEditTrans
                    transaction={selectedTrans}
                    isOpen={selectedTrans != null}
                    onClose={closeModal}
                    onSave={saveTransaction} />
            }
        </>
    )
};

export default React.memo(TransList);