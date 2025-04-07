import ToolbarButton from "@/components/ui/common/ToolbarButton";
import { useFileUpload } from "@/hooks/useFileUpload";
import React, { useRef } from "react";

type FileUploadProps = {
    styleString?: string;
    onSuccess?: () => void;
};

const FileUpload = ({ styleString, onSuccess }: FileUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { handleUpload } = useFileUpload();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) handleUpload(file, onSuccess);
        event.target.value = "";
    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden" />
            <ToolbarButton
                label="Upload File"
                onClick={() => fileInputRef.current?.click()}
            />
        </div>
    );
};

export default FileUpload;