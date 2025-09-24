import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getAllLogs } from "../../../../services/logServices";

export default function LogsTable() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedLog, setSelectedLog] = useState(null);
  const [openModal, setOpenModal] = useState(false);

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

  const columns = [
    { field: "id", headerName: "ID", width: 70, headerAlign: "center" },
    { field: "status", headerName: "Estado", flex: 1, headerAlign: "center", align: "center" },
    { field: "type", headerName: "Tipo", flex: 1, headerAlign: "center", align: "center" },
    { field: "indicators", headerName: "Indicadores", flex: 2, headerAlign: "center", align: "center" },
    {
      field: "severity",
      headerName: "Criticidad",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const severity = params.value;
        let bgColor = "inherit";

        if (severity === 3) bgColor = "red";
        else if (severity === 2) bgColor = "orange";
        else if (severity === 1) bgColor = "yellow";

        return (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: bgColor,
              color: "black", // texto siempre negro
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1,
              fontWeight: "bold",
            }}
          >
            {severity}
          </Box>
        );
      },
    },
    { field: "date", headerName: "Fecha", width: 120, headerAlign: "center", align: "center" },
    { field: "time", headerName: "Hora", width: 100, headerAlign: "center", align: "center" },
    {
      field: "actions_taken",
      headerName: "Acciones",
      width: 150,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            setSelectedLog(params.row);
            setOpenModal(true);
          }}
        >
          Mostrar más
        </Button>
      ),
    },
  ];

  return (
    <>
      <Paper
        sx={{
          width: "80%",
          maxWidth: 900,
          margin: "20px 0 20px 20px",
          padding: 1,
        }}
      >
        <DataGrid
          autoHeight
          rows={logs}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          sx={{
            border: 0,
            minWidth: 0,
          }}
        />
      </Paper>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-actions-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-actions-title" variant="h6" component="h2">
            Actions Taken
          </Typography>
          <Typography sx={{ mt: 2 }}>
            {selectedLog?.actions_taken || "No actions recorded."}
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpenModal(false)}
            sx={{ mt: 3 }}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </>
  );
}
