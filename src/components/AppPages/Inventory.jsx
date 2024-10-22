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

const InventoryPage = ()=>{
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
        <Tab value="one" label="Tendencias" component={Link} to="/trending"  sx={{color:"white"}}/>
    </Tabs>      
        <Typography>
            Inventario
        </Typography>
    </div>
    );
}
export default InventoryPage;