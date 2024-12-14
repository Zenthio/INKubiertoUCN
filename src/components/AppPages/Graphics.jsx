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
  Paper
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GraphicsPage = () => {
  const [roomData, setRoomData] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
      const fetchRoomData = async () => {
          try {
              const response = await axios.get('http://localhost:3001/rooms/sales'); // Asegúrate de que la URL es correcta
              console.log('Datos de salas recibidos:', response.data);
              setRoomData(response.data);
          } catch (error) {
              console.error('Error al obtener datos de las salas:', error);
          }
      };

      const fetchTableData = async () => {
          try {
              const response = await axios.get('http://localhost:3001/tables/mesas'); // Asegúrate de que la URL es correcta
              console.log('Datos de mesas recibidos:', response.data);
              setTableData(response.data);
          } catch (error) {
              console.error('Error al obtener datos de las mesas:', error);
          }
      };

      fetchRoomData();
      fetchTableData();
  }, []);

  return (
      <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh',marginTop:30 }}>
          <Container maxWidth="md" >
              <Typography variant="h4" align="center" gutterBottom>
                  Ganancias por Sala y Mesa
              </Typography>

              <Grid container spacing={4}>
                  {/* Tabla de Ganancias por Sala */}
                  <Grid item xs={6}>
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
                                          <TableCell align="right">${room.total}</TableCell>
                                      </TableRow>
                                  ))}
                              </TableBody>
                          </Table>
                      </TableContainer>
                  </Grid>

                  {/* Tabla de Ganancias por Mesa */}
                  <Grid item xs={6}>
                      <TableContainer component={Paper}>
                          <Table aria-label="tabla de ganancias por mesa">
                              <TableHead>
                                  <TableRow>
                                      <TableCell><strong>Mesa</strong></TableCell>
                                      <TableCell align="right"><strong>Ganancias ($)</strong></TableCell>
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                                  {tableData.map((table) => (
                                      <TableRow key={table.name}>
                                          <TableCell component="th" scope="row">{table.name}</TableCell>
                                          <TableCell align="right">${table.total}</TableCell>
                                      </TableRow>
                                  ))}
                              </TableBody>
                          </Table>
                      </TableContainer>
                  </Grid>

                  {/* Gráfico de Barras de Ganancias por Sala */}
                  <Grid item xs={6}>
                      <Card>
                          <CardContent>
                              <Typography variant="h6" gutterBottom>Visualización de Ganancias por Sala</Typography>
                              <ResponsiveContainer width="100%" height={300}>
                                  <BarChart data={roomData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                      <XAxis dataKey="name" />
                                      <YAxis />
                                      <Tooltip />
                                      <Bar dataKey="total" fill="#8884d8" />
                                  </BarChart>
                              </ResponsiveContainer>
                          </CardContent>
                      </Card>
                  </Grid>

                  {/* Gráfico de Barras de Ganancias por Mesa */}
                  <Grid item xs={6}>
                      <Card>
                          <CardContent>
                              <Typography variant="h6" gutterBottom>Visualización de Ganancias por Mesa</Typography>
                              <ResponsiveContainer width="100%" height={300}>
                                  <BarChart data={tableData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                      <XAxis dataKey="name" />
                                      <YAxis />
                                      <Tooltip />
                                      <Bar dataKey="total" fill="#82ca9d" />
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
