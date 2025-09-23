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