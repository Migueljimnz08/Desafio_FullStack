import React from "react";
import LogsTable from "./LogTable/LogTable";
import Graphs from "./Graphs/Graphs";

const Dashboard = () => {
  return <section className="dashboard">
     <Graphs /> 
    <article className="logs">
      <LogsTable />
    </article>
  </section>;
};

export default Dashboard;
