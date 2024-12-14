import {
  Tabs,
  Tab,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const SummaryPage = () => {
  const [selectedFileVentas, setSelectedFileVentas] = useState(null);
  const [selectedFileGastos, setSelectedFileGastos] = useState(null);
  const [ingresosConIVA, setIngresosConIVA] = useState(0);
  const [ingresosSinIVA, setIngresosSinIVA] = useState(0);
  const [gastosConIVA, setGastosConIVA] = useState(0);
  const [gastosSinIVA, setGastosSinIVA] = useState(0);
  const [balanceActualConIVA, setBalanceActualConIVA] = useState(0);
  const [balanceActualSinIVA, setBalanceActualSinIVA] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loadingVentas, setLoadingVentas] = useState(false); 
  const [loadingGastos, setLoadingGastos] = useState(false); 
  const [progressVentas, setProgressVentas] = useState(0); 
  const [progressGastos, setProgressGastos] = useState(0);

  // Manejador para la carga de archivo de ventas
  const handleFileUploadVentas = (event) => {
    setSelectedFileVentas(event.target.files[0]);
  };

  // Manejador para la carga de archivo de gastos
  const handleFileUploadGastos = (event) => {
    setSelectedFileGastos(event.target.files[0]);
  };

  // Función para enviar archivo de ventas
  const handleSubmitVentas = async () => { 
    if (selectedFileVentas) { 
      const formData = new FormData(); 
      formData.append("file", selectedFileVentas); 
      setLoadingVentas(true); 
      setProgressVentas(0); 
      try { 
        const response = await axios.post( "http://localhost:3001/excel/upload-ventas", 
         formData, 
         { 
          headers: { "Content-Type": "multipart/form-data" }, 
          onUploadProgress: (progressEvent) => { 
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total); 
            setProgressVentas(percentCompleted); 
          } 
        } 
      ); 
      console.log("Respuesta del servidor (ventas):", response.data); 
      setSnackbarMessage("Archivo de ventas cargado exitosamente"); 
      setSnackbarSeverity("success"); setOpenSnackbar(true); 
    } catch (error) { 
      console.error("Error al enviar el archivo de ventas:", error); 
      setSnackbarMessage("Error al cargar el archivo de ventas"); 
      setSnackbarSeverity("error"); 
      setOpenSnackbar(true); 
    } finally { 
      setLoadingVentas(false); 
    } 
  } 
};

  // Función para enviar archivo de gastos
  const handleSubmitGastos = async () => { 
    if (selectedFileGastos) { 
      const formData = new FormData(); 
      formData.append("file", selectedFileGastos); 
      setLoadingGastos(true); 
      setProgressGastos(0); 
      try { 
        const response = await axios.post( "http://localhost:3001/excel/upload-gastos", 
         formData, 
         { 
          headers: { "Content-Type": "multipart/form-data" }, 
          onUploadProgress: (progressEvent) => { 
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total); 
            setProgressGastos(percentCompleted); 
          } 
        } 
      ); 
      console.log("Respuesta del servidor (gastos):", response.data); 
      setSnackbarMessage("Archivo de gastos cargado exitosamente"); 
      setSnackbarSeverity("success"); setOpenSnackbar(true); 
    } catch (error) { 
      console.error("Error al enviar el archivo de gastos:", error); 
      setSnackbarMessage("Error al cargar el archivo de gastos"); 
      setSnackbarSeverity("error"); 
      setOpenSnackbar(true); 
    } finally { setLoadingGastos(false); 

    } 
  } 
};

  // Obtener datos de ingresos y gastos del backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ingresosConIVAResponse = await axios.get("http://localhost:3001/finanzas/ventas/totalesConIVA");
        const gastosConIVAResponse = await axios.get("http://localhost:3001/finanzas/gastos/totalesConIVA");
  
        const totalIngresosConIVA = ingresosConIVAResponse.data.total || 0;
        const totalIngresosSinIVA = Math.abs(totalIngresosConIVA/1.19);
        const totalGastosConIVA = Math.abs(gastosConIVAResponse.data.total) || 0;
        const totalGastosSinIVA = Math.abs(totalGastosConIVA/1.19);

        setIngresosConIVA(totalIngresosConIVA);
        setIngresosSinIVA(totalIngresosSinIVA);
        setGastosConIVA(totalGastosConIVA);
        setGastosSinIVA(totalGastosSinIVA);
        setBalanceActualConIVA(totalIngresosConIVA - totalGastosConIVA);
        setBalanceActualSinIVA(totalIngresosSinIVA - totalGastosSinIVA); // Puedes ajustar el balance actual según tu preferencia
      } catch (error) {
        console.error("Error al obtener datos financieros:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", paddingTop: 20 }}>
      <Tabs
        textColor="secondary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
        centered
        sx={{
          backgroundColor: "#393838",
          "& .MuiTab-root": {
            minWidth: "auto",
            paddingX: 4,
            fontWeight: 500,
            fontFamily: "Arial, sans-serif",
            "&:hover": { color: "#9b9b9b" },
          },
        }}
      >
      </Tabs>

      <Container maxWidth="sm" sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Resumen Financiero
        </Typography>

        <Grid container spacing={4}>
          {/* Subir Archivo Ventas */}
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Subir Archivo Ventas
                </Typography>
                <input
                  type="file"
                  accept=".xls, .xlsx"
                  onChange={handleFileUploadVentas}
                  style={{ display: "block", marginTop: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitVentas}
                  sx={{ marginTop: 2 }}
                >
                  {loadingVentas ? <CircularProgress size={24} /> : 'Subir Archivo de Ventas'} 
                  </Button> {loadingVentas && <LinearProgress variant="determinate" value={progressVentas} sx={{ marginTop: 2 }} />} 
              </CardContent> 
            </Card> 
          </Grid>

          {/* Subir Archivo Gastos */}
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Subir Archivo Gastos
                </Typography>
                <input
                  type="file"
                  accept=".xls, .xlsx"
                  onChange={handleFileUploadGastos}
                  style={{ display: "block", marginTop: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitGastos}
                  sx={{ marginTop: 2 }}
                >
                  {loadingGastos ? <CircularProgress size={24} /> : 'Subir Archivo de Gastos'} 
                  </Button> {loadingGastos && <LinearProgress variant="determinate" value={progressGastos} sx={{ marginTop: 2 }} />} 
              </CardContent> 
            </Card> 
          </Grid>

          {/* Balance General con IVA */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Balance Actual (Con IVA)</Typography>
                <Typography variant="h4" color="primary">
                  ${balanceActualConIVA.toLocaleString()}
                </Typography>
                <Typography color="textSecondary">Después de gastos e ingresos (con IVA)</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Balance General sin IVA */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Balance Actual (Sin IVA)</Typography>
                <Typography variant="h4" color="primary">
                  ${balanceActualSinIVA.toLocaleString()}
                </Typography>
                <Typography color="textSecondary">Después de gastos e ingresos (sin IVA)</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Ingresos Totales con IVA */}
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Ingresos Totales (Con IVA)</Typography>
                <Typography variant="h5" color="primary">
                  ${ingresosConIVA.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Ingresos Totales sin IVA */}
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Ingresos Totales (Sin IVA)</Typography>
                <Typography variant="h5" color="primary">
                  ${ingresosSinIVA.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Gastos Totales con IVA */}
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Gastos Totales (Con IVA)</Typography>
                <Typography variant="h5" color="secondary">
                  ${gastosConIVA.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Gastos Totales sin IVA */}
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Gastos Totales (Sin IVA)</Typography>
                <Typography variant="h5" color="secondary">
                  ${gastosSinIVA.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Posición centrada
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SummaryPage;
