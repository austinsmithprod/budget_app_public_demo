import { useState } from "react";
import { MonthYear } from "@/model/models";

export const useSelectedMonthYear = () => {
    const currentDate = new Date();
    const defaultMonthYear = {
        month: (currentDate.getMonth() - 1 + 12) % 12,
        year: currentDate.getFullYear(),
    };
    const [selectedMonthYear, setSelectedMonthYear] = useState<MonthYear>(defaultMonthYear);
    return {
        selectedMonthYear,
        setSelectedMonthYear,
    };
};