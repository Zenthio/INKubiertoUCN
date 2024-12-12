import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  CircularProgress
} from '@mui/material';
import { Link } from 'react-router-dom';

const Comparation = () => {
  const [currentMonthData, setCurrentMonthData] = useState({});
  const [previousMonthData, setPreviousMonthData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        const now = new Date();
        const currentMonth = now.getMonth();
        const previousMonth = (currentMonth - 1 + 12) % 12;
        const twoMonthsAgo = (currentMonth - 2 + 12) % 12;

        const response = await axios.get('http://localhost:3001/comparation/usage', {
          params: {
            months: [twoMonthsAgo, previousMonth]
          }
        });

        setPreviousMonthData(response.data[twoMonthsAgo]);
        setCurrentMonthData(response.data[previousMonth]);
      } catch (error) {
        console.error('Error al obtener datos de comparación:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComparisonData();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
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
        <Tab value="one" label="Resumen" component={Link} to="/summary" sx={{ color: "white" }} />
        <Tab value="two" label="Finanzas" component={Link} to="/finance" sx={{ color: "white" }} />
        <Tab value="three" label="Gráficos" component={Link} to="/graphics" sx={{ color: "white" }} />
        <Tab value="four" label="Productos" component={Link} to="/inventory" sx={{ color: "white" }} />
        <Tab value="five" label="Medios de pago" component={Link} to="/paymethod" sx={{ color: "white" }} />
        <Tab value="six" label="Comparacion" component={Link} to="/comparation" sx={{ color: "white" }} />
      </Tabs>

      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Comparación de Ingresos y Gastos
        </Typography>

        <Grid container spacing={4}>
          {/* Tabla de Comparación de dos meses atrás */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Mes: {previousMonthData?.monthName || 'Ninguna venta'}
                </Typography>
                <TableContainer component={Paper}>
                  <Table aria-label="tabla de ingresos y gastos de dos meses atrás">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Tipo</strong></TableCell>
                        <TableCell align="right"><strong>Total ($)</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">Ingresos</TableCell>
                        <TableCell align="right">
                          {previousMonthData?.ingresos !== undefined ? `$${previousMonthData.ingresos.toLocaleString()}` : 'Ninguna venta'}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">Gastos</TableCell>
                        <TableCell align="right">
                          {previousMonthData?.gastos !== undefined ? `$${previousMonthData.gastos.toLocaleString()}` : 'Ninguna venta'}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Tabla de Comparación del mes anterior */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Mes: {currentMonthData?.monthName || 'Ninguna venta'}
                </Typography>
                <TableContainer component={Paper}>
                  <Table aria-label="tabla de ingresos y gastos del mes anterior">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Tipo</strong></TableCell>
                        <TableCell align="right"><strong>Total ($)</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">Ingresos</TableCell>
                        <TableCell align="right">
                          {currentMonthData?.ingresos !== undefined ? `$${currentMonthData.ingresos.toLocaleString()}` : 'Ninguna venta'}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">Gastos</TableCell>
                        <TableCell align="right">
                          {currentMonthData?.gastos !== undefined ? `$${currentMonthData.gastos.toLocaleString()}` : 'Ninguna venta'}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Comparation;
