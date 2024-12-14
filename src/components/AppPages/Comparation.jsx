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
  CircularProgress,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';


const Comparation = () => {
  const [currentMonthData, setCurrentMonthData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [currentMonthData2, setCurrentMonthData2] = useState({});
  const [selectedMonth2, setSelectedMonth2] = useState('');


  const months=[
    {value:'0',label:'Enero'},
    {value:'1',label:'Febrero'},
    {value:'2',label:'Marzo'},
    {value:'3',label:'Abril'},
    {value:'4',label:'Mayo'},
    {value:'5',label:'Junio'},
    {value:'6',label:'Julio'},
    {value:'7',label:'Agosto'},
    {value:'8',label:'Septiembre'},
    {value:'9',label:'Octubre'},
    {value:'10',label:'Noviembre'},
    {value:'11',label:'Diciembre'},

  ]

  useEffect(() => {
    // Si no se ha seleccionado un mes, no hace falta hacer la petición
    if (!selectedMonth) {
      return;
    }

    const fetchComparisonData = async () => {
      setLoading(true); // Inicia la carga

      try {
        const response = await axios.get('http://localhost:3001/comparation/usage', {
          params: {
            months: [selectedMonth], // Solo el mes seleccionado
          },
        });

        console.log(response.data); // Ver respuesta de datos

        setCurrentMonthData(response.data); // Solo guardamos los datos del mes seleccionado
        
      } catch (error) {
        console.error('Error al obtener datos de comparación:', error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };
    console.log(currentMonthData);
    fetchComparisonData(); // Realiza la petición

  }, [selectedMonth]);


useEffect(() => {
  if (!selectedMonth2) return;

  const fetchComparisonData2 = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/comparation/usage', {
        params: { months: [selectedMonth2] },
      });
      setCurrentMonthData2(response.data); // Guarda los datos del segundo mes
    } catch (error) {
      console.error('Error al obtener datos de comparación:', error);
      setCurrentMonthData2(null);
    } finally {
      setLoading(false);
    }
  };

  fetchComparisonData2();
}, [selectedMonth2]);

  const handleSelectChange = (event) => {
    setSelectedMonth(event.target.value);  // Cambiar el valor del mes seleccionado
  };
  const handleSelectChange2 = (event) => {
    setSelectedMonth2(event.target.value);
  };

  useEffect(() => {
    console.log('Datos actuales:', currentMonthData);
  }, [currentMonthData]);
  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom marginTop={3}>
          Comparación de Ingresos y Gastos
        </Typography>

        <Grid container spacing={4}>
          {/* Tabla de Comparación */}
          <Grid item xs={12}>
            <Card>
              <CardContent style={{ alignContent: 'flex-end' }}>
                <Typography variant="h6" gutterBottom>
                  {selectedMonth
                    ? `Mes: ${months.find((month) => month.value === selectedMonth)?.label}`
                    : 'Selecciona un mes'}
                </Typography>

                <select value={selectedMonth} onChange={handleSelectChange} style={{ fontFamily: 'system-ui' }}>
                  <option style={{ fontFamily: 'system-ui' }} value="" disabled>
                    Seleccionar Mes
                  </option>
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>


                {/* Mostrar la card siempre, incluso si los datos no están disponibles */}
                <TableContainer component={Paper}>
                  <Table aria-label="tabla de ingresos y gastos del mes seleccionado">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Tipo</strong></TableCell>
                        <TableCell align="right"><strong>Total ($)</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={2} align="center">Cargando...</TableCell>
                        </TableRow>
                      ) : currentMonthData === null ? (
                        <TableRow>
                          <TableCell colSpan={2} align="center">No se encontraron datos para el mes seleccionado.</TableCell>
                        </TableRow>
                      ) : (
                        <>
                          <TableRow>
                            <TableCell component="th" scope="row">Ingresos</TableCell>
                            <TableCell align="right">
                              {currentMonthData?.valorIngreso !== undefined
                                ? `$${currentMonthData.valorIngreso}`
                                : 'Ninguna venta'}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">Gastos</TableCell>
                            <TableCell align="right">
                              {currentMonthData?.valorGasto !== undefined
                                ? `$${currentMonthData.valorGasto}`
                                : 'Ninguna venta'}
                            </TableCell>
                          </TableRow>
                        </>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
         {/* Segunda Tabla */}
         <Grid item xs={12}>
          <Card>
            <CardContent style={{ alignContent: 'flex-end' }}>
              <Typography variant="h6" gutterBottom>
                {selectedMonth2
                  ? `Mes: ${months.find((month) => month.value === selectedMonth2)?.label}`
                  : 'Selecciona un mes'}
              </Typography>

              <select value={selectedMonth2} onChange={handleSelectChange2} style={{ fontFamily: 'system-ui' }}>
                <option style={{ fontFamily: 'system-ui' }} value="" disabled>
                  Seleccionar Mes
                </option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>

              <TableContainer component={Paper}>
                <Table aria-label="tabla de ingresos y gastos del segundo mes seleccionado">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Tipo</strong></TableCell>
                      <TableCell align="right"><strong>Total ($)</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={2} align="center">Cargando...</TableCell>
                      </TableRow>
                    ) : currentMonthData2 === null ? (
                      <TableRow>
                        <TableCell colSpan={2} align="center">No se encontraron datos para el mes seleccionado.</TableCell>
                      </TableRow>
                    ) : (
                      <>
                        <TableRow>
                          <TableCell component="th" scope="row">Ingresos</TableCell>
                          <TableCell align="right">
                            {currentMonthData2?.valorIngreso !== undefined
                              ? `$${currentMonthData2.valorIngreso}`
                              : 'Ninguna venta'}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">Gastos</TableCell>
                          <TableCell align="right">
                            {currentMonthData2?.valorGasto !== undefined
                              ? `$${currentMonthData2.valorGasto}`
                              : 'Ninguna venta'}
                          </TableCell>
                        </TableRow>
                      </>
                    )}
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
