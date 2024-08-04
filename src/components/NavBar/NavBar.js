// a navbar in mui

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const NavBar = () => {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                    Test
                </Typography>

            </Toolbar>
        </AppBar>
    );
}

export default NavBar