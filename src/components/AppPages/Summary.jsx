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
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const SummaryPage = () => {
  const [selectedFileVentas, setSelectedFileVentas] = useState(null);
  const [selectedFileGastos, setSelectedFileGastos] = useState(null);
  const [ingresosTotales, setIngresosTotales] = useState(0);
  const [gastosTotales, setGastosTotales] = useState(0);
  const [balanceActual, setBalanceActual] = useState(0);

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

      try {
        const response = await axios.post(
          "http://localhost:3001/excel/upload-ventas",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("Respuesta del servidor (ventas):", response.data);
      } catch (error) {
        console.error("Error al enviar el archivo de ventas:", error);
      }
    }
  };

  // Función para enviar archivo de gastos
  const handleSubmitGastos = async () => {
    if (selectedFileGastos) {
      const formData = new FormData();
      formData.append("file", selectedFileGastos);

      try {
        const response = await axios.post(
          "http://localhost:3001/excel/upload-gastos",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("Respuesta del servidor (gastos):", response.data);
      } catch (error) {
        console.error("Error al enviar el archivo de gastos:", error);
      }
    }
  };

  // Obtener datos de ingresos y gastos del backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ingresosResponse = await axios.get(
          "http://localhost:3001/finanzas/ventas/totales"
        );
        const gastosResponse = await axios.get(
          "http://localhost:3001/finanzas/gastos/totales"
        );

        // Convertimos montos negativos a positivos y calculamos totales
        const totalIngresos = ingresosResponse.data.total || 0;
        const totalGastos =
          Math.abs(gastosResponse.data.total) || 0; // Aseguramos que sean positivos

        setIngresosTotales(totalIngresos);
        setGastosTotales(totalGastos);
        setBalanceActual(totalIngresos - totalGastos);
      } catch (error) {
        console.error("Error al obtener datos financieros:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
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
        <Tab value="one" label="Finanzas" component={Link} to="/finance" sx={{ color: "white" }} />
        <Tab value="two" label="Gráficos" component={Link} to="/graphics" sx={{ color: "white" }} />
        <Tab value="three" label="Resumen" component={Link} to="/summary" sx={{ color: "white" }} />
        <Tab value="three" label="Productos" component={Link} to="/inventory" sx={{ color: "white" }} />

      </Tabs>

      <Container maxWidth="sm" sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Resumen Financiero
        </Typography>

        <Grid container spacing={4}>
          {/* Sección para subir archivos */}
          <Grid item xs={12}>
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
                  Subir Archivo de Ventas
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
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
                  Subir Archivo de Gastos
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Balance General */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Balance Actual</Typography>
                <Typography variant="h4" color="primary">
                  ${balanceActual.toLocaleString()}
                </Typography>
                <Typography color="textSecondary">Después de gastos e ingresos</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Ingresos Totales */}
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Ingresos Totales</Typography>
                <Typography variant="h5" color="primary">
                  ${ingresosTotales.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Gastos Totales */}
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Gastos Totales</Typography>
                <Typography variant="h5" color="secondary">
                  ${gastosTotales.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SummaryPage;
