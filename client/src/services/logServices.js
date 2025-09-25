export const getAllLogs = async () => {
    try {
        const res = await fetch("/api/logs");
        if (!res.ok) throw new Error("Error fetching logs");
        const data = await res.json();
        return data.data || data;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const updateStatus = async (id, status) => {
    try {
        const res = await fetch("/api/logs", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, status }),
            credentials: 'include',
        });
        if (!res.ok) {
            throw new Error('Error updating status');
        }
        return await res.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getLogsWithDetails = async (logId) => {
    try {
        const res = await fetch(`/api/logs/details?logId=${logId}`);
        if (!res.ok) throw new Error("Error fetching logs");
        const data = await res.json();
        return data.log || data;
    } catch (err) {
        throw new Error(err.message);
    }
};

