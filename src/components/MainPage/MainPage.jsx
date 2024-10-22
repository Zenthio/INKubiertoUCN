import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import '../MainPage/MainPage.css'
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { LuBarChart3 } from "react-icons/lu";
import { LuLineChart } from "react-icons/lu";
import { LuList } from "react-icons/lu";
import { LuDollarSign } from "react-icons/lu";
import { LuContainer } from "react-icons/lu";






const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceOrder, setPriceOrder] = useState('');
  const [userEmail, setUserEmail] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };
  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    setUserEmail(null);
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCourse(null);
    setIsModalOpen(false);
  };
  return (
    //Barra superior
    <div>
 
  <Box sx={{
    backgroundColor:'#393838',
    height: 100,
    }}>
    <Typography 
    sx={{
      padding:10,
      paddingLeft:15,
      color:'white',
      fontSize:50,
      fontWeight:100,
      fontFamily: 'Roboto, sans-serif'

    }}>
          Bienvenido a Inkubiertos
    </Typography>
  </Box >

  <Box sx={{
    backgroundColor:'#393838',
    height: 400,
    margin:0,}}>
  <Grid 
    container
    direction="row"
    sx={{
      justifyContent:"space-evenly",

      paddingTop:30,
    }}
  >
    <div style={{background:"#2c2c2c",marginLeft:50, cursor:'pointer','&:hover': { color: '#3f51b5' }}} className='cardContainer'>
        <Link to='/graphics' style={{ textDecoration:'none'}}>
            <LuBarChart3  color='white' size={110}/>
            <Typography color='white' fontSize={20} fontWeight={100} paddingRight={1}>Ver Gráficos</Typography>
        </Link>
    </div>
    <div style={{background:"#2c2c2c",marginLeft:50, cursor:'pointer','&:hover': { color: '#3f51b5' }}} className='cardContainer'>
        <Link to='/summary' style={{ textDecoration:'none'}}>
            <LuList  color='white' size={120}/>
            <Typography color='white' fontSize={20} fontWeight={100} paddingRight={1}>Ver Resumen</Typography>
        </Link>
     </div>
    <div style={{background:"#2c2c2c",marginLeft:50, cursor:'pointer','&:hover': { color: '#3f51b5' }}} className='cardContainer'>
        <Link to='/trending' style={{ textDecoration:'none'}}>
            <LuLineChart color='white' size={115}/>
            <Typography color='white' fontSize={20} fontWeight={100} paddingLeft={0}>Ver Tendencias</Typography>
        </Link>
    </div>
    <div style={{background:"#2c2c2c",marginLeft:50, cursor:'pointer','&:hover': { color: '#3f51b5' }}} className='cardContainer'>
        <Link to='/finance' style={{ textDecoration:'none'}}>
            <LuDollarSign color='white' size={110}/>
            <Typography color='white' fontSize={20} fontWeight={100} paddingLeft={2}>Finanzas</Typography>
        </Link>  
    </div>
    <div style={{background:"#2c2c2c",marginLeft:50, cursor:'pointer','&:hover': { color: '#3f51b5' }}} className='cardContainer'>
        <Link to='/inventory' style={{ textDecoration:'none'}}>
            <LuContainer color='white' size={110}/>
            <Typography color='white' fontSize={20} fontWeight={100} paddingLeft={1}> Inventario</Typography>
        </Link>
    </div>
  </Grid>
  </Box>
  </div>

  

  );
};

export default MainPage;