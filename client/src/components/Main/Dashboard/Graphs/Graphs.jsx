import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { getDdosGraph, getPhishingGraph, getLoginGraph, ddosLayout, phishingLayout, loginLayout } from "../../../../services/graphServices";
import { ThreeDots } from 'react-loader-spinner';

function App() {
  const [ddosGraph, setDdosGraph] = useState(null);
  const [phishingGraph, setPhishingGraph] = useState(null);
  const [loginGraph, setLoginGraph] = useState(null);

  useEffect(() => {
    const getGraphs = async () => {
      const ddos = await getDdosGraph();
      setDdosGraph(ddos)
      const phishing = await getPhishingGraph();
      setPhishingGraph(phishing)
      const login = await getLoginGraph();
      setLoginGraph(login)
    };
    getGraphs()
  }, []);

  return (
    <article className="graphs">
      {ddosGraph && phishingGraph && loginGraph ? ( 
        <>
        <Plot data={ddosGraph.data} layout={ddosLayout} config={{ displayModeBar: false }}/>
        <Plot data={phishingGraph.data} layout={phishingLayout} config={{ displayModeBar: false }}/>
        <Plot data={loginGraph.data} layout={loginLayout} config={{ displayModeBar: false }}/> 
        </> 
      ) : (
        <div className="graphs-loader">
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
        </div>
      )}
    </article>
  );
}
export default App;