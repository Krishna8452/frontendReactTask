import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1, marginBottom:10}}>
      <AppBar position="fixed" sx={{height:'4rem', justifyContent:"center", alignItems:'center'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow:1 }}>
            Service Lab Task
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
