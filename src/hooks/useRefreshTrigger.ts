import { useState, useCallback } from "react";

export const useRefreshTrigger = () => {
    const [refreshCounter, setRefreshCounter] = useState(0);

    const triggerRefresh = useCallback(() => {
        setRefreshCounter(c => c + 1);
    }, []);

    return { refreshCounter, triggerRefresh };
};