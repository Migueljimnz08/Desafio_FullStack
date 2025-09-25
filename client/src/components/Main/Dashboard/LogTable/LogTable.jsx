import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getAllLogs, updateStatus, getLogsWithDetails } from "../../../../services/logServices";
import { ThreeDots } from 'react-loader-spinner';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function LogsTable() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [selectedLog, setSelectedLog] = useState(null);
  const [selectedLogDetails, setSelectedLogDetails] = useState(null); // Nuevo estado para detalles
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

  if (loading) return <>
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#007bff"
      radius="9"
      ariaLabel="three-dots-loading"
    />
    <p>Cargando logs...</p>
  </>;
  if (error) return <p>Error: {error}</p>;
  if (!logs.length) return <p>No hay logs disponibles.</p>;

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateStatus(id, newStatus);
      setLogs((prevLogs) =>
        prevLogs.map((log) =>
          log.id === id ? { ...log, status: newStatus } : log
        )
      );
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Error actualizando el status:", err);
      alert("No se pudo actualizar el estado.");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70, headerAlign: "center" },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <select
          value={params.value}
          onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
          style={{
            padding: "2px 4px",
            borderRadius: "4px",
            fontSize: "0.85rem",
            width: "90%",
            textAlign: "center",
          }}
        >
          <option value="Nuevo">Nuevo</option>
          <option value="Clasificado">Clasificado</option>
          <option value="En investigación">En Investigación</option>
          <option value="Contención">Contención</option>
          <option value="Cerrado">Cerrado</option>
        </select>
      ),
    },
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
              color: "black",
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
          onClick={async () => {
            setSelectedLog(params.row);
            setOpenModal(true);
            setSelectedLogDetails(null);
            try {
              const response = await getLogsWithDetails(params.row.id);
              console.log("Respuesta completa del backend:", response);
              const data = response.log || response; // Ajuste dinámico según estructura
              setSelectedLogDetails(data);
            } catch (err) {
              console.error("Error fetching log details:", err);
              setSelectedLogDetails({ error: "No se pudo cargar la información" });
            }
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
          width: "95%",
          maxWidth: "95%",
          margin: "20px",
          padding: 1,
          backgroundColor: "#E5E4E2",
        }}
      >
        <DataGrid
          autoHeight={false}
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
            height: "calc(100vh - 150px)",
            backgroundColor: "#E5E4E2",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#d6d5d3",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row": {
              backgroundColor: "#E5E4E2",
            },
          }}
        />
      </Paper>

      {/* Modal dinámico para mostrar todos los detalles */}
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedLogDetails(null);
        }}
        aria-labelledby="modal-log-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            maxHeight: "80vh", // altura máxima del modal
            bgcolor: "#ffffff",
            color: "#000000",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflowY: "auto", // permite scroll vertical
          }}
        >
          <Typography id="modal-log-title" variant="h6" component="h2">
            Detalles
          </Typography>

          {selectedLogDetails ? (
            <Box sx={{ mt: 2 }}>
              {Object.entries(selectedLogDetails).map(([key, value]) => {
                if (value && typeof value === "object") {
                  return (
                    <Box key={key} sx={{ mt: 1, pl: 2, borderLeft: "2px solid #ccc" }}>
                      <Typography variant="subtitle1">{key}:</Typography>
                      {Object.entries(value).map(([k, v]) => (
                        <Typography key={k}><strong>{k}:</strong> {v}</Typography>
                      ))}
                    </Box>
                  );
                }
                return (
                  <Typography key={key}><strong>{key}:</strong> {value}</Typography>
                );
              })}
            </Box>
          ) : (
            <Typography sx={{ mt: 2 }}>Cargando detalles...</Typography>
          )}

          <Button
            variant="contained"
            onClick={() => {
              setOpenModal(false);
              setSelectedLogDetails(null);
            }}
            sx={{ mt: 3 }}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ zIndex: 9999 }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%', fontSize: '1.1rem', fontWeight: 600 }}
        >
          ¡Estado actualizado!
        </Alert>
      </Snackbar>
    </>
  );
}