import { handleReadTransList } from "@/util/api-handler";

export default function handler(req: any, res: any) {
    const data = handleReadTransList();
    res.status(200).json(data);
}