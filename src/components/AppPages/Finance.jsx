import '../AppPages/GeneralPage.css';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Tabs,
    Tab,
    Grid,
    Card,
    CardContent,
    Container,
    ToggleButton,
    ToggleButtonGroup,
    Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const monthlyData = [
    { month: 'Ene', earnings: 1200 },
    { month: 'Feb', earnings: 2100 },
    { month: 'Mar', earnings: 800 },
    { month: 'Abr', earnings: 1600 },
    { month: 'May', earnings: 1900 },
    { month: 'Jun', earnings: 2400 },
];

const weeklyData = [
    { week: 'Semana 1', earnings: 300 },
    { week: 'Semana 2', earnings: 500 },
    { week: 'Semana 3', earnings: 200 },
    { week: 'Semana 4', earnings: 400 },
];

const FinancePage = () => {
    const [view, setView] = useState('monthly');

    const handleViewChange = (event, newView) => {
        if (newView) {
            setView(newView);
        }
    };

  // Manejador para la carga de archivo (solo parte visual)
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("Archivo cargado:", file);
    // Aquí se puede agregar la lógica para procesar el archivo más adelante
  };

    const data = view === 'monthly' ? monthlyData : weeklyData;
    const xAxisKey = view === 'monthly' ? 'month' : 'week';

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
                    Resumen de Finanzas
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

                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Ingresos Totales</Typography>
                                <Typography variant="h4" color="primary">$12,400</Typography>
                                <Typography color="textSecondary">Período: Enero - Junio</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Gastos Totales</Typography>
                                <Typography variant="h4" color="secondary">$9,200</Typography>
                                <Typography color="textSecondary">Período: Enero - Junio</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Gráfico de Ganancias</Typography>

                                <ToggleButtonGroup
                                    value={view}
                                    exclusive
                                    onChange={handleViewChange}
                                    sx={{ marginBottom: 2 }}
                                >
                                    <ToggleButton value="monthly">Mensual</ToggleButton>
                                    <ToggleButton value="weekly">Semanal</ToggleButton>
                                </ToggleButtonGroup>

                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey={xAxisKey} />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="earnings" stroke="#8884d8" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default FinancePage;