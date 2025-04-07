import { updateDatastoreItem, updateTransCategoriesByMemoBulk } from "@/util/datastore-util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const obj = req.body;
            const memo = obj.memo;
            const category = obj.category;
            if (!memo || !category) {
                return res.status(400).json({ error: 'memo and category is required' });
            }
            updateTransCategoriesByMemoBulk(memo, category);
            return res.status(200).json({});
        } catch (error) {
            console.error("Error in writing transaction:", error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}