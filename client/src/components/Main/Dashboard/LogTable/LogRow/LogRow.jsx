import React from "react";
import { useState } from "react";

const LogRow = ({ log }) => {
  const [showMore, setShowMore] = useState(false);

  // const getSeverityClass = () => {
  //   if (log.severity >= 8) return "high-severity";
  //   if (log.severity >= 5) return "medium-severity";
  //   return "low-severity";
  // };

  return (
    <tr>
      <td>{log.id}</td>
      <td>{log.company_id}</td>
      <td>{log.status}</td>
      <td>{log.type}</td>
      <td>{log.indicators}</td>
      <td>{log.severity}</td>
      <td>{log.date}</td>
      <td>{log.time}</td>
      <td>
        <button
          onClick={() => setShowMore(!showMore)}
          style={{ marginLeft: "5px" }}
        >
          {showMore ? "Mostrar menos" : "Mostrar más"}
        </button>
      </td>
    </tr>
  );
};


export default LogRow;
