import { MonthYear } from "@/model/models";

export function getPreviousMonth({ month, year }: MonthYear): MonthYear {
    return month === 0
        ? { month: 11, year: year - 1 }
        : { month: month - 1, year };
}

export function getNextMonth({ month, year }: MonthYear): MonthYear {
    return month === 11
        ? { month: 0, year: year + 1 }
        : { month: month + 1, year };
}

export const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];