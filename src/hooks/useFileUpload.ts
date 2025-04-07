import { uploadXMLFile } from "@/services/uploadService";
import toast from "react-hot-toast";

export const useFileUpload = () => {
    const handleUpload = async (file: File, onSuccess?: () => void) => {
        await toast.promise(uploadXMLFile(file), {
            loading: "Uploading...",
            success: "Upload Successful",
            error: "Upload Failed",
        }).then(() => {
            if (onSuccess) onSuccess();
        });
    };

    return { handleUpload };
};