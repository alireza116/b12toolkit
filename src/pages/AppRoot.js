'use client'

import React from "react";
import Layout from "./layout";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../themes/theme';
const AppRoot = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
        <Layout>
            {children}
        </Layout>
        </ThemeProvider>
        )

}

export default AppRoot