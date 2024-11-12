import {
  Tabs,
  Tab,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const SummaryPage = () => {

    const [selectedFileVentas, setSelectedFileVentas] = useState(null);
    const [selectedFileGastos, setSelectedFileGastos] = useState(null);

  // Manejador para la carga de archivo de ventas
  const handleFileUploadVentas = (event) => {
    console.log('Archivo de ventas cargado:', event.target.files[0]);
    setSelectedFileVentas(event.target.files[0]);
  };

  // Manejador para la carga de archivo de gastos
  const handleFileUploadGastos = (event) => {
    console.log('Archivo de gastos cargado:', event.target.files[0]);
    setSelectedFileGastos(event.target.files[0]);
  };

  const handleSubmitVentas = async () => {
    if (selectedFileVentas) {
      const formData = new FormData();
      formData.append('file', selectedFileVentas);

      try {
        // Usamos axios para enviar la solicitud POST con el archivo
        const response = await axios.post('http://localhost:3000/excel/upload-ventas', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Asegúrate de que el tipo de contenido sea adecuado
          },
        });

        console.log('Respuesta del servidor:', response.data);  // Axios maneja la respuesta directamente en `.data`
      } catch (error) {
        console.error('Error al enviar el archivo:', error);
      }
    }
  };

  // Función para enviar archivo de gastos
  const handleSubmitGastos = async () => {
    if (selectedFileGastos) {
      const formData = new FormData();
      formData.append('file', selectedFileGastos);

      try {
        // Enviar archivo de gastos
        const response = await axios.post('http://localhost:3000/excel/upload-gastos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Respuesta del servidor (gastos):', response.data);
      } catch (error) {
        console.error('Error al enviar el archivo de gastos:', error);
      }
    }
  };

  return (
      <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingTop: 20 }}>
          <Tabs
              textColor="secondary"
              indicatorColor="primary"
              aria-label="secondary tabs example"
              centered
              sx={{
                  backgroundColor: "#393838",
                  '& .MuiTab-root': {
                      minWidth: 'auto',
                      paddingX: 4,
                      fontWeight: 500,
                      fontFamily: 'Arial, sans-serif',
                      '&:hover': { color: '#9b9b9b' },
                  },
              }}
          >
                <Tab value="one" label="Finanzas" component={Link} to="/finance" sx={{ color: "white" }} />
                <Tab value="two" label="Gráficos" component={Link} to="/graphics" sx={{ color: "white" }} />
                <Tab value="three" label="Resumen" component={Link} to="/summary" sx={{ color: "white" }} />
          </Tabs>

          <Container maxWidth="sm" sx={{ marginTop: 4 }}>
              <Typography variant="h4" align="center" gutterBottom>
                  Resumen Financiero
              </Typography>

              <Grid container spacing={4}>
                  {/* Sección para subir archivo Excel */}
                  <Grid item xs={12}>
                      <Card>
                          <CardContent>
                              <Typography variant="h6" gutterBottom>
                                  Subir Archivo Ventas
                              </Typography>
                              <input
                                  component="input"
                                  type="file"
                                  accept=".xlsx, .xls"
                                  onChange={handleFileUploadVentas}
                                  sx={{ display: 'block', marginTop: 2 }}
                              />
                              <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                                Selecciona un archivo Excel para actualizar los datos de ventas.
                              </Typography>
                              {/* Botón para enviar el archivo */}
                              <button onClick={handleSubmitVentas} style={{ marginTop: '20px' }}>
                                Subir Archivo Ventas
                              </button>
                          </CardContent>
                      </Card>
                  </Grid>

                  {/* Sección para subir archivo Excel de gastos */}
                  <Grid item xs={12}>
                      <Card>
                          <CardContent>
                              <Typography variant="h6" gutterBottom>
                                  Subir Archivo de Gastos
                              </Typography>
                              <input
                                  component="input"
                                  type="file"
                                  accept=".xlsx, .xls"
                                  onChange={handleFileUploadGastos}
                                  sx={{ display: 'block', marginTop: 2 }}
                              />
                              <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                                  Selecciona un archivo Excel para actualizar los datos de gastos.
                              </Typography>
                              <button onClick={handleSubmitGastos} style={{ marginTop: '20px' }}>
                                Subir Archivo de Gastos
                              </button>
                          </CardContent>
                      </Card>
                  </Grid>

                  {/* Balance General */}
                  <Grid item xs={12}>
                      <Card>
                          <CardContent>
                              <Typography variant="h6">Balance Actual</Typography>
                              <Typography variant="h4" color="primary">$1,280</Typography>
                              <Typography color="textSecondary">Después de gastos e ingresos</Typography>
                          </CardContent>
                      </Card>
                  </Grid>

                  {/* Ingresos Totales */}
                  <Grid item xs={6}>
                      <Card>
                          <CardContent>
                              <Typography variant="h6">Ingresos Totales</Typography>
                              <Typography variant="h5" color="primary">$2,000</Typography>
                          </CardContent>
                      </Card>
                  </Grid>

                  {/* Gastos Totales */}
                  <Grid item xs={6}>
                      <Card>
                          <CardContent>
                              <Typography variant="h6">Gastos Totales</Typography>
                              <Typography variant="h5" color="secondary">$720</Typography>
                          </CardContent>
                      </Card>
                  </Grid>
              </Grid>
          </Container>
      </div>
  );
};

export default SummaryPage;