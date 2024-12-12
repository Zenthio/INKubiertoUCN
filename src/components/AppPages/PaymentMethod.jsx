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
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const PaymentMethod = () => {
  const [usageData, setUsageData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsageData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/paymethod/usage');
        const data = Object.keys(response.data).map((key) => ({
          medioPago: key,
          count: response.data[key]
        }));
        setUsageData(data);
      } catch (error) {
        console.error('Error al obtener datos de uso de métodos de pago:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsageData();
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
          Uso de Métodos de Pago
        </Typography>

        <Grid container spacing={4}>
          {/* Tabla de Uso de Métodos de Pago */}
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table aria-label="tabla de uso de métodos de pago">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Método de Pago</strong></TableCell>
                    <TableCell align="right"><strong>Uso</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usageData.map((paymentMethod) => (
                    <TableRow key={paymentMethod.medioPago}>
                      <TableCell component="th" scope="row">{paymentMethod.medioPago}</TableCell>
                      <TableCell align="right">{paymentMethod.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Gráfico de Barras de Uso de Métodos de Pago */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Visualización de Uso de Métodos de Pago</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={usageData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <XAxis dataKey="medioPago" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
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

export default PaymentMethod;
