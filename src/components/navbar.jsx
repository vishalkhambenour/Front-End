import React from "react";
import { Link } from "react-router-dom";
// import navstyle from "../css/navbar.module.css"

// !!!!!!
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Button,
  } from '@mui/material'




export default function Navbar({navpath:{url1,url2,url3,url4,url5}}){
    let Logout=()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("fullname")
    }

    return (

            <AppBar  position='relative' style={{ background: 'black' }}>
      <Toolbar>
        <IconButton
          size='large'
          color='secondary'
          edge='start'
          aria-label='logo'
          sx={{ display: { xs: 'none', md: 'flex' } }}
        ></IconButton>
        <Typography
          component='div'
          variant='h4'
          color='white'
          fontWeight='bold'
          sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
        >
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

            <Link to={url1} ><Button>Home</Button></Link>
            <Link to={url2} ><Button>Adddtask</Button></Link>
            <Link to={url3} ><Button>Alltasks</Button></Link>
            <Link to={url4} ><Button>Login</Button></Link>
            <Link to={url5} ><Button>Signup</Button></Link>
            <Link to={url4} onClick={Logout}><Button>Logout</Button></Link>

         

        </Box>
      
      </Toolbar>
    </AppBar>
            
        
     
    )
}




