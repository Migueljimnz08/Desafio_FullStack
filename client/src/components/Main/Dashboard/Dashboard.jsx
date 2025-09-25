import React from "react";
import LogsTable from "./LogTable/LogTable";
import Graphs from "./Graphs/Graphs";

const Dashboard = () => {
  return <section className="dashboard">
     <Graphs /> 
    <article className="logs">
      <h2>Logs registrados</h2>
      <LogsTable />
    </article>
  </section>;
};

export default Dashboard;
