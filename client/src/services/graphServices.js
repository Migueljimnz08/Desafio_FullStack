
export const getLoginGraph = async () => {
    try {
        const res = await fetch("https://firewatch-api-flask.onrender.com/grafica_login");
        if (!res.ok) throw new Error("Error fetching log in graph");
        const data = await res.json();
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const getPhishingGraph = async () => {
    try {
        const res = await fetch("https://firewatch-api-flask.onrender.com/grafica_phishing");
        if (!res.ok) throw new Error("Error fetching phishing graph");
        const data = await res.json();
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const getDdosGraph = async () => {
    try {
        const res = await fetch("https://firewatch-api-flask.onrender.com/grafica_ddos");
        if (!res.ok) throw new Error("Error fetching ddos graph");
        const data = await res.json();
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};