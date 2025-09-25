
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

export const ddosLayout = {
  width: 350, 
  height: 250, 
  paper_bgcolor: "#282c34", // fondo de la gráfica 
  plot_bgcolor: "#f8f9fa",  // fondo del área de datos 
  font: {
    color: "white",         
    family: "Arial",        
    size: 14
  },
  margin: { t: 40, l: 40, r: 40, b: 40 },
  title: {
    text: "DDOS",
    font: { color: "white", size: 18 } 
  },
  // Puedes personalizar ejes, leyendas, etc.
  xaxis: { color: "#007bff" },
  yaxis: { color: "#007bff" }
};

export const phishingLayout = {
  width: 350, 
  height: 250, 
  paper_bgcolor: "#282c34", // fondo de la gráfica 
  plot_bgcolor: "#f8f9fa",  // fondo del área de datos 
  font: {
    color: "white",         
    family: "Arial",        
    size: 14
  },
  margin: { t: 40, l: 40, r: 40, b: 40 },
  title: {
    text: "PHISHING",
    font: { color: "white", size: 18 } 
  },
  // Puedes personalizar ejes, leyendas, etc.
  xaxis: { color: "#007bff" },
  yaxis: { color: "#007bff" }
};

export const loginLayout = {
  width: 350, 
  height: 250, 
  paper_bgcolor: "#282c34", // fondo de la gráfica 
  plot_bgcolor: "#f8f9fa",  // fondo del área de datos 
  font: {
    color: "white",         
    family: "Arial",        
    size: 14
  },
  margin: { t: 40, l: 40, r: 40, b: 40 },
  title: {
    text: "LOG-IN",
    font: { color: "white", size: 18 } 
  },
  // Puedes personalizar ejes, leyendas, etc.
  xaxis: { color: "#007bff" },
  yaxis: { color: "#007bff" }
};