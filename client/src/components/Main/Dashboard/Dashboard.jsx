import React from "react";
import LogsTable from "./LogTable/LogTable";
import Graphs from "./Graphs/Graphs";

const Dashboard = () => {
  return <section>
    <Graphs />
    <LogsTable />
  </section>;
};

export default Dashboard;
