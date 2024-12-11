import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const ProductsPage = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/finanzas/productos/vendidos");
        setProductData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de productos vendidos:", error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Productos Vendidos en el Mes
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="tabla de productos vendidos">
          <TableHead>
            <TableRow>
              <TableCell><strong>Producto</strong></TableCell>
              <TableCell align="right"><strong>Cantidad Vendida</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productData.map((product) => (
              <TableRow key={product.name}>
                <TableCell component="th" scope="row">{product.name}</TableCell>
                <TableCell align="right">{product.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ProductsPage;
