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


const TrendingPage = ()=>{
    return(
        <div className='body'>
        <Typography>
            TENDENCIAS
        </Typography>
    </div>
    );
}
export default TrendingPage;