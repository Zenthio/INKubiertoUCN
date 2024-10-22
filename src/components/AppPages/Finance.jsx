import '../AppPages/GeneralPage.css'
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
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
const FinancePage = ()=>{
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setDrawerOpen(open);
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
        <Tab value="one" label="Gráficos" component={Link} to="/graphics" sx={{color:"white"}}/>
        <Tab value="two" label="Inventario" component={Link} to="/inventory" sx={{color:"white"}} />
        <Tab value="three" label="Resumen"  component={Link} to="/summary" sx={{color:"white"}} />
        <Tab value="one" label="Tendencias" component={Link} to="/trending" sx={{color:"white"}}/>
    </Tabs>      
    <Typography>
        FINANZAS
    </Typography>
    </div>
    );
}
export default FinancePage;