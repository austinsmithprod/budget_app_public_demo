import { handleUploadXml } from '@/util/api-handler';

export const config = {
    api: {
        bodyParser: false, // Disable Next.js built-in body parser
    },
};

export default async function handler(req: any, res: any) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const rawData = await new Promise<string>((resolve, reject) => {
            let data = "";

            req.on("data", (chunk: string) => {
                data += chunk;
            });

            req.on("end", () => {
                resolve(data);
            });

            req.on("error", (err: any) => {
                reject(err);
            });
        });

        console.log("RAWDATA:", rawData);
        handleUploadXml(rawData);
        return res.status(200).json({ message: "Data received", data: rawData });

    } catch (err) {
        console.error("UPLOAD ERROR", err);
        return res.status(500).json({ message: "Server error" });
    }
}