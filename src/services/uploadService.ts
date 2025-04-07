export const uploadXMLFile = async (file: File): Promise<boolean> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("/api/uploadXML", {
            method: "POST",
            body: formData,
        });
        return response.ok;
    } catch (error) {
        console.error("Upload error:", error);
        return false;
    }
};