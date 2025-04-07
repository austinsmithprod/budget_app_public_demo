import { getPrefs } from "@/util/prefs-util"

export default function handler(req: any, res: any) {
    const data = getPrefs()
    res.status(200).json(data);
}