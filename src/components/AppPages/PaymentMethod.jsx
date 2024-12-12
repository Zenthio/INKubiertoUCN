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
  import '../AppPages/GeneralPage.css'
  import { Link } from 'react-router-dom';


const PaymentMethod = ()=>{
    return(
        <div className='body'>
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
        <Tab value="one" label="Resumen" component={Link} to="/summary" sx={{ color: "white" }} />
        <Tab value="two" label="Finanzas" component={Link} to="/finance" sx={{ color: "white" }} />
        <Tab value="three" label="Gráficos" component={Link} to="/graphics" sx={{ color: "white" }} />
        <Tab value="four" label="Productos" component={Link} to="/inventory" sx={{ color: "white" }} />
        <Tab value="five" label="Medios de pago" component={Link} to="/paymethod" sx={{ color: "white" }} />
        <Tab value="six" label="Comparacion" component={Link} to="/comparation" sx={{ color: "white" }} />
    </Tabs>      
        <Typography>
            Medios de pago
        </Typography>
    </div>
    );
}
export default PaymentMethod;