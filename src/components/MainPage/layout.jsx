import React from 'react';
import { Outlet } from 'react-router-dom';
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
    Drawer,
    List,
    ListItem,
    ListItemText,
    Container,
  } from '@mui/material';
  import courses from '../PanelUser/Coursesdata'; // Importar los datos de los cursos
  import IconButton from '@mui/material/IconButton';
  import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'; // Para navegar entre las rutas
import { useState, useEffect } from 'react';



const Layout = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
     const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar
   position="static"
   sx={{
    backgroundColor:"#2c2c2c",}}
     >
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Button sx={{color:"white"}}>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color:"white",textDecoration:"none"}}>
           INKUBIERTOS
        </Typography>
      </Button>
    </Toolbar>
    <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)} 
          sx={{
          '& .MuiDrawer-paper': {
          display: 'flex',
          justifyContent: 'flex-end',  // Alinea el contenido al final (abajo)
          flexDirection: 'column',     // Asegura que los elementos se apilen en columna
          height: '100%',     
          backgroundColor:"#2c2c2c"
          }
      }}>
        <List sx={{ width: 250 }}>
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Cerrar Sesión" sx={{color:'white'}}/>
          </ListItem>
         </List>
     </Drawer>
    </AppBar>
    <Outlet/>
    </Box>
  );
};

export default Layout;