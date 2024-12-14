import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Tabs,
  Tab
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Layout = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [tabValue, setTabValue] = useState('one'); 
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue); 
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div style={{backgroundColor:'#f5f5f5'}}>
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" sx={{ backgroundColor: "#2c2c2c" }}>
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
            <Button sx={{ color: "white" }}>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{ flexGrow: 1, color: "white", textDecoration: "none" }}
              >
                INKUBIERTOS
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>

        {/* Drawer para el menú lateral */}
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            '& .MuiDrawer-paper': {
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: 'column',
              height: '100%',
              backgroundColor: "#2c2c2c"
            }
          }}
        >
          <List sx={{ width: 250 }}>
            <ListItem button component={Link} to="/login">
              <ListItemText primary="Cerrar Sesión" sx={{ color: 'white' }} />
            </ListItem>
          </List>
        </Drawer>

        {/* Tabs de navegación */}
        <Tabs
          textColor="secondary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
          centered
          value={tabValue}
          onChange={handleTabChange}
          
          sx={{
            backgroundColor: "#393838",
            "& .MuiTab-root": {
              minWidth: "auto",
              paddingX: 4,
              fontWeight: 500,
              fontFamily: "Arial, sans-serif",
              "&:hover": { color: "#9b9b9b" },
            },
          }}
        >
          <Tab value="one" label="Resumen" component={Link} to="/summary" sx={{ color: "white" }} />
          <Tab value="two" label="Finanzas" component={Link} to="/finance" sx={{ color: "white" }} />
          <Tab value="three" label="Gráficos" component={Link} to="/graphics" sx={{ color: "white" }} />
          <Tab value="four" label="Productos" component={Link} to="/inventory" sx={{ color: "white" }} />
          <Tab value="five" label="Medios de pago" component={Link} to="/paymethod" sx={{ color: "white" }} />
          <Tab value="six" label="Comparación" component={Link} to="/comparation" sx={{ color: "white" }} />
        </Tabs>
      </Box>

      {/* Contenido dinámico de las rutas */}
      <Box style={{backgroundColor:'#f5f5f5'}}>
        <Outlet />
      </Box>
    </div>
  );
};

export default Layout;
