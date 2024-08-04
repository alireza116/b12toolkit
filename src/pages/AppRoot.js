'use client'

import React from "react";
import Layout from "./layout";
import {ThemeProvider} from '@mui/material/styles';
import theme from '@/themes/theme';
import {RootStoreProvider} from "@/stores/RootStore";

const AppRoot = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            <RootStoreProvider>
                <Layout>
                    {children}
                </Layout>
            </RootStoreProvider>
        </ThemeProvider>
    )

}

export default AppRoot