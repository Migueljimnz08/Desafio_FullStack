import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { getDdosGraph, getPhishingGraph, getLoginGraph } from "../../../../services/graphServices";
import { ThreeDots } from 'react-loader-spinner';

function App() {
  const [ddosGraph, setDdosGraph] = useState(null);
  const [phishingGraph, setPhishingGraph] = useState(null);
  const [loginGraph, setLoginGraph] = useState(null);

  useEffect(() => {
    const getGraphs = async () => {
      const ddos = await getDdosGraph();
      console.log(ddos);
      setDdosGraph(ddos)
      const phishing = await getPhishingGraph();
      console.log(phishing);
      setPhishingGraph(phishing)
      const login = await getLoginGraph();
      console.log(login);
      setLoginGraph(login)
    };
    getGraphs()
  }, []);

  return (
    <article>
      <h1>Gráficas de las alertas</h1>
      {ddosGraph && phishingGraph && loginGraph ? ( 
        <>
        <Plot data={ddosGraph.data} layout={ddosGraph.layout} />
        <Plot data={phishingGraph.data} layout={phishingGraph.layout} />
        <Plot data={loginGraph.data} layout={loginGraph.layout} /> 
        </>
      ) : (
        <>
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#007bff"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
        <p>Cargando gráficas...</p>
        </>
      )}
    </article>
  );
}
export default App;