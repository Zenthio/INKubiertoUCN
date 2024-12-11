import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    TextField,
    Tabs,
    Tab,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Modal,
    Box,
    Container,
  } from '@mui/material';
import '../AppPages/GeneralPage.css'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';



const InventoryPage = ()=>{
  const columnas=[
    {field:'producto',headerName:'PRODUCTO',width:500},
    {field:'vendidos',headerName:'VENDIDOS',width:500},
    {field:'ganancia',headerName:'TOTAL GANADO',width:300},
  ];
  const[dataProduct,setDataProduct]=useState([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 }); // Estado para la paginación
  
  useEffect(()=>{
    const fetchData =async()=>{
      try{
        const response =await axios.get(`http://localhost:3001/finanzas/ventas/producto`);
        setDataProduct(response.data);
      }
      catch(error){
        console.error('Error al obtener datos de los Productos:', error);
      }
    }
    fetchData();
  },[])
  const filas=dataProduct.filter(producto => producto.VENTAS !== 0 && producto.CANTIDAD !== 0).map((producto,index)=>({
    id:index+1,
    producto: producto.NOMBRE,
    vendidos: producto.CANTIDAD,
    ganancia: producto.VENTAS

  }));
  
  const handlePaginationModelChange = (paginationModel) => {
    setPaginationModel(paginationModel); // Actualiza el estado de paginación
  };
    return(
        <div>
        <Tabs
            textColor="secondary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
            centered
            sx={{backgroundColor:"#393838",
                 '& .MuiTab-root': {
                 minWidth: 'auto',
                 paddingX: 4,
                fontWeight: 500,
                fontFamily: 'Arial, sans-serif',
                '&:hover': { color: '#9b9b9b' },
          },
        }}
      >
        <Tab value="one" label="Finanzas" component={Link} to="/finance" sx={{color:"white"}}/>
        <Tab value="two" label="Gráficos"component={Link} to="/graphics"  sx={{color:"white"}} />
        <Tab value="three" label="Resumenes" component={Link} to="/summary"  sx={{color:"white"}} />
        <Tab value="three" label="Productos" component={Link} to="/inventory" sx={{ color: "white" }} />

    </Tabs>      
        <Typography color='black' style={{fontSize:40,marginLeft:'30%'}}>
            Información ventas productos durante este mes
        </Typography>

    <div style={{marginLeft:'15%', marginRight:'15%'}}>
      <DataGrid
        rows={filas}
        columns={columnas}
        paginationModel={paginationModel}
        disableRowSelectionOnClick
        onPaginationModelChange={handlePaginationModelChange  }
        pageSizeOptions={[5, 10,15, 20,25,30]}
        style={{
          marginBottom:'5%',
          fontSize:20
        }}
      >

      </DataGrid>
    </div>
    </div>
    );
}
export default InventoryPage;