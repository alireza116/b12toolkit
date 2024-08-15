// a navbar in mui

import React from 'react';
import {AppBar, Toolbar, Typography} from '@mui/material';

const NavBar = React.forwardRef((props, ref) => {

    return (
        <AppBar ref={ref} color="default" position="sticky" className="shadow-none">
            <Toolbar>
                <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                    Responsible AI Coach Development Toolkit
                </Typography>
            </Toolbar>
        </AppBar>
    );
})

NavBar.displayName = "NavBar";

export default NavBar