import { Transaction } from "@/model/models";
import { useState } from "react";
import TransList from "../TransList/TransList"
import React from "react";
import ToolbarButton from "../../../components/ui/common/ToolbarButton";
import toast from "react-hot-toast";
import FileUpload from "@/features/Upload/FileUpload/FileUpload";
import { useInferCategories } from "@/hooks/useInferCategories";
import { useSortedFilteredTransactions } from "@/hooks/useSortedFilteredTransactions";
import EmptyData from "@/components/ui/EmptyData";

type TransDashboardProps = {
    transList: Transaction[]
    onTriggerRefresh?: () => void;
    onUpdateTransactions?: (transactions: Transaction[]) => void;
}

const TransDashboard = ({
    transList = [],
    onTriggerRefresh = () => { },
    onUpdateTransactions = () => { }
}: TransDashboardProps) => {

    const [inputSearchText, setInputSearchText] = useState<string>("")
    const displayItems = useSortedFilteredTransactions(transList, inputSearchText);
    const { inferCategories, loadingIds } = useInferCategories(transList, onUpdateTransactions);

    const handleInference = async () => {
        toast.promise(inferCategories(), {
            loading: "Inferring Categories...",
            success: "Inference complete!",
            error: "Error during inference",
        });
    };

    return (
        <div className="flex-col bg-gray-100 p-4 h-screen">
            {/* Toolbar */}
            <div className={'flex w-fit items-center p-4 bg-white rounded-lg shadow-md'}>
                <div className="flex space-x-4">
                    <FileUpload onSuccess={onTriggerRefresh} />
                    <ToolbarButton label="Infer Categories" onClick={handleInference} styleString="" />
                    <div className="flex px-4 py-2 bg-gray-500 text-white rounded-lg">
                        <div>Search:</div>
                        <input
                            className="text-black ml-2 pl-2"
                            type='text'
                            onInput={(e) => setInputSearchText(e.currentTarget.value)}
                        />
                    </div>
                </div>
            </div>
            {/* List */}
            <div className="flex w-fit mt-4 pb-4 px-4 rounded-lg shadow-md bg-white border border-gray-300">
                {displayItems.length > 0 ?
                    <TransList items={displayItems} onTriggerRefresh={onTriggerRefresh} loadingIds={loadingIds} />
                    : <EmptyData />}
            </div>
        </div>
    )
}

export default React.memo(TransDashboard);