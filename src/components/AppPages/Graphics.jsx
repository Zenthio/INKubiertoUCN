import {
  Tabs,
  Tab,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const GraphicsPage = () => {
  // Estado para almacenar datos de las salas
  const [roomData, setRoomData] = useState([
      { name: 'Terraza', earnings: 1500 },
      { name: 'Japo', earnings: 2300 },
      { name: 'Terraza 2', earnings: 1200 },
      { name: 'Patio', earnings: 1800 },
  ]);

  const [newRoom, setNewRoom] = useState({ name: '', earnings: '' });

  const handleInputChange = (event) => {
      const { name, value } = event.target;
      setNewRoom((prev) => ({ ...prev, [name]: value }));
  };

  const addRoom = () => {
      if (newRoom.name && newRoom.earnings) {
          setRoomData((prev) => [...prev, { name: newRoom.name}]);
          setNewRoom({ name: '', earnings: '' });
      }
  };

  // Manejador para la carga de archivo (solo parte visual)
  const handleFileUpload = (event) => {
      const file = event.target.files[0];
      console.log("Archivo cargado:", file);
      // Aquí se puede agregar la lógica para procesar el archivo más adelante
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

          <Container maxWidth="md" sx={{ marginTop: 4 }}>
              <Typography variant="h4" align="center" gutterBottom>
                  Ganancias por Sala
              </Typography>

              <Grid container spacing={4}>
                  {/* Sección para subir archivo Excel */}
                  <Grid item xs={12}>
                      <Card>
                          <CardContent>
                              <Typography variant="h6" gutterBottom>
                                  Subir Archivo Excel
                              </Typography>
                              <Box
                                  component="input"
                                  type="file"
                                  accept=".xlsx, .xls"
                                  onChange={handleFileUpload}
                                  sx={{ display: 'block', marginTop: 2 }}
                              />
                              <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                                  Selecciona un archivo Excel para actualizar los datos.
                              </Typography>
                          </CardContent>
                      </Card>
                  </Grid>

                  {/* Formulario para Agregar Nueva Sala */}
                  <Grid item xs={12}>
                      <Card>
                          <CardContent>
                              <Typography variant="h6" gutterBottom>
                                  Agregar Nueva Sala
                              </Typography>
                              <TextField
                                  label="Nombre de la Sala"
                                  name="name"
                                  value={newRoom.name}
                                  onChange={handleInputChange}
                                  fullWidth
                                  margin="normal"
                              />
                              <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={addRoom}
                                  sx={{ marginTop: 2 }}
                              >
                                  Agregar Sala
                              </Button>
                          </CardContent>
                      </Card>
                  </Grid>

                  {/* Tabla de Ganancias por Sala */}
                  <Grid item xs={12}>
                      <TableContainer component={Paper}>
                          <Table aria-label="tabla de ganancias por sala">
                              <TableHead>
                                  <TableRow>
                                      <TableCell><strong>Sala</strong></TableCell>
                                      <TableCell align="right"><strong>Ganancias ($)</strong></TableCell>
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                                  {roomData.map((room) => (
                                      <TableRow key={room.name}>
                                          <TableCell component="th" scope="row">{room.name}</TableCell>
                                          <TableCell align="right">${room.earnings}</TableCell>
                                      </TableRow>
                                  ))}
                              </TableBody>
                          </Table>
                      </TableContainer>
                  </Grid>

                  {/* Gráfico de Barras de Ganancias por Sala */}
                  <Grid item xs={12}>
                      <Card>
                          <CardContent>
                              <Typography variant="h6" gutterBottom>Visualización de Ganancias por Sala</Typography>
                              <ResponsiveContainer width="100%" height={300}>
                                  <BarChart data={roomData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                      <XAxis dataKey="name" />
                                      <YAxis />
                                      <Tooltip />
                                      <Bar dataKey="earnings" fill="#8884d8" />
                                  </BarChart>
                              </ResponsiveContainer>
                          </CardContent>
                      </Card>
                  </Grid>
              </Grid>
          </Container>
      </div>
  );
};

export default GraphicsPage;