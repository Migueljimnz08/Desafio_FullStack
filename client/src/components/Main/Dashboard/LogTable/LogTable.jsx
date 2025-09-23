// import React from "react";
import { useState, useEffect } from "react";
import LogRow from "./LogRow/LogRow";
import { getAllLogs } from '../../../../services/logServices'

const LogsTable = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getAllLogs();
        setLogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) return <p>Cargando logs...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!logs.length) return <p>No hay logs disponibles.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Company ID</th>
          <th>Status</th>
          <th>Type</th>
          <th>Indicators</th>
          <th>Severity</th>
          <th>Date</th>
          <th>Time</th>
          <th>Actions Taken</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <LogRow key={log.id} log={log} />
        ))}
      </tbody>
    </table>
  );
};

export default LogsTable;

