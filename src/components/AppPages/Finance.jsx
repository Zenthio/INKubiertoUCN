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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './GeneralPage.css';

const FinancePage = () => {
    const [view, setView] = useState('daily');
    const [earningsData, setEarningsData] = useState([]);
    const [expensesData, setExpensesData] = useState([]);
    const [maxEarningsY, setMaxEarningsY] = useState(0);
    const [maxExpensesY, setMaxExpensesY] = useState(0);

    useEffect(() => {
        const fetchEarningsData = async () => {
            const response = await axios.get(`http://localhost:3001/graficoF/${view}`);
            setEarningsData(response.data);
            setMaxEarningsY(Math.max(...response.data.map(d => d.earnings)));
            console.log("Datos de ganancias recibidos:", response.data);
        };

        const fetchExpensesData = async () => {
            const response = await axios.get(`http://localhost:3001/graficoG/${view}`); // Ajustar la URL para gastos
            setExpensesData(response.data);
            setMaxExpensesY(Math.max(...response.data.map(d => d.expenses))); // Ajustar la clave para gastos
            console.log("Datos de gastos recibidos:", response.data);
        };

        fetchEarningsData();
        fetchExpensesData();
    }, [view]);

    const handleViewChange = (event, newView) => {
        if (newView) {
            setView(newView);
        }
    };

    const xAxisKey = view === 'daily' ? 'day'
                   : view === 'weekly' ? 'week'
                   : 'month';

    return (
        <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingTop: 0 }}>
            <Tabs
                textColor="secondary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
                centered
                sx={{
                    backgroundColor: "#393838",
                    marginTop:0,
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
            </Tabs>

            <Container maxWidth="md" sx={{ marginTop: 4 }}>
                <Grid container spacing={4}>
                    {/* Gráfico de Ganancias */}
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
                                    <ToggleButton value="daily">Diario</ToggleButton>
                                    <ToggleButton value="weekly">Semanal</ToggleButton>
                                    <ToggleButton value="annual">Anual</ToggleButton>
                                </ToggleButtonGroup>

                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={earningsData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey={xAxisKey} />
                                        <YAxis domain={[0, maxEarningsY]} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="earnings" stroke="#8884d8" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Gráfico de Gastos */}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Gráfico de Gastos</Typography>

                                <ToggleButtonGroup
                                    value={view}
                                    exclusive
                                    onChange={handleViewChange}
                                    sx={{ marginBottom: 2 }}
                                >
                                    <ToggleButton value="daily">Diario</ToggleButton>
                                    <ToggleButton value="weekly">Semanal</ToggleButton>
                                    <ToggleButton value="annual">Anual</ToggleButton>
                                </ToggleButtonGroup>

                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={expensesData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey={xAxisKey} />
                                        <YAxis domain={[0, maxExpensesY]} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="expenses" stroke="#82ca9d" strokeWidth={2} />
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
