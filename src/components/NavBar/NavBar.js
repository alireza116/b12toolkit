// src/components/NavBar/NavBar.js

import React from 'react';
import {AppBar, Button, Toolbar, Typography} from '@mui/material';
import Link from 'next/link';

const NavBar = React.forwardRef((props, ref) => {
    return (
        <AppBar ref={ref} color="default" position="sticky" className="shadow-none">
            <Toolbar>
                <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                    Responsible AI Coach Development Toolkit
                </Typography>
                <Link href="/" passHref>
                    <Button color="inherit">
                        Home
                    </Button>
                </Link>
                <Link href="/about" passHref>
                    <Button color="inherit">
                        About
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
});

NavBar.displayName = "NavBar";

export default NavBar;