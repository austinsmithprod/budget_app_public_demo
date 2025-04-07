import { Transaction } from "@/model/models"
import React from "react"
import ToolbarButton from "../common/ToolbarButton";
import Modal from "react-modal";
import { useTransactionEditor } from "@/hooks/useTransactionEditor";
import ClearIcon from '@mui/icons-material/Clear';

interface ModalEditTransProps {
    transaction: Transaction,
    isOpen: boolean,
    onClose: () => void,
    onSave: (trans: Transaction, applyAll: boolean) => void,
}

const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        // marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        border: 'none',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
};

const ModalEditTrans = ({
    transaction,
    isOpen = false,
    onClose,
    onSave
}: ModalEditTransProps) => {

    const {
        categoryText,
        isApplyAllChecked,
        updateCategory,
        toggleApplyAll,
        getUpdatedTransaction,
    } = useTransactionEditor(transaction);

    function handleSaveClick() {
        onSave(getUpdatedTransaction(), isApplyAllChecked);
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={modalStyle}>
            <div
                className="rounded-lg w-full max-w-sm overflow-hidden">
                <h2 className="font-semibold p-4 bg-blue-500 text-white">Edit Transaction</h2>
                <div className="bg-white p-4">
                    <div className="m-8 flex flex-col space-y-4">
                        <div className="font-semibold">
                            {transaction.memo}
                        </div>
                        <label className={"flex items-center space-x-2"}>
                            <div>Category: </div>
                            <input
                                value={categoryText}
                                className={"ml-4 p-1 border-2 border-gray-300 rounded-md"}
                                type="text"
                                onInput={(e) => updateCategory(e.currentTarget.value)} />
                            <button
                                className="ml-2 text-white rounded-md bg-red-400 p-1"
                                onClick={() => updateCategory("none")}>
                                <ClearIcon />
                            </button>
                        </label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="applyToAll"
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                checked={isApplyAllChecked}
                                onChange={(e) => toggleApplyAll(e.target.checked)} />
                            <label htmlFor="applyToAll" className="text-white-700">
                                Apply to all with same name
                            </label>
                        </div>
                    </div>
                    <div className={"flex justify-end space-x-4"}>
                        <ToolbarButton label="Save" onClick={handleSaveClick} />
                        <ToolbarButton label="Close" onClick={onClose} />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ModalEditTrans